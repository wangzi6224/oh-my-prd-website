# Oh My PRD Narrative Website Design Decisions

This document records confirmed narrative, layout, interaction, and visual-direction decisions for the Oh My PRD website. Each section should be appended after that part of the page is discussed and accepted.

## 00. Global Motion And Integrated Experience

Status: confirmed

### Core Direction

The whole page should feel like one continuous interactive experience, closer to a premium game / product reveal website than a traditional structured marketing page.

The page must not feel like stacked modules, feature sections, or independent cards. Every section should feel physically connected to the previous one through motion, shared visual objects, flow lines, and continuity of atmosphere.

### Motion Quality

The animation target is:

**smooth, premium, immersive, and restrained.**

It can be visually impressive, but should never become loud or performative.

Rules:

- Motion should feel physically motivated: flow, attraction, scan, unfold, split, crystallize, orbit.
- Avoid random fade-up sections that feel like normal marketing blocks.
- Avoid jump cuts between scenes.
- Use scroll as a continuous progress driver, not just as an entrance trigger.
- Most transitions should be slow enough to feel cinematic.
- Main animation should have inertia, damping, and delayed response.
- Use glow sparingly; polish should come from depth, timing, material, and continuity.

### Text Reveal Language

Some text should use more advanced reveal methods instead of plain fade-in.

Reference directions from React Bits-style demos:

- split text / word-by-word reveal,
- blur-to-sharp text reveal,
- scroll-linked text reveal,
- masked line reveal,
- subtle velocity/flow-responsive text movement,
- occasional luminous sweep for brand/system moments.

Use these selectively:

- Hero logo and H1 can have the most expressive reveal.
- Important scene sentences can reveal by line or phrase.
- UI labels should remain calmer and more product-like.
- Do not animate every paragraph the same way.

### React Bits Reference Boundary

React Bits is a reference for motion taste and component patterns, especially animated backgrounds, fluid/glass surfaces, scroll reveal, split text, blur text, and scroll stack-style continuity.

Use it as inspiration, not as a visual style to copy directly.

Relevant inspiration categories:

- liquid / fluid backgrounds,
- glass surface / fluid glass materials,
- scroll reveal text,
- split / blur text,
- scroll-linked stacking or continuity.

Implementation can reuse or adapt ideas later only if they fit the project architecture, performance constraints, and Tailwind/GSAP/PixiJS stack.

### Page Unity

The website should behave like one continuous world:

- one hero fluid field,
- one evolving Requirement Core,
- one flow direction,
- one material language,
- one restrained color system,
- one continuous lifecycle narrative.

Each scene can have a different function, but not a different visual universe.

### Color And Material

Colors should feel natural and integrated:

- Primary: `#14aec2`.
- Base: deep teal-black from the real product dark theme.
- Support: low-saturation teal-gray, soft white, restrained status colors.
- Avoid aggressive purple/blue gradients unless they are extremely subtle.
- Avoid pure neon cyan overload.
- Avoid color shifts that make sections look like separate pages.

Material language:

- liquid field,
- refracted glass,
- fine borders,
- squircle surfaces,
- low-shadow product panels,
- subtle scan lines,
- soft depth layers.

### Structural Rule

Do not design the page as:

- hero + feature grid + cards + CTA,
- independent stacked landing sections,
- dense SaaS dashboard collage,
- a traditional product documentation page.

Design it as:

`fluid world -> requirement core -> product object -> artifact -> knowledge -> engineering loop -> lifecycle orbit`

### Implementation Implications

- GSAP should own the scroll-driven narrative timeline and text reveal sequencing.
- PixiJS should own liquid backgrounds, flow fields, graph lines, and orbit particles.
- Tailwind should own product surfaces, typography, spacing, and responsive layout.
- HTML must own all meaningful text for SEO and accessibility.
- Mobile should preserve atmosphere and continuity, but can reduce complex pinning and canvas effects.

### Performance Bar

Status: confirmed

The final website should target an Apple-level / premium animation-site feel while staying close to 60fps on modern desktop hardware.

Rules:

- Scroll-linked animation should prefer `transform` and `opacity`.
- Avoid scroll-scrubbed `filter`, large dynamic blur, layout-affecting properties, and frequent box-shadow changes.
- Canvas effects should keep DPR and draw counts controlled.
- Heavy scene effects should pause or degrade when offscreen, on mobile, or under `prefers-reduced-motion`.
- First-screen animation must begin almost immediately, with layered overlap rather than long serial delays.
- Scene transitions should overlap visually, so the page feels like one continuous product film rather than separate sections.

