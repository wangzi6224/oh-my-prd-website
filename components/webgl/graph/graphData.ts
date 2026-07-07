// 需求图谱数据 · 节点用确定性布局(fibonacci 球 + 抖动)烘焙,不做逐帧力导向。
// 边按真实产品的 RelationType 着色(relation_analysis_agent.py)。

export type NodeKind = 'requirement' | 'prd' | 'review' | 'code' | 'history' | 'core';

export type RelationType =
  | 'depends_on' // 依赖 → teal
  | 'conflicts_with' // 冲突 → red(第七幕主角)
  | 'overlaps' // 重叠 → amber
  | 'extends' // 扩展 → green
  | 'shares_rule' // 共享规则 → cyan
  | 'source'; // 来源引用(PRD/评审/代码挂到需求)→ 柔青

export type GraphNode = {
  id: string;
  kind: NodeKind;
  /** 归一化位置(单位球内),运行时再乘以图谱半径 */
  pos: [number, number, number];
  /** 相对大小 */
  scale: number;
};

export type GraphEdge = {
  a: number; // node index
  b: number; // node index
  type: RelationType;
};

// 关系类型 → RGB(0..1),与 pixijs/threejs skill 中约定一致
export const RELATION_COLOR: Record<RelationType, [number, number, number]> = {
  depends_on: [0.078, 0.682, 0.761], // #14AEC2
  conflicts_with: [1.0, 0.365, 0.365], // #ff5d5d
  overlaps: [0.95, 0.68, 0.28], // amber
  extends: [0.41, 0.83, 0.62], // green
  shares_rule: [0.51, 0.9, 0.93], // soft cyan
  source: [0.29, 0.55, 0.6], // muted teal
};

export const NODE_COLOR: Record<NodeKind, [number, number, number]> = {
  core: [0.16, 0.78, 0.86], // 深青,不再刺眼的白
  requirement: [0.08, 0.68, 0.76],
  prd: [0.41, 0.83, 0.62],
  review: [0.95, 0.68, 0.28],
  code: [0.55, 0.62, 0.66],
  history: [0.36, 0.47, 0.52],
};

/** fibonacci 球面点,确定性、均匀 */
function fib(i: number, n: number): [number, number, number] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (i / (n - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = golden * i;
  return [Math.cos(theta) * r, y, Math.sin(theta) * r];
}

// 确定性伪随机(无 Math.random,保证 SSR/hydration 一致)
function jitter(seed: number) {
  return (Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1;
}

function buildNodes(): GraphNode[] {
  const nodes: GraphNode[] = [];
  // 中心核
  nodes.push({ id: 'core', kind: 'core', pos: [0, 0, 0], scale: 1.9 });

  const kinds: NodeKind[] = ['requirement', 'prd', 'review', 'code', 'history'];
  const N = 33; // 外圈节点数
  for (let i = 0; i < N; i++) {
    const base = fib(i + 1, N + 2);
    // 半径在 0.55..1 之间抖动,形成层次
    const rad = 0.55 + Math.abs(jitter(i * 2.3)) * 0.45;
    const jx = jitter(i * 3.1) * 0.08;
    const jy = jitter(i * 5.7) * 0.08;
    const jz = jitter(i * 7.9) * 0.08;
    // history 节点放外圈,requirement/prd 靠内
    const kind = kinds[i % kinds.length];
    const kindRad = kind === 'history' ? 1.02 : kind === 'code' ? 0.92 : rad;
    nodes.push({
      id: `${kind}-${i}`,
      kind,
      pos: [base[0] * kindRad + jx, base[1] * kindRad + jy, base[2] * kindRad + jz],
      scale: kind === 'requirement' ? 1.15 : 0.8 + Math.abs(jitter(i)) * 0.5,
    });
  }
  return nodes;
}

export const GRAPH_NODES: GraphNode[] = buildNodes();

// 边:核心向内圈需求发散(source),需求之间形成关系边。
function buildEdges(nodes: GraphNode[]): GraphEdge[] {
  const edges: GraphEdge[] = [];
  const reqIdx: number[] = [];
  const histIdx: number[] = [];
  nodes.forEach((n, i) => {
    if (n.kind === 'requirement') reqIdx.push(i);
    if (n.kind === 'history') histIdx.push(i);
  });

  // 1) 每个非核心节点连回核心(来源引用)
  for (let i = 1; i < nodes.length; i++) {
    if (i % 3 === 0) edges.push({ a: 0, b: i, type: 'source' });
  }

  // 2) 需求之间的语义关系(邻接连边)
  const relCycle: RelationType[] = ['depends_on', 'shares_rule', 'overlaps', 'extends'];
  for (let k = 0; k < reqIdx.length - 1; k++) {
    edges.push({ a: reqIdx[k], b: reqIdx[k + 1], type: relCycle[k % relCycle.length] });
  }

  // 3) 第七幕主角:新需求 → 历史需求的冲突/依赖边(高亮)
  //    取几条从 requirement 指向 history 的边,类型集中在 conflicts_with / depends_on
  const highlightTypes: RelationType[] = ['conflicts_with', 'depends_on', 'conflicts_with', 'shares_rule'];
  for (let k = 0; k < Math.min(histIdx.length, 4); k++) {
    const from = reqIdx[k % reqIdx.length];
    edges.push({ a: from, b: histIdx[k], type: highlightTypes[k % highlightTypes.length] });
  }

  return edges;
}

export const GRAPH_EDGES: GraphEdge[] = buildEdges(GRAPH_NODES);

/** 第七幕要「点亮」的边索引(冲突 + 依赖历史需求) */
export const HIGHLIGHT_EDGE_INDICES: number[] = GRAPH_EDGES.reduce<number[]>((acc, e, i) => {
  if (e.type === 'conflicts_with' || (e.type === 'depends_on' && GRAPH_NODES[e.b].kind === 'history')) {
    acc.push(i);
  }
  return acc;
}, []);
