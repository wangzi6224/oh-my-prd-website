// Oh My PRD 官网 · 12 幕产品电影 · 文案「职场共情·狠一点」
// 代入产品经理真实崩溃瞬间,让他觉得「这写的就是我」。全部进 DOM(SEO / 可访问性)。

export type CinematicTone =
  | 'pain'
  | 'probe'
  | 'structure'
  | 'graph'
  | 'conflict'
  | 'review'
  | 'loop';

// 每幕过渡手感(CSS 按 data-motion 用 --sp/--rev 给出不同位移)
export type ActMotion =
  | 'drift'
  | 'split'
  | 'rise'
  | 'radiate'
  | 'gather'
  | 'dolly'
  | 'impact'
  | 'sweep'
  | 'slice'
  | 'fan'
  | 'orbit';

export type RowTone = 'hot' | 'warn' | 'bad' | 'muted' | 'good';

export type PanelRow = { label: string; value?: string; tone?: RowTone };
export type PanelChip = { text: string; tone?: RowTone };

export type CinematicScene = {
  id: string;
  index: string; // 01..12
  nav: string;
  tone: CinematicTone;
  motion: ActMotion;
  eyebrow: string; // 第 N 幕 · 主题
  kicker: string; // 英文小标
  title: string; // 职场共情的那句狠话
  body: string; // 一句解释 / 秒懂的解法
  tags: string[];
  // 图解可选取用的数据(每个图解组件多为自包含,这里只放需要露出的关键字段)
  panel: {
    title: string;
    subtitle: string;
    rows: PanelRow[];
    chips?: PanelChip[];
    footnote?: string;
  };
};