## 01. Hero: Teal Fluid Field

Status: confirmed

### Core Direction

The hero should open with a **Teal Fluid Field**: a full-screen, theme-color liquid environment that feels immersive, quiet, and system-like.

The goal is not to show the product immediately. The first moment should feel like entering a living requirement context that is about to be structured by Oh My PRD.

### Visual Style

- Base background: deep teal-black, close to the real product dark token `#0d1416`.
- Theme color: `#14aec2`, used as liquid highlight, refracted flow, soft edge light, and system pulse.
- Avoid a flat full-screen `#14aec2` fill. The theme color should feel like it fills the space through depth, motion, and light layers.
- Overall mood: quiet, submerged, cinematic, restrained.
- No loud neon, no decorative bokeh/orbs, no obvious sci-fi grid.

### Composition

- Logo begins at the visual center of the screen.
- The hero is brand-awakening first, landing-page content second.
- `Requirement Core` exists only as a subtle, blurred underwater presence behind or beneath the logo/title area.
- The next section should be hinted by a very thin downward teal flow line, not by an explicit arrow or "scroll down" label.

### Entry Sequence

1. Only the liquid field is visible.
2. The Oh My PRD logo slowly emerges as if rising from underwater.
3. The logo transitions from slightly blurred to sharp.
4. A left-to-right teal gradient sweep passes through the logo / Oh My PRD mark.
5. The logo subtly shifts upward.
6. The H1 appears below it:
   - `别再让需求死在文档里。`
7. Supporting copy appears after the H1:
   - `Oh My PRD 将对话、PRD、评审、知识库和代码影响分析串成一条可追踪的需求资产链路。`
8. CTA appears last.

### CTA Treatment

- Keep CTAs calm and limited.
- Primary CTA: `查看 GitHub`
- Secondary CTA: `了解闭环`
- `观看演示` can be demoted to a quieter text link if needed.

### Motion And Interaction

- Mouse movement should create subtle underwater resistance.
- Feedback layers:
  - nearby flow lines gently bend around the pointer,
  - highlights slightly refract,
  - particles/flow have a delayed drag response.
- The delay should feel like water damping, around 200-400ms.
- The logo sweep should not be constantly bright. It may repeat every 6-8 seconds as a quiet system pulse.

### Transition Out

On scroll, the liquid field should not cut away. It should gradually pull inward and begin forming the next section's central object: `Requirement Core`.

## 02. Scene 02: Submerged Convergence

Status: confirmed

### Core Direction

The second screen is a transition screen, not a feature screen.

Its job is to connect the hero's fluid environment to the product narrative by showing the liquid field condensing into the first stable requirement object.

Working name: **Submerged Convergence**.

### Narrative Role

This scene should express:

> 需求不是写完就结束。  
> 真正的问题，是它从未被结构化。

The scene should avoid showing a dense pain-point list. It should visually communicate that scattered context exists, but has not yet become a structured anchor.

### Visual Composition

- Continue the hero's Teal Fluid Field without a hard cut.
- The background flow changes from horizontal drifting to inward convergence.
- A translucent center object begins to form.
- Sparse context fragments appear as underwater traces:
  - Chat
  - Doc
  - Review
  - Code
  - Meeting
- These fragments should not look like full cards yet. They are residual shapes, labels, and refracted traces.
- The center object becomes readable only after the convergence completes:
  - `Requirement Core`

### Motion Sequence

1. Hero logo and H1 do not disappear instantly.
2. They shrink slightly, drift upward, fade, and gain a little blur.
3. Liquid flow direction gradually changes toward a central attraction point.
4. Fragment traces drift in with delay and low opacity.
5. When fragments approach the core, they briefly become clearer.
6. They are absorbed into the forming core.
7. The core forms in three layers:
   - blurred liquid light cluster,
   - thin internal structure/grid lines,
   - sharp HTML text `Requirement Core`.
8. At the end of the scene, the core remains alive and slowly sinks into the next screen.

### Interaction

- Pointer movement affects flow direction, not just particle position.
- Flow lines near the pointer should route around it, then slowly return to the center pull.
- The interaction should feel immersive but not game-like.

### Density Rule

Only one main action is allowed in this scene:

`flow -> attraction -> core formation`

No extra feature panels, no side-by-side PM/dev explanation, no dense broken-chain diagram at this stage.

### Implementation Notes

