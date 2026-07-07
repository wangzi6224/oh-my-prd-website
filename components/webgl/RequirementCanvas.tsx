'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import {
  GRAPH_EDGES,
  GRAPH_NODES,
  NODE_COLOR,
  RELATION_COLOR,
} from './graph/graphData';

type Props = {
  /** 全站滚动进度 0..1(ref,避免逐帧 setState) */
  progressRef: React.MutableRefObject<number>;
  /** 当前幕索引(ref) */
  sceneRef: React.MutableRefObject<number>;
};

function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v));
}
function smoothstep(e0: number, e1: number, x: number) {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}
function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

const GRAPH_RADIUS = 6.2;

export function RequirementCanvas({ progressRef, sceneRef }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 760px)').matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      host.clientWidth / host.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 13);

    const world = new THREE.Group();
    scene.add(world);

    // ── 流体场(Points)────────────────────────────────────────────────
    const FLUID_COUNT = isMobile ? 1400 : 3000;
    const fluidGeo = new THREE.BufferGeometry();
    const fpos = new Float32Array(FLUID_COUNT * 3);
    const fseed = new Float32Array(FLUID_COUNT);
    for (let i = 0; i < FLUID_COUNT; i++) {
      // 体积内随机(确定性)
      const a = Math.sin(i * 12.9898) * 43758.5453;
      const b = Math.sin(i * 78.233) * 43758.5453;
      const c = Math.sin(i * 37.719) * 43758.5453;
      const rx = ((a % 1) + 1) % 1;
      const ry = ((b % 1) + 1) % 1;
      const rz = ((c % 1) + 1) % 1;
      fpos[i * 3] = (rx - 0.5) * 26;
      fpos[i * 3 + 1] = (ry - 0.5) * 16;
      fpos[i * 3 + 2] = (rz - 0.5) * 14;
      fseed[i] = rx;
    }
    fluidGeo.setAttribute('position', new THREE.BufferAttribute(fpos, 3));
    fluidGeo.setAttribute('aSeed', new THREE.BufferAttribute(fseed, 1));

    const fluidMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uConverge: { value: 0 }, // 0 漂浮 → 1 向心汇聚
        uOpacity: { value: 1 },
        uAccent: { value: new THREE.Color(0.06, 0.5, 0.6) },
        uSize: { value: isMobile ? 1.4 : 1.9 },
      },
      vertexShader: `
        attribute float aSeed;
        uniform float uTime;
        uniform float uConverge;
        uniform float uSize;
        varying float vGlow;
        void main() {
          vec3 p = position;
          float t = uTime * 0.25 + aSeed * 6.2831;
          // 流动
          p.x += sin(t + p.y * 0.15) * 1.4;
          p.y += cos(t * 0.9 + p.x * 0.12) * 1.0;
          p.z += sin(t * 0.7 + p.z * 0.2) * 1.2;
          // 向心汇聚
          p = mix(p, p * 0.12, uConverge);
          vGlow = 0.5 + 0.5 * sin(t * 2.0);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = uSize * (1.0 + vGlow * 0.6) * (30.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uAccent;
        uniform float uOpacity;
        varying float vGlow;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(uAccent * (0.5 + vGlow * 0.5), a * uOpacity * (0.18 + vGlow * 0.22));
        }
      `,
    });
    const fluid = new THREE.Points(fluidGeo, fluidMat);
    world.add(fluid);

    // ── 需求图谱:节点(InstancedMesh)────────────────────────────────
    const nodeGeo = new THREE.IcosahedronGeometry(0.15, 1);
    const nodeMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
    const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, GRAPH_NODES.length);
    const dummy = new THREE.Object3D();
    const nodeWorldPos: THREE.Vector3[] = [];
    GRAPH_NODES.forEach((n, i) => {
      const v = new THREE.Vector3(n.pos[0], n.pos[1], n.pos[2]).multiplyScalar(GRAPH_RADIUS);
      nodeWorldPos.push(v);
      dummy.position.copy(v);
      dummy.scale.setScalar(n.scale);
      dummy.updateMatrix();
      nodes.setMatrixAt(i, dummy.matrix);
      const c = NODE_COLOR[n.kind];
      nodes.setColorAt(i, new THREE.Color(c[0], c[1], c[2]));
    });
    nodes.instanceMatrix.needsUpdate = true;
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;
    world.add(nodes);

    // 节点辉光(additive Points 叠在节点上)
    const glowGeo = new THREE.BufferGeometry();
    const gpos = new Float32Array(GRAPH_NODES.length * 3);
    nodeWorldPos.forEach((v, i) => {
      gpos[i * 3] = v.x;
      gpos[i * 3 + 1] = v.y;
      gpos[i * 3 + 2] = v.z;
    });
    glowGeo.setAttribute('position', new THREE.BufferAttribute(gpos, 3));
    const glowMat = new THREE.PointsMaterial({
      size: isMobile ? 26 : 40,
      sizeAttenuation: true,
      color: new THREE.Color(0.12, 0.62, 0.74),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const nodeGlow = new THREE.Points(glowGeo, glowMat);
    world.add(nodeGlow);

    // ── 需求图谱:边(base + highlight 两组 LineSegments)──────────────
    const baseEdges: typeof GRAPH_EDGES = [];
    const hotEdges: typeof GRAPH_EDGES = [];
    GRAPH_EDGES.forEach((e) => {
      const isHot =
        e.type === 'conflicts_with' ||
        (e.type === 'depends_on' && GRAPH_NODES[e.b].kind === 'history');
      (isHot ? hotEdges : baseEdges).push(e);
    });

    function buildLines(edges: typeof GRAPH_EDGES) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(edges.length * 6);
      const col = new Float32Array(edges.length * 6);
      edges.forEach((e, i) => {
        const va = nodeWorldPos[e.a];
        const vb = nodeWorldPos[e.b];
        pos.set([va.x, va.y, va.z, vb.x, vb.y, vb.z], i * 6);
        const c = RELATION_COLOR[e.type];
        col.set([c[0], c[1], c[2], c[0], c[1], c[2]], i * 6);
      });
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      return geo;
    }

    const baseLineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const baseLines = new THREE.LineSegments(buildLines(baseEdges), baseLineMat);
    world.add(baseLines);

    const hotLineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const hotLines = new THREE.LineSegments(buildLines(hotEdges), hotLineMat);
    world.add(hotLines);

    // 中心核辉光
    const coreMat = new THREE.SpriteMaterial({
      color: new THREE.Color(0.16, 0.74, 0.86),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const core = new THREE.Sprite(coreMat);
    core.scale.setScalar(3.2);
    world.add(core);

    // ── 指针视差 ─────────────────────────────────────────────────────
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!isMobile) window.addEventListener('pointermove', onPointer, { passive: true });

    // ── 渲染循环(合流到 gsap.ticker,单 rAF)────────────────────────
    let camZ = 13;
    let camAngle = 0;
    let last = performance.now() / 1000;
    let visible = true;

    const frame = () => {
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - last);
      last = now;
      if (!visible || document.hidden) return;

      const p = progressRef.current;

      // 相位可见度
      const fluidVis = 1 - smoothstep(0.28, 0.46, p) * 0.85;
      const graphVis = smoothstep(0.34, 0.5, p);
      const hotVis = smoothstep(0.5, 0.56, p); // 第七幕点亮后保持
      const coreVis = smoothstep(0.08, 0.2, p) * (0.5 + 0.5 * graphVis);
      const orbit = smoothstep(0.86, 0.96, p); // 第十二幕收束

      fluidMat.uniforms.uTime.value = now;
      fluidMat.uniforms.uConverge.value = smoothstep(0.06, 0.2, p);
      fluidMat.uniforms.uOpacity.value = fluidVis;

      nodeMat.opacity = graphVis * 0.9;
      glowMat.opacity = graphVis * 0.4;
      baseLineMat.opacity = graphVis * 0.5;
      const pulse = 0.6 + 0.4 * Math.sin(now * 2.4);
      hotLineMat.opacity = hotVis * (0.55 + 0.45 * pulse);
      coreMat.opacity = coreVis * (0.7 + 0.3 * Math.sin(now * 1.6));

      // 旋转跟随滚动(静止时不自转,去掉「无意义的全屏旋转」),第十二幕轻微收束
      world.rotation.y = damp(world.rotation.y, p * 1.6 + orbit * 1.1, 2.2, dt);
      world.rotation.x = damp(world.rotation.x, -0.1 + orbit * 0.28, 2.2, dt);

      // 指针视差
      pointer.x = damp(pointer.x, pointer.tx, 3, dt);
      pointer.y = damp(pointer.y, pointer.ty, 3, dt);
      world.rotation.z = damp(world.rotation.z, pointer.x * 0.05, 4, dt);

      // 相机:hero 远 → 图谱拉近 → 收尾拉远
      const targetZ = 13 - graphVis * 4 + orbit * 3.5;
      camZ = damp(camZ, targetZ, 2.5, dt);
      camAngle = damp(camAngle, pointer.y * 0.15, 3, dt);
      camera.position.set(Math.sin(camAngle) * 0.6, pointer.y * -0.5, camZ);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    // 交叉观察 + 可见性
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    io.observe(host);

    const onResize = () => {
      renderer.setSize(host.clientWidth, host.clientHeight);
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    if (reduceMotion) {
      // 静态:直接渲染一帧「已成形图谱」
      progressRef.current = 0.55;
      frame();
    } else {
      gsap.ticker.add(frame);
    }

    return () => {
      gsap.ticker.remove(frame);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      if (!isMobile) window.removeEventListener('pointermove', onPointer);
      renderer.dispose();
      fluidGeo.dispose();
      fluidMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      baseLines.geometry.dispose();
      baseLineMat.dispose();
      hotLines.geometry.dispose();
      hotLineMat.dispose();
      coreMat.dispose();
      if (host.contains(renderer.domElement)) host.removeChild(renderer.domElement);
    };
  }, [progressRef, sceneRef]);

  return <div ref={hostRef} aria-hidden className="requirement-canvas" />;
}
