import type { CSSProperties, ReactNode } from 'react';

// 每幕专属图解:纯 SVG/DOM,内部部件由本幕 --rev(继承自 .cinematic-act)连续「画出/收回」。
// 部件用 className="ag-rev" + style={{'--k': n}} 做错峰显隐;画线用 pathLength=1 + stroke-dashoffset。

type S = CSSProperties;
const k = (n: number): S => ({ '--k': n }) as S;

function Frame({ children, className }: { children: ReactNode; className: string }) {
  return <div className={`act-graphic ${className}`}>{children}</div>;
}

// ── 01 碎片漂散 ─────────────────────────────────────────────────────────
function ScatterFragments() {
  const frags = [
    { t: '聊天', d: '边界还没定', x: '4%', y: '8%', r: '-7deg' },
    { t: '会议', d: '口头确认', x: '52%', y: '2%', r: '5deg' },
    { t: 'PRD', d: '验收缺失', x: '24%', y: '38%', r: '-3deg' },
    { t: '评审', d: '异常没覆盖', x: '60%', y: '46%', r: '8deg' },
    { t: '代码', d: '影响未知', x: '10%', y: '72%', r: '4deg' },
  ];
  return (
    <Frame className="ag-scatter">
      {frags.map((f, i) => (
        <div
          key={f.t}
          className="ag-frag ag-rev"
          style={{ ...k(i), left: f.x, top: f.y, '--r': f.r } as S}
        >
          <span className="ag-frag__t">{f.t}</span>
          <span className="ag-frag__d">{f.d}</span>
        </div>
      ))}
      <span className="ag-scatter__caption ag-rev" style={k(5)}>
        五个地方,五份理解,永不相连
      </span>
    </Frame>
  );
}