- PixiJS should own the liquid/flow/particle field and pointer disturbance.
- GSAP ScrollTrigger should own scroll progress, hero fade-out, fragment reveal, and core clarity.
- HTML owns the scene copy and `Requirement Core` label.
- CSS/Tailwind can handle blur, opacity, soft glow, and minimal surface styling.

## 03. Scene 03: Requirement Object Emergence

Status: confirmed

### Core Direction

The third screen introduces the first clearly structured product object.

Working name: **Requirement Object Emergence**.

The narrative action is:

`Requirement Core -> Requirement Object`

This scene should show that Oh My PRD is not simply writing a document. It is turning a loose requirement into a structured object that can anchor the full collaboration chain.

### Narrative Role

This scene should express:

> 每个需求不再只是一个标题。  
> 它是整个协作链路的锚点。

This is the first moment where real product UI language becomes visible, but the page should still feel like a cinematic narrative instead of a backend dashboard.

### Visual Composition

- Continue from the previous `Requirement Core`; do not hard-cut into a new section.
- The core settles at screen center.
- A translucent requirement object panel unfolds from the core.
- The panel should borrow from the real Oh My PRD product UI:
  - fine borders,
  - squircle corners,
  - restrained teal accents,
  - IBM Plex Sans / IBM Plex Mono hierarchy,
  - compact enterprise workbench feeling.
- Do not show the full three-column workbench yet.
- Show one central Requirement Card only.

### Required UI Content

The visible object should include only a few fields:

- `title`
- `priority`
- `version`
- `owner`
- `status`

Use the demo requirement:

- `PRD 生成与产物版本化`
- `P1`
- `v0.2.0`
- `Product Team`
- `prd_draft`

Also show a simple status rail:

`draft -> prd_draft -> ai_reviewed -> approved -> ready_for_dev`

The rail should be partially active through `prd_draft`.

### Motion Sequence

1. The core from Scene 02 slowly sinks into the center of the viewport.
2. The light cluster stretches into a soft rectangular/squircle surface.
3. The panel border appears first.
4. Field labels appear one by one.
5. Field values resolve after the labels.
6. The status rail draws from left to right.
7. The active state stops at `prd_draft`.
8. The background liquid field slows down, signaling that unstructured context has become stable structure.

### Interaction

- Pointer feedback should be quieter than in Scenes 01-02.
- When the pointer approaches the panel, borders may show a subtle refracted teal highlight.
- The status rail may have a slow, low-intensity flow highlight.
- No complex click interaction is needed in this scene.

### Density Rule

Only one product object should be visible.

Do not introduce:

- full workbench layout,
- dense metadata grids,
- feature cards,
- product manager vs developer comparison,
- complete PRD document.

The focus is **objectification**, not documentation yet.

### Implementation Notes

- HTML/Tailwind should own all field text.
- GSAP should control panel reveal, field stagger, and status rail drawing.
- PixiJS can continue providing the subdued flow background, but should no longer dominate the scene.

## 04. Scene 04: AI Clarification Slots

Status: confirmed

### Core Direction

The fourth screen should not be a normal chat interface.

Working name: **AI Clarification Slots**.

The narrative action is:

`Requirement Object -> Context Slots`

AI is shown as a clarification system that detects missing context and fills structured slots around the requirement object.

### Narrative Role

This scene should express:

> AI 不只是回答。  
> 它不断刺探、补全、收口需求。

The focus is context coverage, not conversation volume.

### Visual Composition

- The Requirement Object from Scene 03 remains visible.
- It moves slightly left or upward and becomes a stable anchor.
- Four context slots appear around or to the right of it:
  - `目标用户`
  - `业务规则`
  - `异常场景`
  - `验收标准`
- A thin teal flow line connects the requirement object to the slots.
- The AI Dock should be referenced only as a partial, translucent prompt layer, not a full side panel.
- The layout should feel like a structural scan, not a chat app.

### Required AI Questions

Use one active question at a time:

- `目标用户是谁？`
- `业务规则有哪些？`
- `异常场景如何处理？`
- `验收标准如何定义？`

Each active question should map to one slot.

### Motion Sequence

1. Requirement Object stays in scene and shifts to an anchor position.
2. Four gray context slots appear with low opacity.
3. A scanning flow line moves from the requirement object toward the slots.
4. One AI question appears as a single line.
5. The matching slot changes from gray to teal-highlighted.
6. A short placeholder answer/content appears inside that slot.
7. Repeat for all four slots.
8. The completed slots become a quiet "requirement profile layer".

### Interaction

