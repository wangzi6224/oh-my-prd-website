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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.25));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.autoClear = false;
    host.appendChild(renderer.domElement);

    // ── 科技感能量流(全屏 shader quad,偏右分布,左侧渐隐避开文案)──────
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.Camera();
    const bgMat = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uAspect: { value: host.clientWidth / Math.max(host.clientHeight, 1) },
        uAccent: { value: new THREE.Color(0.09, 0.6, 0.72) },
        uIntensity: { value: 1 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAspect;
        uniform float uIntensity;
        uniform vec3 uAccent;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
        float noise(vec2 p){
          vec2 i = floor(p), f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
                     mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
        }
        float fbm(vec2 p){
          float v = 0.0, a = 0.5;
          for (int i = 0; i < 3; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
          return v;
        }
        void main() {
          vec2 uv = vUv;
          uv.x *= uAspect;
          float t = uTime * 0.03;
          // 域扭曲 → 流动的能量丝(2 次 fbm × 3 octave,轻量)
          float w = fbm(uv * 1.6 + vec2(t, -t * 0.6));
          float f = fbm(uv * 2.2 + w * 1.4);
          float lines = pow(abs(sin((f * 5.0 - t * 3.0) * 3.14159)), 3.5);
          float energy = smoothstep(0.5, 1.0, f) * 0.3 + lines * 0.55;
          // 保护左侧文案区,向左渐隐;上下暗角
          energy *= smoothstep(0.1, 0.64, vUv.x);
          energy *= smoothstep(0.0, 0.22, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
          energy *= uIntensity;
          gl_FragColor = vec4(uAccent * energy, energy);
        }
      `,
    });
    const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat);
    bgScene.add(bgMesh);

    // ── 需求图谱(仅在图谱/关联/闭环幕出现,不再作为全程背景)──────────
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

      // 图谱只在 06/07 与 12 幕现身,其余幕背景是纯能量流,没有方块和连线
      const g67 = smoothstep(0.44, 0.5, p) - smoothstep(0.6, 0.66, p);
      const g12 = smoothstep(0.9, 0.95, p);
      const graphVis = clamp(Math.max(g67, g12), 0, 1);
      const hotVis = clamp(smoothstep(0.52, 0.58, p) - smoothstep(0.63, 0.7, p), 0, 1);
      const orbit = smoothstep(0.9, 0.97, p);

      // 背景能量流:始终存在;图谱现身时稍微让位
      bgMat.uniforms.uTime.value = now;
      bgMat.uniforms.uIntensity.value = 1 - graphVis * 0.45;

      nodeMat.opacity = graphVis * 0.9;
      glowMat.opacity = graphVis * 0.4;
      baseLineMat.opacity = graphVis * 0.5;
      const pulse = 0.6 + 0.4 * Math.sin(now * 2.4);
      hotLineMat.opacity = hotVis * (0.55 + 0.45 * pulse);
      coreMat.opacity = graphVis * (0.6 + 0.3 * Math.sin(now * 1.6));

      world.rotation.y = damp(world.rotation.y, p * 1.6 + orbit * 1.1, 2.2, dt);
      world.rotation.x = damp(world.rotation.x, -0.1 + orbit * 0.28, 2.2, dt);

      pointer.x = damp(pointer.x, pointer.tx, 3, dt);
      pointer.y = damp(pointer.y, pointer.ty, 3, dt);
      world.rotation.z = damp(world.rotation.z, pointer.x * 0.05, 4, dt);

      const targetZ = 13 - graphVis * 4 + orbit * 3;
      camZ = damp(camZ, targetZ, 2.5, dt);
      camAngle = damp(camAngle, pointer.y * 0.15, 3, dt);
      camera.position.set(Math.sin(camAngle) * 0.6, pointer.y * -0.5, camZ);
      camera.lookAt(0, 0, 0);

      renderer.clear();
      renderer.render(bgScene, bgCamera);
      renderer.render(scene, camera);
    };

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
      bgMat.uniforms.uAspect.value = host.clientWidth / Math.max(host.clientHeight, 1);
    };
    window.addEventListener('resize', onResize);

    if (reduceMotion) {
      progressRef.current = 0.5; // 图谱幕静态帧
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
      bgMesh.geometry.dispose();
      bgMat.dispose();
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