export const cinematicScenes: CinematicScene[] = [
  // ── 01 失序 ───────────────────────────────────────────────────────────
  {
    id: 'demand-chaos',
    index: '01',
    nav: '失序',
    tone: 'pain',
    motion: 'drift',
    eyebrow: '需求失序',
    kicker: 'Scattered Context',
    title: '改到第 8 版,老板问「跟上次比动了啥」,你脑子一片空白。',
    body: '聊天里改一句、会议上改一句、文档里再改一句。需求没丢,它只是从来没在一个地方完整地活过。',
    tags: ['改了八版', '全靠记忆', '对不上'],
    panel: {
      title: '同一个需求,被拆成五份理解',
      subtitle: '聊天 · 会议 · PRD · 评审 · 代码,各说各的。',
      rows: [
        { label: '聊天', value: '边界还没定', tone: 'warn' },
        { label: '会议', value: '口头确认,没沉淀', tone: 'muted' },
        { label: 'PRD', value: '验收标准缺失', tone: 'bad' },
        { label: '评审', value: '异常场景没覆盖', tone: 'bad' },
        { label: '代码', value: '影响范围未知', tone: 'warn' },
      ],
      footnote: '越靠近开发,误解的代价越高。',
    },
  },
  // ── 02 断裂 ───────────────────────────────────────────────────────────
  {
    id: 'broken-context',
    index: '02',
    nav: '断裂',
    tone: 'pain',
    motion: 'split',
    eyebrow: '链路断裂',
    kicker: 'Broken Workflow',
    title: '产品写完就走,开发从头再问一遍。',
    body: '每一次交接都像第一次听说这个需求。真正拖垮进度的不是写 PRD,是上下文一断再断。',
    tags: ['重复对齐', '交接即断线', '历史不可见'],
    panel: {
      title: '需求、评审、代码没有共同坐标',
      subtitle: '每一环都在断点上交接。',
      rows: [
        { label: 'Chat → Doc', value: '断裂', tone: 'bad' },
        { label: 'Doc → Review', value: '断裂', tone: 'bad' },
        { label: 'Review → Code', value: '断裂', tone: 'bad' },
        { label: '缺一个能持续承载上下文的需求对象', tone: 'warn' },
      ],
      footnote: '改了七八版,想对比改了啥?基本靠记忆。',
    },
  },
  // ── 03 不可见 ─────────────────────────────────────────────────────────
  {
    id: 'invisible-impact',
    index: '03',
    nav: '不可见',
    tone: 'pain',
    motion: 'rise',
    eyebrow: '影响不可见',
    kicker: 'Invisible Impact',
    title: '「这需求会动到哪儿?」——没人说得清,直到开发拍下第一行代码。',
    body: '需求不带来源、不带影响、不带历史,风险就只能等撞上代码那一刻,才慢半拍地浮出来。',
    tags: ['影响靠猜', '风险后置', '回归不清'],
    panel: {
      title: '没有上下文,代码影响只能靠猜',
      subtitle: '开发接手,光搞懂「会动到哪」就得耗掉半天。',
      rows: [
        { label: '需求目标', value: '未对齐', tone: 'warn' },
        { label: '业务规则', value: '没归档', tone: 'warn' },
        { label: '异常场景', value: '缺失', tone: 'bad' },
        { label: '验收标准', value: '不可测试', tone: 'bad' },
        { label: '回归范围', value: '靠经验拍', tone: 'warn' },
      ],
      footnote: '风险被推到研发阶段才暴露。',
    },
  },
  // ── 04 探针 ───────────────────────────────────────────────────────────
  {
    id: 'requirement-probe',
    index: '04',
    nav: '探针',
    tone: 'probe',
    motion: 'radiate',
    eyebrow: '需求探针',
    kicker: 'Requirement Probe',
    title: 'AI 先别急着写,它先把你没想清的地方一个个问出来。',
    body: '目标用户是谁、异常怎么处理、验收怎么算——需求探针围着这一条需求追问,把模糊描述补成结构。',
    tags: ['需求探针', '追着你问', '槽位补全'],
    panel: {
      title: '探针把模糊需求,补成结构化画像',
      subtitle: '每一次追问都写回同一个 Requirement。',
      rows: [
        { label: '目标用户', value: '已确认', tone: 'good' },
        { label: '业务规则', value: '已补全', tone: 'good' },
        { label: '权限规则', value: '已关联', tone: 'good' },
        { label: '异常场景', value: '继续追问', tone: 'warn' },
        { label: '验收标准', value: '待确认', tone: 'warn' },
      ],
      chips: [
        { text: 'AI:失败重试要进验收标准吗?', tone: 'hot' },
        { text: '自动写回「失败重试」这条验收', tone: 'good' },
      ],
      footnote: '画像没「足够清晰」,就先别急着生成 PRD。',
    },
  },
  // ── 05 成文 ───────────────────────────────────────────────────────────
  {
    id: 'structured-prd',
    index: '05',
    nav: '成文',
    tone: 'structure',
    motion: 'gather',
    eyebrow: '结构化 PRD',
    kicker: 'Structured PRD',
    title: '聊清楚的那一刻,PRD 自己就长出来了。',
    body: '澄清够了,一键生成结构化 PRD;每改一次都存一版,旧版永远还在。想对比改了啥?不用再翻记忆。',
    tags: ['一键成文', '版本留痕', '局部改写'],
    panel: {
      title: '初稿 v1 · 结构从上下文里长出来',
      subtitle: '不是多一个文档模板,是可追溯的产物。',
      rows: [
        { label: '背景 / 目标 / 非目标', tone: 'good' },
        { label: '功能需求 / 业务规则', tone: 'good' },
        { label: '边界条件 / 验收标准', tone: 'good' },
        { label: '选中段落改写', value: '只动这一块 · 改动可对比', tone: 'hot' },
      ],
      footnote: '每次接受修改,都存成新版本。',
    },
  },
  // ── 06 图谱 ───────────────────────────────────────────────────────────
  {
    id: 'context-graph',
    index: '06',
    nav: '图谱',
    tone: 'graph',
    motion: 'dolly',
    eyebrow: '需求上下文图谱',
    kicker: 'Context Graph',
    title: '你的需求,第一次有了一张能看见全貌的网。',
    body: 'PRD 段落、评审意见、代码文件、历史版本,全连成一张可查询的图。图谱不是好看,是让每个回答都有出处。',
    tags: ['需求图谱', '有据可查', '全貌可见'],
    panel: {
      title: '从一堆文档,变成一张可推理的网',
      subtitle: '节点是需求资产,边是它们之间的真实关系。',
      rows: [
        { label: 'PRD / 背景 · 业务规则', tone: 'good' },
        { label: 'AI 评审 / 验收标准', tone: 'warn' },
        { label: '人工评审 / 修改记录', tone: 'muted' },
        { label: '代码 / 提现结算服务', tone: 'good' },
      ],
      chips: [
        { text: '带出处', tone: 'good' },
        { text: '带原文', tone: 'good' },
        { text: '带把握度', tone: 'warn' },
      ],
    },
  },
  // ── 07 关联/冲突(高潮)───────────────────────────────────────────────
  {
    id: 'requirement-relation',
    index: '07',
    nav: '关联',
    tone: 'conflict',
    motion: 'impact',
    eyebrow: '历史需求关联',
    kicker: 'Historical Relations',
    title: '三个月前你为「提现限额」定过一模一样的阈值。你忘了,图谱没忘。',
    body: '新需求一接入,系统就顺着语义把关联和冲突的历史需求拎出来——直接告诉你:这条,跟当年的「提现限额」打架了。',
    tags: ['历史关联', '冲突预警', '证据可查'],
    panel: {
      title: '「大额提现审批」接入图谱的瞬间',
      subtitle: '按语义找出相关的历史需求,再回原文逐条核对。',
      rows: [
        { label: '冲突', value: '审批阈值和「提现限额」对不上', tone: 'bad' },
        { label: '依赖', value: '实名认证等级', tone: 'good' },
        { label: '重叠', value: '风控通知逻辑', tone: 'warn' },
        { label: '共享规则', value: '单笔限额校验', tone: 'hot' },
      ],
      chips: [
        { text: '相似度 86%', tone: 'good' },
        { text: '3 处原文佐证', tone: 'muted' },
      ],
      footnote: '冲突是最常被漏掉的那一类。图谱把它甩你脸上。',
    },
  },
  // ── 08 评审 ───────────────────────────────────────────────────────────
  {
    id: 'logic-review',
    index: '08',
    nav: '评审',
    tone: 'review',
    motion: 'sweep',
    eyebrow: '逻辑闭环评审',
    kicker: 'Logic Review Gate',
    title: 'AI 把该挑的刺全挑出来,拍板的还是你。',
    body: '完整性、逻辑闭环、边界异常一起过一遍,问题落成文档上的批注;阻断项没清,这一版就别想过。',
    tags: ['逻辑闭环', '多维评审', '人来拍板'],
    panel: {
      title: 'Review Report · 一次收集,多路评判',
      subtitle: '意见不再说完就散,它变成可查的结构化数据。',
      rows: [
        { label: 'blocker', value: '验收标准缺可测条件', tone: 'bad' },
        { label: 'major', value: '异常场景未覆盖', tone: 'warn' },
        { label: 'minor', value: '权限规则描述不完整', tone: 'muted' },
        { label: '人工确认', value: '阻断项清零才放行', tone: 'good' },
      ],
      footnote: '逻辑闭环没形成,这份 PRD 就不算过。',
    },
  },
  // ── 09 沉淀 ───────────────────────────────────────────────────────────
  {
    id: 'knowledge-precipitate',
    index: '09',
    nav: '沉淀',
    tone: 'graph',
    motion: 'slice',
    eyebrow: '知识沉淀',
    kicker: 'Knowledge Base',
    title: '这回,过审的 PRD 不会再石沉大海。',
    body: '发布即入库,切片、可检索。下次想找「以前怎么定的」,搜一下就有,还告诉你出自哪一条、哪一段。',
    tags: ['自动入库', '语义检索', '带出处'],
    panel: {
      title: '搜索:审批规则',
      subtitle: '相关内容高亮,每条都标着出自哪条需求、哪一段。',
      rows: [
        { label: 'PRD / 业务规则', value: '提现限额 · 第 3.2 节', tone: 'good' },
        { label: 'AI 评审 / 验收标准', value: '提现限额 · 验收第 5 条', tone: 'warn' },
        { label: '人工评审 / 修改记录', value: 'v3 → v4', tone: 'muted' },
      ],
      chips: [
        { text: '需求出处', tone: 'good' },
        { text: '段落定位', tone: 'good' },
      ],
    },
  },
  // ── 10 影响 ───────────────────────────────────────────────────────────
  {
    id: 'readonly-impact',
    index: '10',
    nav: '影响',
    tone: 'probe',
    motion: 'fan',
    eyebrow: '只读影响分析',
    kicker: 'Read-only Impact',
    title: '需求终于敢靠近代码了——但它只看,不动手。',
    body: '影响分析顺着图谱铺到代码:哪些模块会动、哪些文件要看、风险多高。铁律一条:只读分析,绝不替你改仓库。',
    tags: ['影响分析', '只读安全线', '提前预判'],
    panel: {
      title: '影响分析 · 扫描完成',
      subtitle: '把「会动到哪」从半天,压缩成一次扫描。',
      rows: [
        { label: '提现结算', value: 'withdraw/settle.py', tone: 'warn' },
        { label: '风控校验', value: 'risk/check.py', tone: 'warn' },
        { label: '通知中心', value: 'notify/center.py', tone: 'muted' },
      ],
      chips: [
        { text: 'risk: medium', tone: 'warn' },
        { text: 'complexity: medium', tone: 'muted' },
        { text: 'read-only', tone: 'good' },
      ],
      footnote: '分析影响,不修改代码。',
    },
  },
  // ── 11 原型 ───────────────────────────────────────────────────────────
  {
    id: 'reviewable-prototype',
    index: '11',
    nav: '原型',
    tone: 'structure',
    motion: 'dolly',
    eyebrow: '可评审原型',
    kicker: 'Reviewable Prototype',
    title: '别让评审再对着满屏文字脑补。',
    body: '需求结构直接生成一个能点的原型,放进隔离沙箱预览,不碰正式系统。评审看得见,才聊得清。',
    tags: ['原型生成', '隔离沙箱', '所见即所得'],
    panel: {
      title: '原型 v1 · 隔离预览',
      subtitle: '从需求版本直接长出可点的界面。',
      rows: [
        { label: '审批规则配置页', value: '表单 + 状态区', tone: 'good' },
        { label: '隔离沙箱', value: '隔离预览,不影响正式系统', tone: 'hot' },
        { label: '版本记录', value: '原型 v1', tone: 'muted' },
      ],
    },
  },
  // ── 12 闭环 ───────────────────────────────────────────────────────────
  {
    id: 'closed-loop',
    index: '12',
    nav: '闭环',
    tone: 'loop',
    motion: 'orbit',
    eyebrow: '需求闭环',
    kicker: 'Closed Loop',
    title: '需求不该写完就死。它该有自己的一生。',
    body: '从澄清、关联、图谱,到生成、评审、沉淀、影响——每一步都留痕、可回溯,长成一条会生长的需求资产链。',
    tags: ['需求闭环', '全程可追溯', '需求即资产'],
    panel: {
      title: '需求资产的完整生命周期',
      subtitle: '不是多一个文档,是一条会生长的链路。',
      rows: [
        { label: '建需求 → AI 澄清 → 生成 PRD', tone: 'good' },
        { label: '版本化 → AI 评审 → 人工确认', tone: 'good' },
        { label: '沉淀检索 → 只读影响 → 原型', tone: 'good' },
        { label: 'AI 每一步都留痕、可回看', tone: 'hot' },
      ],
      footnote: '可生成 · 可评审 · 可追踪 · 可关联代码。',
    },
  },
];

export const ACT_COUNT = cinematicScenes.length;