- Pointer movement can subtly bend the connecting flow line.
- Hovering near a slot may increase its border highlight slightly.
- No editable input is required.
- No full chat history is required.

### Density Rule

At most, show:

- one compact Requirement Object,
- four context slots,
- one active AI question,
- one connecting flow line.

Do not show:

- full chat history,
- dense multi-turn Q&A,
- a full AI Dock sidebar,
- unrelated feature panels.

### Microcopy

Optional microcopy may include:

- `Context Coverage`
- `missing -> clarified`
- `AI clarification`

Use sparingly. The main text remains the two-line scene copy.

### Implementation Notes

- HTML/Tailwind should render all slot labels and questions.
- GSAP should handle slot stagger, active-question stepping, and line reveal.
- PixiJS may provide a subtle flexible connector/field disturbance, but the slots themselves should remain DOM.

## 05. Scene 05: Structured PRD Bloom

Status: confirmed

### Core Direction

The fifth screen turns clarified context into a structured PRD artifact.

Working name: **Structured PRD Bloom**.

The narrative action is:

`Context Slots -> PRD Artifact`

This scene should communicate that Oh My PRD composes clarified requirement context into a reviewable product document, without forcing the user to read a full PRD.

### Narrative Role

This scene should express:

> 从模糊描述，到可评审的结构化 PRD。

The focus is document structure emerging from context, not text generation volume.

### Visual Composition

- The four context slots from Scene 04 converge toward the center.
- The slots become teal structure lines.
- A central `PRD Artifact` panel unfolds.
- The panel should reference the real product's PRD Panel / Artifact Canvas, but remain cinematic and simplified.
- The page background remains deep teal-black; do not hard-cut to a bright document page.
- The PRD panel can use slightly lifted dark surfaces such as `#131e20` / `#16211f`.

### Required UI Content

Show a minimal PRD directory tree:

- `背景`
- `目标`
- `非目标`
- `功能需求`
- `业务规则`
- `边界条件`
- `验收标准`

Show 5-8 low-density body line blocks, not full Markdown paragraphs.

Show one small version label:

- `Artifact v1`

### Motion Sequence

1. Context slots from Scene 04 drift toward the center.
2. Each slot dissolves into a teal structure line.
3. The structure lines enter the forming PRD panel.
4. The PRD panel border expands first.
5. The directory tree appears item by item.
6. Body line blocks resolve as completed structure, not a fast typewriter stream.
7. `Artifact v1` appears after the document structure stabilizes.

### Interaction

- Pointer movement may create slight parallax on the PRD panel.
- Directory items may show a subtle hover highlight.
- No real editing interaction is required.
- No internal document scrolling is required.

### Density Rule

At most, show:

- one PRD Artifact panel,
- seven directory items,
- 5-8 body line blocks,
- one version label.

Do not show:

- a full Markdown editor,
- rich text toolbar controls,
- complete PRD body content,
- multi-page document chrome,
- extra feature cards.

### Implementation Notes

- HTML/Tailwind owns directory labels, version label, and body line blocks.
- GSAP owns slot convergence, panel unfold, directory stagger, and body reveal.
- PixiJS may carry the structure-line transition, but the document content should remain DOM.

## 06. Scene 06: Versioned Diff Gate

Status: confirmed

### Core Direction

The sixth screen introduces controlled AI-assisted editing.

Working name: **Versioned Diff Gate**.

The narrative action is:

`PRD Artifact -> Proposed Diff -> Artifact v2`

This scene should show that AI can propose changes, but it does not overwrite the formal document directly. Every change must pass through a diff, a decision, and a version trail.

### Narrative Role

This scene should express:

> AI 不直接覆盖正式文档。  
> 每一次修改，都留下版本轨迹。

The focus is control and traceability, not a full diff tool.

### Visual Composition

- The `PRD Artifact` from Scene 05 remains visible.
- A selected paragraph or section is softly highlighted.
- The selected content splits into two low-density states:
  - left: `Artifact v1`
  - right: `Proposed Change`
- A thin central `Diff Gate` line separates the old and proposed states.
- A compact version rail appears:
  - `v1 -> candidate -> accepted -> v2`

### Real UI Reference

Reference the real product's Diff Drawer / Inline Diff Review language, but do not render a full drawer.

Use only the core traits:

- old content is low-saturation,
- additions are teal/green-highlighted,
- removals are restrained red,
- accept/reject controls are small,
- surfaces use fine borders and dark workbench styling,
- monospace labels can be used for version states.

### Motion Sequence