// ── 02 断链 ─────────────────────────────────────────────────────────────
function BrokenChain() {
  const nodes = ['Chat', 'Doc', 'Review', 'Code'];
  return (
    <Frame className="ag-chain">
      <div className="ag-chain__row">
        {nodes.map((n, i) => (
          <div key={n} className="ag-chain__seg">
            <span className="ag-chain__node ag-rev" style={k(i)}>
              {n}
            </span>
            {i < nodes.length - 1 ? (
              <span className="ag-chain__gap ag-rev" style={k(i + 0.5)}>
                <em>断</em>
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <span className="ag-chain__caption ag-rev" style={k(4)}>
        每一次交接,都在断点上重新对齐
      </span>
    </Frame>
  );
}

// ── 03 风险后置 ─────────────────────────────────────────────────────────
function LateRisk() {
  const stages = ['需求', '澄清', '评审', '开发', '上线'];
  return (
    <Frame className="ag-risk">
      <svg viewBox="0 0 320 200" className="ag-risk__svg" preserveAspectRatio="none">
        <path className="ag-risk__area ag-rev" style={k(2)} d="M0,170 L80,168 L160,160 L240,40 L320,60 L320,200 L0,200 Z" />
        <path
          className="ag-risk__line"
          pathLength={1}
          d="M0,170 L80,168 L160,160 L240,40 L320,60"
        />
      </svg>
      <div className="ag-risk__axis">
        {stages.map((s, i) => (
          <span key={s} className="ag-rev" style={k(i * 0.4)}>
            {s}
          </span>
        ))}
      </div>
      <span className="ag-risk__flag ag-rev" style={k(3)}>
        风险<b>撞上代码</b>才爆
      </span>
    </Frame>
  );
}

// ── 04 探针覆盖度 ───────────────────────────────────────────────────────
function ProbeRadar() {
  const slots = [
    { t: '目标用户', ok: true },
    { t: '业务规则', ok: true },
    { t: '异常场景', ok: false },
    { t: '验收标准', ok: false },
  ];
  return (
    <Frame className="ag-probe">
      <div className="ag-probe__core ag-rev" style={k(0)}>
        Requirement
      </div>
      <div className="ag-probe__ring ag-rev" style={k(1)}>
        <span className="ag-probe__pct">覆盖度</span>
      </div>
      <div className="ag-probe__slots">
        {slots.map((s, i) => (
          <span key={s.t} className={`ag-probe__slot ag-rev ${s.ok ? 'is-on' : ''}`} style={k(2 + i * 0.5)}>
            {s.t}
            <em>{s.ok ? '已补全' : '追问中'}</em>
          </span>
        ))}
      </div>
    </Frame>
  );
}

// ── 05 聚合成文 ─────────────────────────────────────────────────────────
function AssembleDoc() {
  const secs = ['背景', '目标', '非目标', '功能需求', '业务规则', '边界条件', '验收标准'];
  return (
    <Frame className="ag-doc">
      <div className="ag-doc__card ag-rev" style={k(0)}>
        <div className="ag-doc__bar">
          <span>PRD</span>
          <em className="ag-rev" style={k(6)}>初稿 v1</em>
        </div>
        <ul>
          {secs.map((s, i) => (
            <li key={s} className="ag-rev" style={k(1 + i * 0.5)}>
              <i />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

// ── 06 图谱图例(WebGL 图谱在此推前景,右列只放图例)──────────────────
function GraphLegend() {
  const nodes = [
    { c: 'req', t: '需求' },
    { c: 'prd', t: 'PRD 段落' },
    { c: 'rev', t: '评审意见' },
    { c: 'code', t: '代码文件' },
  ];
  const edges = [
    { c: 'dep', t: '依赖' },
    { c: 'conf', t: '冲突' },
    { c: 'src', t: '来源引用' },
  ];
  return (
    <Frame className="ag-legend">
      <p className="ag-legend__hint ag-rev" style={k(0)}>全貌,就在你眼前 ↙</p>
      <div className="ag-legend__group ag-rev" style={k(1)}>
        <span className="ag-legend__h">节点</span>
        {nodes.map((n, i) => (
          <span key={n.t} className="ag-legend__item ag-rev" style={k(1 + i * 0.4)}>
            <i data-c={n.c} />
            {n.t}
          </span>
        ))}
      </div>
      <div className="ag-legend__group ag-rev" style={k(3)}>
        <span className="ag-legend__h">关系</span>
        {edges.map((e, i) => (
          <span key={e.t} className="ag-legend__item ag-rev" style={k(3 + i * 0.4)}>
            <b data-c={e.c} />
            {e.t}
          </span>
        ))}
      </div>
    </Frame>
  );
}

// ── 07 冲突红线(高潮)──────────────────────────────────────────────────
function ConflictReveal() {
  // 迷你图谱:中心「大额提现」新需求 → 四条关系边(冲突红线为主角)
  const edges = [
    { id: '提现限额', type: 'conf', label: '冲突', x: 268, y: 44, dk: 2 },
    { id: '实名认证', type: 'dep', label: '依赖', x: 276, y: 150, dk: 3 },
    { id: '风控通知', type: 'over', label: '重叠', x: 60, y: 40, dk: 3.5 },
    { id: '单笔限额', type: 'share', label: '共享', x: 48, y: 156, dk: 4 },
  ];
  const cx = 160;
  const cy = 100;
  return (
    <Frame className="ag-conflict">
      <svg viewBox="0 0 320 200" className="ag-conflict__svg">
        {edges.map((e) => (
          <line
            key={e.id}
            className="ag-conflict__edge"
            data-c={e.type}
            pathLength={1}
            style={k(e.dk)}
            x1={cx}
            y1={cy}
            x2={e.x}
            y2={e.y}
          />
        ))}
      </svg>
      {edges.map((e) => (
        <span
          key={e.id}
          className="ag-conflict__node ag-rev"
          data-c={e.type}
          style={{ ...k(e.dk + 0.4), left: `${(e.x / 320) * 100}%`, top: `${(e.y / 200) * 100}%` } as S}
        >
          {e.id}
        </span>
      ))}
      <span className="ag-conflict__self ag-rev" style={k(0)}>
        大额提现<em>本次新需求</em>
      </span>
      <div className="ag-conflict__card ag-rev" style={k(3)}>
        <p className="ag-conflict__card-h">
          <i />冲突 · 审批阈值和「提现限额」对不上
        </p>
        <p className="ag-conflict__card-m">相似度 86% · 3 处原文佐证 · 直接甩你脸上</p>
      </div>
    </Frame>
  );
}

// ── 08 评审扫描 ─────────────────────────────────────────────────────────
function ReviewScan() {
  const pins = [
    { s: 'blocker', t: '验收缺可测条件', c: 'bad', y: '26%' },
    { s: 'major', t: '异常未覆盖', c: 'warn', y: '48%' },
    { s: 'minor', t: '权限不完整', c: 'muted', y: '68%' },
  ];
  return (
    <Frame className="ag-review">
      <div className="ag-review__doc ag-rev" style={k(0)}>
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className="ag-review__line" style={{ width: `${90 - i * 6}%` }} />
        ))}
        <span className="ag-review__scan" />
        {pins.map((p, i) => (
          <span key={p.s} className="ag-review__pin ag-rev" data-c={p.c} style={{ ...k(1 + i), top: p.y } as S}>
            <b>{p.s}</b>
            {p.t}
          </span>
        ))}
      </div>
      <div className="ag-review__gate ag-rev" style={k(4)}>
        <i />人工确认 · 阻断项清零才放行
      </div>
    </Frame>
  );
}

// ── 09 切片检索 ─────────────────────────────────────────────────────────
function KnowledgeChunks() {
  const chunks = [
    { t: 'PRD / 业务规则', m: '提现限额 · 3.2 节', hit: true },
    { t: 'AI 评审 / 验收标准', m: '提现限额 · 验收 5', hit: true },
    { t: '人工评审 / 修改记录', m: 'v3 → v4', hit: false },
  ];
  return (
    <Frame className="ag-know">
      <div className="ag-know__search ag-rev" style={k(0)}>
        <i />审批规则
      </div>
      <div className="ag-know__chunks">
        {chunks.map((c, i) => (
          <div key={c.t} className={`ag-know__chunk ag-rev ${c.hit ? 'is-hit' : ''}`} style={k(1 + i * 0.7)}>
            <span className="ag-know__chunk-t">{c.t}</span>
            <span className="ag-know__chunk-m">{c.m}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ── 10 影响射线 ─────────────────────────────────────────────────────────
function ImpactRays() {
  const mods = [
    { t: '提现结算', f: 'withdraw/settle.py', y: 40 },
    { t: '风控校验', f: 'risk/check.py', y: 100 },
    { t: '通知中心', f: 'notify/center.py', y: 160 },
  ];
  return (
    <Frame className="ag-impact">
      <svg viewBox="0 0 320 200" className="ag-impact__svg">
        {mods.map((m, i) => (
          <line
            key={m.t}
            className="ag-impact__ray"
            pathLength={1}
            style={k(1 + i * 0.6)}
            x1={20}
            y1={100}
            x2={150}
            y2={m.y}
          />
        ))}
      </svg>
      <span className="ag-impact__src ag-rev" style={k(0)}>需求</span>
      <div className="ag-impact__mods">
        {mods.map((m, i) => (
          <span key={m.t} className="ag-impact__mod ag-rev" style={k(1.4 + i * 0.6)}>
            {m.t}
            <em>{m.f}</em>
          </span>
        ))}
      </div>
      <div className="ag-impact__pills ag-rev" style={k(3.5)}>
        <span data-c="warn">risk: medium</span>
        <span data-c="muted">complexity: medium</span>
        <span data-c="good">🛡 read-only</span>
      </div>
    </Frame>
  );
}

// ── 11 原型窗 ───────────────────────────────────────────────────────────
function PrototypeWindow() {
  return (
    <Frame className="ag-proto">
      <div className="ag-proto__win ag-rev" style={k(0)}>
        <div className="ag-proto__bar">
          <i /><i /><i />
          <span className="ag-proto__url ag-rev" style={k(1)}>预览 / 提现审批配置</span>
        </div>
        <div className="ag-proto__body">
          <div className="ag-proto__nav ag-rev" style={k(2)} />
          <div className="ag-proto__main">
            <span className="ag-proto__title ag-rev" style={k(2.5)} />
            <span className="ag-proto__field ag-rev" style={k(3)} />
            <span className="ag-proto__field ag-rev" style={k(3.4)} />
            <span className="ag-proto__btn ag-rev" style={k(4)}>提交审批</span>
          </div>
        </div>
      </div>
      <div className="ag-proto__tags ag-rev" style={k(4.5)}>
        <span data-c="hot">隔离沙箱</span>
        <span data-c="muted">原型 v1</span>
      </div>
    </Frame>
  );
}

// ── 12 闭环点亮 ─────────────────────────────────────────────────────────
function LifecycleRing() {
  const steps = ['澄清', '关联', '图谱', '生成', '评审', '沉淀', '影响', '原型'];
  const R = 78;
  return (
    <Frame className="ag-loop">
      <svg viewBox="0 0 220 220" className="ag-loop__svg">
        <circle className="ag-loop__ring" pathLength={1} cx={110} cy={110} r={R} />
      </svg>
      {steps.map((s, i) => {
        const a = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + (48 + Math.cos(a) * 40);
        const y = 50 + (48 + Math.sin(a) * 40);
        return (
          <span
            key={s}
            className="ag-loop__node ag-rev"
            style={{ ...k(1 + i * 0.35), left: `${x}%`, top: `${y}%` } as S}
          >
            {s}
          </span>
        );
      })}
      <span className="ag-loop__center ag-rev" style={k(0)}>
        Oh My PRD
      </span>
    </Frame>
  );
}

// ── 注册表 ──────────────────────────────────────────────────────────────
const REGISTRY: Record<string, () => ReactNode> = {
  'demand-chaos': ScatterFragments,
  'broken-context': BrokenChain,
  'invisible-impact': LateRisk,
  'requirement-probe': ProbeRadar,
  'structured-prd': AssembleDoc,
  'context-graph': GraphLegend,
  'requirement-relation': ConflictReveal,
  'logic-review': ReviewScan,
  'knowledge-precipitate': KnowledgeChunks,
  'readonly-impact': ImpactRays,
  'reviewable-prototype': PrototypeWindow,
  'closed-loop': LifecycleRing,
};

export function ActGraphic({ id }: { id: string }) {
  const Comp = REGISTRY[id];
  return Comp ? <Comp /> : null;
}
