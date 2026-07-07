# Oh My PRD Website

Oh My PRD Website 是 Oh My PRD 的叙事型产品官网。当前页面不是传统的「功能卡片式」落地页，而是一段围绕需求生命周期展开的滚动叙事：从需求失序、上下文断裂，到需求探针、结构化 PRD、上下文图谱、历史关联、逻辑评审和研发闭环。

项目使用 Next.js App Router 构建，所有核心文案都进入 DOM，以保证 SEO、可访问性和无障碍降级；动画层由 GSAP、Lenis 和 Three.js 承担。

## 技术栈

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis 平滑滚动
- Three.js WebGL 背景与图谱效果
- lucide-react 图标
- pnpm workspace

## 快速开始

```bash
pnpm install
pnpm dev
```

默认开发地址：

```txt
http://localhost:3000
```

生产构建：

```bash
pnpm build
pnpm start
```

常用检查：

```bash
pnpm lint
pnpm typecheck
```

## 项目结构

```txt
app/
  layout.tsx                 # 站点元信息、viewport、全局样式入口
  page.tsx                   # 页面入口，渲染 MarketingPage
  globals.css                # Tailwind、基础变量与全局 reset

components/
  narrative/
    MarketingPage.tsx        # 官网页面壳
    cinematic/
      CinematicStory.tsx     # 12 幕滚动叙事主结构
      CinematicCopy.tsx      # 文案与场景导航
      HeroLogoReveal.tsx     # 首屏品牌动效
    acts/
      graphics/ActGraphics.tsx
                                # 每一幕右侧图解/产品视觉
    effects/BrandMark.tsx    # 品牌标识
  ui/                        # 通用 UI 小组件
  webgl/
    RequirementCanvas.tsx    # Three.js 背景、需求图谱、能量流
    graph/graphData.ts       # 图谱节点与关系数据

content/
  cinematicNarrative.ts      # 12 幕叙事文案与面板数据

lib/
  scroll/useCinematicScroll.ts
                              # Lenis + ScrollTrigger 滚动叙事引擎
  hooks/                     # 响应式与动效偏好 hooks

styles/
  cinematic.css              # 页面主体视觉、布局和滚动叙事样式

docs/
  technical-architecture.md
  narrative-design-decisions.md
```

## 核心设计

### 12 幕叙事

页面内容集中在 `content/cinematicNarrative.ts`。每一幕包含：

- 导航标签
- 情绪/阶段 tone
- 滚动过渡 motion
- 主标题、说明文案、标签
- 右侧面板数据

如果只是调整官网文案、增删场景里的业务表达，优先改这个文件。

### 滚动驱动

`lib/scroll/useCinematicScroll.ts` 负责整页滚动叙事：

- 使用 Lenis 提供惯性滚动
- 使用 GSAP ScrollTrigger pin 住主舞台
- 按滚动进度写入 CSS 变量 `--p`、`--rev`、`--sp`
- 让每一幕基于连续进度完成出现、移动和退场
- 在 `prefers-reduced-motion` 下切换为更稳定的静态阅读体验

### WebGL 视觉层

`components/webgl/RequirementCanvas.tsx` 负责装饰性视觉：

- 全屏能量流背景
- 需求图谱节点与连线
- 图谱/关联/闭环阶段的重点视觉
- 指针视差和低成本帧循环

页面的有意义文本不依赖 canvas，canvas 只作为装饰和氛围层。

## 修改指南

### 修改文案

优先修改：

```txt
content/cinematicNarrative.ts
```

页面元信息在：

```txt
app/layout.tsx
```

### 修改场景图解

优先修改：

```txt
components/narrative/acts/graphics/ActGraphics.tsx
```

### 修改滚动节奏

优先查看：

```txt
lib/scroll/useCinematicScroll.ts
styles/cinematic.css
```

### 修改 WebGL 图谱

图谱数据：

```txt
components/webgl/graph/graphData.ts
```

渲染逻辑：

```txt
components/webgl/RequirementCanvas.tsx
```

## 开发约定

- 保持核心文案在 HTML/React DOM 中，不要把重要文字只画进 canvas。
- WebGL 层应保持装饰性，并使用 `aria-hidden`。
- 新增动画优先使用 `transform` 和 `opacity`，避免滚动过程中频繁触发布局重排。
- 移动端和 `prefers-reduced-motion` 下应保留可读内容，不强依赖复杂滚动编排。
- 项目使用 pnpm，不建议混用 npm、yarn 或 bun 生成额外 lockfile。

## 相关文档

- `docs/technical-architecture.md`：技术边界与架构说明
- `docs/narrative-design-decisions.md`：叙事、视觉和动效方向记录