1. A section in the PRD Artifact is softly selected.
2. The selected segment separates left and right.
3. Left side resolves into `Artifact v1`.
4. Right side resolves into `Proposed Change`.
5. 3-5 diff line blocks highlight in sequence.
6. The central Diff Gate appears.
7. The `candidate` state is accepted through scroll progress.
8. A thin teal line flows into `v2`.
9. The old version sinks into the version rail rather than disappearing abruptly.

### Interaction

- Pointer near the Diff Gate may increase line glow slightly.
- Hovering diff lines may subtly brighten their border.
- Real accept/reject clicking is not required.
- If a micro-interaction is included, acceptance can happen automatically with scroll progress.

### Density Rule

At most, show:

- one split PRD segment,
- 3-5 diff line blocks,
- `v1 / candidate / v2` version states,
- small accept/reject controls.

Do not show:

- full document side-by-side diff,
- long diff output,
- large modal/drawer UI,
- tables or audit logs.

### Transition Out

At the end of the scene, the accepted `v2` candidate should flow into the next quality gate:

`Artifact v2 candidate -> Review Scan`

### Implementation Notes

- HTML/Tailwind should render version labels, diff lines, and accept/reject controls.
- GSAP should own segment selection, split motion, diff line highlight, candidate acceptance, and version rail progress.
- PixiJS can carry thin flow lines between version states, but should not render diff text.

## 07. Scene 07: Review Approval Gate

Status: confirmed

### Core Direction

The seventh screen introduces quality control and human confirmation.

Working name: **Review Approval Gate**.

The narrative action is:

`Artifact v2 candidate -> Review Scan -> Human Approval -> Published`

This scene should feel like a quality gate, not a report page.

### Narrative Role

This scene should express:

> AI 负责发现问题。  
> 人负责最终确认。

The focus is risk detection plus final human control.

### Visual Composition

- The `v2 candidate` from Scene 06 flows into a review gate.
- Use a product-UI abstraction, not a physical gate.
- Suggested flow:
  - `Artifact v2 candidate`
  - `Review Scan`
  - `Human Approval`
  - `Published`
- A PRD candidate panel remains the main visual object.
- Three compact severity annotations appear on or near the document.

### Real UI Reference

Reference the real product's ReviewPanel and approval status language, but keep it abstract and low-density.

Use only:

- severity pills,
- short issue annotations,
- a compact review summary,
- a quiet human approval confirmation,
- a stable published state.

### Required Review Issues

Use the demo issues:

- `blocker`: `验收标准缺少可测试条件`
- `major`: `异常场景未覆盖`
- `minor`: `权限规则描述不完整`

On screen, the severity label may be primary and the detailed text may appear as a small annotation.

### Motion Sequence

1. `v2 candidate` enters from the previous scene.
2. A scan line moves across the PRD candidate panel.
3. `blocker`, `major`, and `minor` annotations appear in sequence.
4. The `blocker` annotation holds slightly longer to emphasize meaningful risk detection.
5. The annotations condense into a compact Review Summary.
6. Human Approval appears as the final confirmation layer.
7. `Published` lights up as a stable teal state.
8. The panel becomes calmer and more stable, preparing for knowledge-base transformation.

### Interaction

- Hovering a severity pill may reveal one short line of issue detail.
- The `Published` state can show a subtle glow on hover.
- No real approval click is required.
- No modal is required.

### Density Rule

At most, show:

- one PRD candidate panel,
- three severity annotations,
- one compact Review Summary,
- one Human Approval / Published state.

Do not show:

- a full Review Report,
- a table of issues,
- long comment threads,
- multi-person approval workflow,
- modal dialogs.

### Transition Out

After `Published`, the PRD should stop behaving like a static document and begin transforming into knowledge chunks:

`Published PRD -> Knowledge Chunks`

### Implementation Notes

- HTML/Tailwind should render issue labels, issue text, summary, and approval state.
- GSAP should own scan movement, severity reveal, summary condensation, and published state transition.
- PixiJS can support scanning lines or subtle background flow, but should not own review text.

## 08. Scene 08: Knowledge Crystallization

Status: confirmed

### Core Direction

The eighth screen turns a published PRD into searchable project knowledge.

Working name: **Knowledge Crystallization**.

The narrative action is:

`Published PRD -> Knowledge Chunks -> Searchable Knowledge`

This scene can feel more open than the previous gates, but should remain low-density and focused.

### Narrative Role

This scene should express:

> 正式 PRD 不再只是文件。  
> 它成为可检索、可追溯的项目知识资产。

