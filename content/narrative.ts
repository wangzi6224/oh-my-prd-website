import {
  Bot,
  Braces,
  CheckCircle2,
  Code2,
  FileDiff,
  FileText,
  GitBranch,
  GitPullRequest,
  MessageSquareText,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type SceneId =
  | 'hero'
  | 'pain'
  | 'requirement-core'
  | 'conversation'
  | 'prd-generation'
  | 'version-diff'
  | 'review-approval'
  | 'knowledge-base'
  | 'developer-qa'
  | 'impact-analysis'
  | 'prototype'
  | 'final-loop';

export type NarrativeScene = {
  id: SceneId;
  index: string;
  nav: string;
  title: string;
  description: string;
  shortText?: string;
  icon: LucideIcon;
  phase: 'chaos' | 'structure' | 'assurance' | 'loop';
};

export const scenes: NarrativeScene[] = [
  {
    id: 'hero',
    index: '01',
    nav: '混乱需求',
    title: '别再让需求死在文档里。',
    description:
      'Oh My PRD 将对话、PRD、评审、知识库和代码影响分析串成一条可追踪的需求资产链路。',
    icon: Sparkles,
    phase: 'chaos',
  },
  {
    id: 'pain',
    index: '02',
    nav: '收束',
    title: '需求不是写完就结束。',
    description: '真正的问题，是它从未被结构化。',
    shortText: '需求从未被结构化。',
    icon: GitBranch,
    phase: 'chaos',
  },
  {
    id: 'requirement-core',
    index: '03',
    nav: '对象浮现',
    title: '每个需求不再只是一个标题。',
    description: '它是整个协作链路的锚点。',
    shortText: 'Requirement Core',
    icon: Workflow,
    phase: 'structure',
  },
  {
    id: 'conversation',
    index: '04',
    nav: '上下文槽位',
    title: 'AI 不只是回答。',
    description: '它不断刺探、补全、收口需求。',
    shortText: 'AI 澄清',
    icon: MessageSquareText,
    phase: 'structure',
  },
  {
    id: 'prd-generation',
    index: '05',
    nav: 'PRD 生长',
    title: '从模糊描述，到可评审的结构化 PRD。',
    description: '内容沿着需求核心自然展开，而不是再开一个孤立文档。',
    shortText: 'PRD',
    icon: FileText,
    phase: 'structure',
  },
  {
    id: 'version-diff',
    index: '06',
    nav: '版本闸口',
    title: 'AI 不直接覆盖正式文档。',
    description: '每一次修改，都留下版本轨迹。',
    shortText: 'Diff',
    icon: FileDiff,
    phase: 'assurance',
  },
  {
    id: 'review-approval',
    index: '07',
    nav: '评审闸口',
    title: 'AI 负责发现问题。',
    description: '人负责最终确认。',
    shortText: 'Review',
    icon: ShieldCheck,
    phase: 'assurance',
  },
  {
    id: 'knowledge-base',
    index: '08',
    nav: '知识结晶',
    title: '正式 PRD 不再只是文件。',
    description: '它成为可检索、可追溯的项目知识资产。',
    shortText: 'Knowledge Base',
    icon: Network,
    phase: 'assurance',
  },
  {
    id: 'developer-qa',
    index: '09',
    nav: '来源问答',
    title: '回答必须有来源。',
    description: '不确定，就明确说不确定。',
    shortText: 'Developer QA',
    icon: Search,
    phase: 'loop',
  },
  {
    id: 'impact-analysis',
    index: '10',
    nav: '只读影响',
    title: '需求终于能靠近代码。',
    description: '但系统只读分析，不替你改代码。',
    shortText: 'GitLab Impact',
    icon: Code2,
    phase: 'loop',
  },
  {
    id: 'prototype',
    index: '11',
    nav: '评审原型',
    title: 'PRD 不只停留在文字。',
    description: '它可以变成可预览、可评审的交互原型。',
    shortText: 'Prototype',
    icon: Braces,
    phase: 'loop',
  },
  {
    id: 'final-loop',
    index: '12',
    nav: '生命轨道',
    title: 'Oh My PRD',
    description: '把需求的一生，变成可追踪的系统。',
    shortText: 'AgentRun Trace',
    icon: CheckCircle2,
    phase: 'loop',
  },
];

export const ctas = [
  { label: '查看 GitHub', href: 'https://github.com/' },
  { label: '了解闭环', href: '#final-loop' },
  { label: '观看演示', href: '#conversation' },
];

export const projectDemo = {
  name: 'AI 需求工作台',
  version: 'v0.2.0',
};

export const requirementDemo = {
  title: 'PRD 生成与产物版本化',
  priority: 'P1',
  status: 'prd_draft',
  owner: 'Product Team',
  version: 'v0.2.0',
};

export const statusTrack = [
  'draft',
  'prd_draft',
  'ai_reviewed',
  'approved',
  'ready_for_dev',
] as const;

export const fragments = [
  { label: '聊天气泡', body: '审批规则是什么？', icon: MessageSquareText },
  { label: 'PRD 片段', body: '验收标准待补充', icon: FileText },
  { label: '评审意见', body: '异常场景缺失', icon: Bot },
  { label: '代码文件', body: 'artifact_service.py', icon: Code2 },
  { label: 'GitLab MR', body: 'readonly impact', icon: GitPullRequest },
];

export const prdSections = [
  '背景',
  '目标',
  '非目标',
  '用户角色',
  '功能需求',
  '业务规则',
  '边界条件',
  '异常场景',
  '验收标准',
  '风险点',
];

export const aiQuestions = [
  '目标用户是谁？',
  '业务规则有哪些？',
  '异常场景如何处理？',
  '验收标准如何定义？',
];

export const contextSlots = [
  { label: '目标用户', value: '产品经理 / 研发负责人' },
  { label: '业务规则', value: 'PRD 产物必须保留版本' },
  { label: '异常场景', value: '生成失败、审批驳回、历史回滚' },
  { label: '验收标准', value: 'Diff 可审阅，发布可追踪' },
];

export const reviewIssues = [
  { level: 'blocker', text: '验收标准缺少可测试条件' },
  { level: 'major', text: '异常场景未覆盖' },
  { level: 'minor', text: '权限规则描述不完整' },
];

export const knowledgeChunks = [
  'PRD / 背景',
  'PRD / 业务规则',
  'AI Review / 验收标准',
  'Human Review / 修改记录',
];

export const sourceCards = [
  'PRD / 验收标准',
  'AI Review / 验收标准',
  'Human Review / 修改记录',
];

export const prototypeFields = ['页面目标', '表单字段', '状态流转'];

export const impactReport = {
  risk: 'medium',
  complexity: 'medium',
  modules: ['RequirementWorkspace', 'ArtifactVersionService', 'ReviewAgent'],
  files: [
    'src/app/services/artifacts.py',
    'src/app/services/agents/product_agent.py',
    'src/app/api/requirements.py',
  ],
  regression: ['PRD 生成', '版本历史', 'Diff 展示', 'AI 评审入口'],
};

export const finalLoop = [
  'Project',
  'Version',
  'Requirement',
  'Conversation',
  'PRD',
  'Diff',
  'Review',
  'Approval',
  'Knowledge Base',
  'Developer QA',
  'GitLab Impact',
  'Prototype',
  'AgentRun Trace',
];
