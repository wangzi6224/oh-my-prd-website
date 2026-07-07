export type CinematicTone = 'pain' | 'probe' | 'link' | 'graph' | 'loop';

export type CinematicItem = {
  text: string;
  tone?: 'hot' | 'warn' | 'bad' | 'muted';
};

export type CinematicScene = {
  id: string;
  index: string;
  nav: string;
  tone: CinematicTone;
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
  label: string;
  state: string;
  leftTitle: string;
  sideTitle: string;
  mainKicker: string;
  moduleTitle: string;
  moduleSubtitle: string;
  bricks: CinematicItem[];
  blocks: CinematicItem[];
  sideCards: CinematicItem[];
};

export const cinematicScenes: CinematicScene[] = [
  {
    id: 'demand-chaos',
    index: '01',
    nav: '失序',
    tone: 'pain',
    eyebrow: '第一幕 需求失序',
    title: '需求不是缺少文档，而是缺少结构。',
    body:
      '聊天、会议、PRD、评审和代码线索散落在不同地方。需求不是消失了，而是从未形成一个可追踪的上下文对象。',
    tags: ['信息碎片', '口头确认', '来源丢失'],
    label: '碎片进入工作台',
    state: 'raw',
    leftTitle: '散落输入',
    sideTitle: '断裂线索',
    mainKicker: 'Unstructured Demand',
    moduleTitle: '同一个需求，被拆成多份理解',
    moduleSubtitle: '没有统一锚点时，每一次协作都在重新拼接上下文。',
    bricks: [
      { text: '聊天：边界还没定', tone: 'warn' },
      { text: '会议：口头确认未沉淀', tone: 'muted' },
      { text: 'PRD：验收标准缺失', tone: 'bad' },
      { text: '评审：异常场景未覆盖', tone: 'bad' },
      { text: '代码：影响范围未知', tone: 'warn' },
    ],
    blocks: [
      { text: '问题：没有统一 Requirement 作为锚点', tone: 'bad' },
      { text: '结果：版本、来源、责任和影响都无法自然串起来', tone: 'warn' },
      { text: '风险：越接近开发，误解成本越高', tone: 'bad' },
    ],
    sideCards: [
      { text: '来源：不可追溯', tone: 'bad' },
      { text: '状态：不可验证', tone: 'warn' },
      { text: '影响：靠经验判断', tone: 'warn' },
    ],
  },
  {
    id: 'broken-context',
    index: '02',
    nav: '断裂',
    tone: 'pain',
    eyebrow: '第二幕 链路断裂',
    title: '每一次变更，都像重新理解一遍项目。',
    body:
      '产品写文档，研发读文档，评审散落在沟通里。真正拖慢团队的不是写 PRD，而是上下文不断断裂。',
    tags: ['重复理解', '评审分散', '历史不可见'],
    label: '断裂链路拆解中',
    state: 'broken',
    leftTitle: '断点',
    sideTitle: '缺口',
    mainKicker: 'Broken Workflow',
    moduleTitle: '需求、评审、代码没有共同坐标',
    moduleSubtitle: '模块开始拆开，露出链路断点和缺失上下文。',
    bricks: [
      { text: 'Chat 没有归档', tone: 'bad' },
      { text: 'Doc 手动维护', tone: 'warn' },
      { text: 'Review 分散', tone: 'bad' },
      { text: 'Code 无关联', tone: 'warn' },
      { text: 'Version 不清晰', tone: 'bad' },
    ],
    blocks: [
      { text: 'Chat -> Doc 断裂', tone: 'bad' },
      { text: 'Doc -> Review 断裂', tone: 'bad' },
      { text: 'Review -> Code 断裂', tone: 'bad' },
      { text: '缺少一个能持续承载上下文的需求对象', tone: 'warn' },
    ],
    sideCards: [
      { text: '验收标准不可测试', tone: 'bad' },
      { text: '边界条件靠回忆', tone: 'warn' },
      { text: '回归范围靠经验', tone: 'warn' },
    ],
  },
  {
    id: 'invisible-impact',
    index: '03',
    nav: '不可见',
    tone: 'pain',
    eyebrow: '第三幕 影响不可见',
    title: '需求靠近代码时，风险才突然出现。',
    body:
      '如果需求没有携带来源、版本、评审和历史上下文，研发只能在实现前临时补课，影响分析也无法提前发生。',
    tags: ['影响未知', '风险后置', '回归不清'],
    label: '风险层显影',
    state: 'risk',
    leftTitle: '缺失上下文',
    sideTitle: '后置风险',
    mainKicker: 'Invisible Impact',
    moduleTitle: '没有上下文，代码影响只能靠猜',
    moduleSubtitle: '需求必须在进入开发前完成语义、来源和状态的结构化。',
    bricks: [
      { text: '需求目标：未对齐', tone: 'warn' },
      { text: '业务规则：未归档', tone: 'warn' },
      { text: '异常场景：缺失', tone: 'bad' },
      { text: '验收标准：不可测试', tone: 'bad' },
      { text: '历史版本：不可追踪', tone: 'bad' },
    ],
    blocks: [
      { text: '代码文件可能受影响，但缺少需求来源', tone: 'warn' },
      { text: '评审结论存在，但没有进入知识资产', tone: 'bad' },
      { text: '风险被推迟到研发阶段才暴露', tone: 'bad' },
    ],
    sideCards: [
      { text: '影响模块未知', tone: 'warn' },
      { text: 'Regression list 缺失', tone: 'bad' },
      { text: 'Owner 难追踪', tone: 'muted' },
    ],
  },
  {
    id: 'requirement-probe',
    index: '04',
    nav: '探针',
    tone: 'probe',
    eyebrow: '第四幕 需求探针',
    title: '先用需求探针，刺入模糊点。',
    body:
      'AI 不急着生成文档，而是围绕当前需求持续追问目标用户、业务规则、异常场景和验收标准，把模糊描述变成可处理信号。',
    tags: ['需求探针', 'AI 澄清', '槽位补全'],
    label: 'Probe active',
    state: 'probing',
    leftTitle: '探针槽位',
    sideTitle: 'AI 追问',
    mainKicker: 'Requirement Probe',
    moduleTitle: '探针把模糊需求变成结构化信号',
    moduleSubtitle: '每一次追问都写回同一个 Requirement，而不是散落成新的聊天记录。',
    bricks: [
      { text: '目标用户：已确认', tone: 'hot' },
      { text: '业务规则：已补全', tone: 'hot' },
      { text: '异常场景：继续追问', tone: 'warn' },
      { text: '验收标准：待确认', tone: 'warn' },
      { text: '权限规则：已关联', tone: 'hot' },
    ],
    blocks: [
      { text: 'AI：失败重试是否需要进入验收标准？', tone: 'hot' },
      { text: '用户：需要，且不能覆盖旧版本。', tone: 'muted' },
      { text: '写回：acceptance_criteria.retry_policy', tone: 'hot' },
    ],
    sideCards: [
      { text: 'Conversation persisted', tone: 'hot' },
      { text: 'AgentRun: probe', tone: 'hot' },
      { text: 'Context slots +4', tone: 'hot' },
    ],
  },
  {
    id: 'requirement-link',
    index: '05',
    nav: '关联',
    tone: 'link',
    eyebrow: '第五幕 需求关联',
    title: '把所有材料，关联到同一个需求锚点。',
    body:
      '对话、PRD、版本、评审、知识库和代码影响不再是独立页面，它们都挂在同一个 Requirement ID 下。',
    tags: ['需求关联', '统一锚点', '版本链路'],
    label: '关联网络成形',
    state: 'linked',
    leftTitle: '来源',
    sideTitle: '关系',
    mainKicker: 'Requirement Link',
    moduleTitle: 'Requirement 成为协作链路的中心节点',
    moduleSubtitle: '所有构件开始围绕同一个需求重排，形成可追踪资产。',
    bricks: [
      { text: 'Project', tone: 'hot' },
      { text: 'Version v0.2.0', tone: 'hot' },
      { text: 'Conversation', tone: 'hot' },
      { text: 'PRD Artifact', tone: 'hot' },
      { text: 'Review Report', tone: 'hot' },
    ],
    blocks: [
      { text: 'Requirement ID 作为全链路锚点', tone: 'hot' },
      { text: 'draft -> prd_draft -> reviewed -> approved', tone: 'hot' },
      { text: '每个产物保留 source_id / version_id / agent_run_id', tone: 'muted' },
    ],
    sideCards: [
      { text: '需求级对话', tone: 'hot' },
      { text: 'PRD 版本', tone: 'hot' },
      { text: 'AI 评审', tone: 'hot' },
    ],
  },
  {
    id: 'context-graph',
    index: '06',
    nav: '图谱',
    tone: 'graph',
    eyebrow: '第六幕 需求上下文图谱',
    title: '上下文图谱，让来源、状态和依赖显性化。',
    body:
      '需求上下文图谱把 PRD 段落、评审问题、知识切片、代码文件和历史版本连成可查询的结构，而不是一堆孤立内容。',
    tags: ['需求上下文图谱', '来源引用', '依赖关系'],
    label: 'Context graph',
    state: 'mapped',
    leftTitle: '节点',
    sideTitle: '来源',
    mainKicker: 'Context Graph',
    moduleTitle: '从文档变成可推理的上下文网络',
    moduleSubtitle: '图谱不是装饰，它让 AI 回答和影响分析都有来源依据。',
    bricks: [
      { text: 'PRD / 背景', tone: 'hot' },
      { text: 'PRD / 业务规则', tone: 'hot' },
      { text: 'AI Review / 验收标准', tone: 'warn' },
      { text: 'Human Review / 修改记录', tone: 'muted' },
      { text: 'GitLab / artifacts.py', tone: 'hot' },
    ],
    blocks: [
      { text: 'Developer QA -> source grounded answer', tone: 'hot' },
      { text: 'Impact Analysis -> linked code context', tone: 'hot' },
      { text: 'Unknown -> explicit uncertainty', tone: 'warn' },
    ],
    sideCards: [
      { text: 'source_id', tone: 'hot' },
      { text: 'chunk_id', tone: 'hot' },
      { text: 'confidence', tone: 'warn' },
    ],
  },
  {
    id: 'closed-loop',
    index: '07',
    nav: '闭环',
    tone: 'loop',
    eyebrow: '第七幕 需求闭环',
    title: '最终目标，是让需求自己形成闭环。',
    body:
      '从需求探针、需求关联、上下文图谱，到 PRD 生成、AI 评审、知识沉淀和只读影响分析，所有动作都进入可追踪的需求闭环。',
    tags: ['需求闭环', 'AgentRun', '可追踪'],
    label: 'Closed loop',
    state: 'closed',
    leftTitle: '生命周期',
    sideTitle: '追踪',
    mainKicker: 'Closed Loop',
    moduleTitle: '需求从碎片变成系统资产',
    moduleSubtitle: '不是多一个文档模板，而是一条可以持续演化的需求资产链路。',
    bricks: [
      { text: 'Probe', tone: 'hot' },
      { text: 'Link', tone: 'hot' },
      { text: 'Graph', tone: 'hot' },
      { text: 'PRD', tone: 'hot' },
      { text: 'Review', tone: 'hot' },
      { text: 'Impact', tone: 'hot' },
    ],
    blocks: [
      { text: 'Project -> Version -> Requirement -> Conversation', tone: 'hot' },
      { text: 'PRD -> Diff -> Review -> Approval', tone: 'hot' },
      { text: 'Knowledge -> Developer QA -> GitLab Impact -> Prototype', tone: 'hot' },
      { text: 'AgentRun 记录所有 AI 执行', tone: 'hot' },
    ],
    sideCards: [
      { text: '可生成', tone: 'hot' },
      { text: '可评审', tone: 'hot' },
      { text: '可追踪', tone: 'hot' },
      { text: '可关联代码', tone: 'hot' },
    ],
  },
];