The focus is indexing and recall, not a full knowledge-base UI.

### Visual Composition

- The Published PRD from Scene 07 becomes a central knowledge core.
- The document is smoothly sliced into a few structured knowledge nodes.
- The nodes should feel like traceable chunks, not cards in a list.
- Four chunk nodes appear around the core:
  - `PRD / 背景`
  - `PRD / 业务规则`
  - `AI Review / 验收标准`
  - `Human Review / 修改记录`
- A minimal search input appears with query:
  - `审批规则`
- Related chunks gently highlight after the search query appears.

### Real UI Reference

Reference the real product's knowledge search page only through:

- search bar shape,
- teal focus glow,
- lightweight chip / metadata styling,
- fine-border result surface language.

Do not show:

- full Discover page,
- facets,
- filters,
- tables,
- upload/library management UI.

### Metadata Treatment

Each chunk can show only 2-3 metadata tags, selected from:

- `project_id`
- `version_id`
- `requirement_id`
- `section_path`

Metadata should be very small and secondary.

### Motion Sequence

1. Published PRD starts transforming into a knowledge core.
2. The document slices along its internal structure, not by shattering.
3. Each slice becomes a Knowledge Chunk node.
4. Chunk nodes connect back to the central `requirement_id`.
5. Metadata tags appear at very low visual weight.
6. The search input appears with `审批规则`.
7. Matching nodes brighten gently.
8. Non-matching nodes recede.
9. Subtle graph lines connect related chunks.

### Interaction

- Pointer near a knowledge node may move it slightly forward.
- The search box can show focus styling.
- No real typed search is required.
- PixiJS can own the point cloud and graph lines.
- DOM should own chunk labels and metadata text.

### Density Rule

At most, show:

- one knowledge core,
- four chunk nodes,
- 2-3 metadata tags per node,
- one search input,
- one search query.

Do not show:

- full search result lists,
- long document content,
- full knowledge library UI,
- upload or management controls.

### Transition Out

The next scene is developer Q&A. The transition should be:

`Searchable Knowledge -> Source-grounded Answer`

Highlighted knowledge nodes should flow into an answer panel instead of hard-cutting to a chat page.

### Implementation Notes

- HTML/Tailwind should render search input, chunk labels, and metadata tags.
- GSAP should own slicing, chunk emergence, query reveal, and highlight transitions.
- PixiJS should own optional point cloud / graph line movement.

## 09. Scene 09: Source-Grounded QA

Status: confirmed

### Core Direction

The ninth screen turns searchable knowledge into trustworthy developer answers.

Working name: **Source-Grounded QA**.

The narrative action is:

`Searchable Knowledge -> Source-grounded Answer`

This scene should show that answers are useful because they are grounded in sources and explicit about uncertainty.

### Narrative Role

This scene should express:

> 回答必须有来源。  
> 不确定，就明确说不确定。

The focus is trust, citation, and uncertainty boundary, not chat volume.

### Visual Composition

- Highlighted Knowledge Chunks from Scene 08 remain connected.
- They flow into an answer area instead of disappearing.
- Show one active Developer Question.
- Show one Answer Panel.
- Show 2-3 source cards beside or attached to the answer.
- Show one small uncertainty area at the end.

### Required Question Examples

Use one active question at a time:

- `这个需求的验收标准是什么？`
- `以前做过类似审批逻辑吗？`
- `测试应该重点回归哪些功能？`

Do not show all three as fully expanded content at once.

### Answer And Source Treatment

The answer should be structured but short.

Source cards should link visually back to Knowledge Chunks, such as:

- `PRD / 验收标准`
- `AI Review / 验收标准`
- `Human Review / 修改记录`

The uncertainty area can say:

- `不确定项：历史审批逻辑需结合代码影响分析确认`

### Real UI Reference

Reference the real product's AI Dock / Chat UI only through:

- lightweight input row,
- answer panel,
- source chip / reference card,
- uncertainty hint.

Do not show:

- full chat history,
- full side dock,
- multi-turn conversation,
- long streaming answer.

### Motion Sequence

1. Highlighted Knowledge Chunks from Scene 08 move toward the answer area.
2. Developer Question appears as a single focused prompt.
3. Answer Panel resolves from an empty state into a structured answer.
4. Answer sections fade in, not typewriter-spam.
5. Source cards appear beside corresponding answer lines.
6. Lines connect source cards back to chunk nodes.
7. The uncertainty area appears last.
8. The answer stabilizes as a citeable response.

### Interaction

- Hovering a source card should lightly highlight the corresponding chunk.
- Hovering the uncertainty area can use a subtle amber hint.
- No real input is required.
- No complex streaming effect is required.

### Density Rule

At most, show:

- one current question,
- one answer panel,
- 2-3 source cards,
- one uncertainty item.

Do not show:

- three full questions at once,
- full chat records,
- long answer text,
- unrelated panels.

### Transition Out

The next scene is GitLab impact analysis. The transition should follow the uncertainty boundary:

`Uncertainty -> Code Context Needed`

The uncertainty item should become the narrative bridge into read-only code impact analysis.

### Implementation Notes

- HTML/Tailwind should render question, answer, source cards, and uncertainty copy.
- GSAP should own chunk-to-answer transition, answer reveal, source linking, and uncertainty reveal.
- PixiJS may draw subtle source lines, but should not render answer text.

## 10. Scene 10: Read-only Impact Map

Status: confirmed

### Core Direction

The tenth screen brings requirement knowledge close to code while preserving a strict read-only safety boundary.

Working name: **Read-only Impact Map**.

The narrative action is:

`Uncertainty -> Code Context Needed -> Read-only Impact Map`

This scene should feel like an impact scan, not a GitLab repository page or IDE.

### Narrative Role

This scene should express:

> 需求终于能靠近代码。  
> 但系统只读分析，不替你改代码。

The focus is impact understanding and safety boundary.

### Visual Composition

- The uncertainty item from Scene 09 becomes the bridge into code impact.
- Suggested uncertainty bridge:
  - `历史审批逻辑需结合代码影响分析确认`
- A teal line connects the uncertainty item to an `ImpactAnalysisAgent` node.
- The agent node connects to impacted modules and file paths.
- Keep the graph low-density and readable.

### Required UI Content

Show:

- one Requirement / PRD summary fragment,
- one `ImpactAnalysisAgent` node,
- three module nodes:
  - `RequirementWorkspace`
  - `ArtifactVersionService`
  - `ReviewAgent`
- three file paths:
  - `src/app/services/artifacts.py`
  - `src/app/services/agents/product_agent.py`
  - `src/app/api/requirements.py`
- three status pills:
  - `risk: medium`
  - `complexity: medium`
  - `read-only`

### Real UI Reference

Reference the real product's Trace / graph / AgentRun language only through:

- nodes,
- lines,
- status pills,
- file path rows,
- agent scan trajectory.

Do not show:

- full GitLab repository tree,
- IDE layout,
- complex dependency graph,
- code diff,
- large file lists.

### Motion Sequence

1. Scene 09's uncertainty item emits a teal line.
2. The line connects to `ImpactAnalysisAgent`.
3. The agent node briefly enters a scanning state.
4. Module nodes light up according to impact.
5. File paths appear one by one.
6. `risk` and `complexity` status pills appear.
7. `read-only` lights up last to emphasize the safety boundary.

### Interaction

- Hovering a module node can highlight the related file path rows.
- Hovering `read-only` can show:
  - `分析影响，不修改代码`
- No repository expansion is required.
- No real GitLab connection is required.

### Density Rule

At most, show:

- one Requirement summary,
- one ImpactAnalysisAgent node,
- three module nodes,
- three file paths,
- three status pills.

Do not show:

- complete repository tree,
- large module map,
- many files,
- code preview,
- code changes.

### Transition Out

The next scene is HTML Prototype. The transition should be:

`Impact Map -> Reviewable Prototype`

After impact scope is clear, the requirement can also become a previewable prototype for product review.

### Implementation Notes

- HTML/Tailwind should render labels, modules, file paths, and status pills.
- GSAP should own uncertainty-to-agent line reveal, scan state, node highlight, path reveal, and read-only emphasis.
- PixiJS can own impact lines and subtle graph motion.

## 11. Scene 11: Reviewable Prototype

Status: confirmed

### Core Direction

The eleventh screen turns requirement structure and impact understanding into an isolated, previewable prototype.

Working name: **Reviewable Prototype**.

The narrative action is:

`Impact Map -> Reviewable Prototype`

This scene should show that PRD output can become a reviewable interaction prototype, without turning into a complex admin dashboard screenshot.

### Narrative Role

This scene should express:

> PRD 不只停留在文字。  
> 它可以变成可预览、可评审的交互原型。

The focus is preview, isolation, and versioning.

### Visual Composition

- Impact Map lines from Scene 10 recede.
- PRD structure fragments are extracted as page fields.
- A central browser-like `Prototype Preview` window appears.
- A small safety label appears:
  - `iframe sandbox`
- A small version rail appears:
  - `ArtifactVersion`
  - `Prototype v1`

### Prototype Preview Content

The preview should be a low-density generated business prototype, not a high-density admin dashboard.

It may show:

- a small left navigation,
- one title area,
- one approval/configuration form fragment,
- one status area,
- one primary action.

The prototype can imply a page such as approval-rule configuration or PRD artifact versioning.

### Real UI Reference

Reference the real product's Artifact Canvas / artifact output language only through:

- preview frame,
- artifact/version status,
- fine borders,
- low shadow,
- teal emphasis.

The prototype content itself should look like a generated result preview, not the Oh My PRD workbench UI.

### Motion Sequence

1. Impact Map module lines fade into the background.
2. PRD structure fragments become page fields.
3. Page fields drift into the browser preview window.
4. The browser window becomes clear from a transparent state.
5. Prototype internal layout appears layer by layer.
6. `iframe sandbox` lights up.
7. `Prototype v1` enters the ArtifactVersion rail.

### Interaction

- Pointer near the browser window can create slight depth/parallax.
- Hovering the sandbox label can show:
  - `隔离预览，不影响正式系统`
- No real iframe is required.
- No real form submission is required.

### Density Rule

At most, show:

- one browser preview window,
- three PRD field fragments,
- one sandbox label,
- one prototype version label,
- one simple prototype interface.

Do not show:

- a complete complex backend system,
- multiple pages,
- code,
- real iframe content,
- full admin dashboard.

### Transition Out

The final scene is the lifecycle loop. The transition should be:

`Prototype v1 -> Lifecycle Orbit`

All artifacts should resolve into one traceable requirement asset chain.

### Implementation Notes

- HTML/Tailwind should render the browser frame, prototype UI, sandbox label, and version label.
- GSAP should own field-to-preview movement, window reveal, internal layout reveal, and version rail transition.
- PixiJS can provide subtle field-flow lines, but should not render UI text.

## 12. Scene 12: Lifecycle Orbit

Status: confirmed

### Core Direction

The final screen closes the story into one traceable requirement lifecycle.

Working name: **Lifecycle Orbit**.

The narrative action is:

`Prototype v1 -> Lifecycle Orbit -> Oh My PRD`

This scene should feel like resolution and closure, not a feature overview.

### Narrative Role

This scene should express:

> Oh My PRD  
> 把需求的一生，变成可追踪的系统。

The focus is lifecycle closure and traceability.

### Visual Composition

- `Prototype v1` from Scene 11 enters the final orbit.
- All previous artifacts resolve into a single circular lifecycle path.
- The center is stable:
  - `Oh My PRD`
  - `Requirement Core`
- The orbit contains lifecycle labels:
  - `Project`
  - `Version`
  - `Requirement`
  - `Conversation`
  - `PRD`
  - `Diff`
  - `Review`
  - `Approval`
  - `Knowledge Base`
  - `Developer QA`
  - `GitLab Impact`
  - `Prototype`
  - `AgentRun Trace`

### Visual Style

Return to the hero's Teal Fluid Field, but in a resolved state.

Contrast:

- Hero: flowing, unknown, unstructured.
- Final: stable, circular, traceable.

The liquid field should move slowly around the lifecycle orbit rather than drifting chaotically.

### Motion Sequence

1. `Prototype v1` flows into the lifecycle orbit.
2. The orbit path gradually closes.
3. Lifecycle nodes light up in order.
4. Each node shows only a short label.
5. Center `Oh My PRD` appears.
6. The orbit completes one slow cycle.
7. Final CTAs appear:
   - `GitHub`
   - `本地部署`
   - `查看演示流程`

### Interaction

- Pointer near the orbit can slightly pull or brighten nearby nodes.
- Hovering a node may show a very short explanation, but default state should stay compact.
- CTA hover can have a restrained teal glow.
- No complex menu or feature explorer is required.

### Density Rule

At most, show:

- one central core,
- 13 short lifecycle labels,
- one closing sentence,
- three CTAs.

Do not show:

- a feature grid,
- full workflow explanations,
- all previous UI fragments,
- long descriptions,
- marketing-stat blocks.

### Implementation Notes

- HTML/Tailwind should render labels, closing copy, and CTAs.
- GSAP should own orbit closure, node sequence, center reveal, and CTA reveal.
- PixiJS can own the orbit particles / circular field, but should not render text labels.
