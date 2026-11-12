# 工程日志（ENGINEERING_LOG）

> 建立于 2026-11-12。此文件是本仓库的施工记录，也是后续维护的唯一时间线。

## 0. 这份日志怎么用

- 每次动代码**之前**先写一条记录（动机 + 计划改的文件），改完补上验证结果。
- **只追加、不覆盖、不删除历史条目**。判断错了也留着，后面写一条更正。
- 一条记录只写可核查的事实：改了哪个文件、为什么、怎么验证的、有没有 push。
- 没验证的写「未验证」，不写「应该没问题」。
- 涉及线上（Cloudflare）状态时，只写我能确认的部分；本地没做过的验证不冒充做过。

---

## 1. 铁律（用户 2026-11-12 明确要求）

1. **只在 `F:\develop\Mizuki` 内操作。** 工作区之外任何文件的读写，先取得用户允许。
2. **做什么都要留日志。** 没有日志记录的改动视为未发生。
3. **改完代码由我 commit + push 到 GitHub（origin/master）**，Cloudflare Pages 监听 Git 自动重建，生效有延迟，不保证立刻可见。
4. 不顺手改无关文件、不重构没坏的东西、不删除用户内容。
5. 不提交任何密钥/凭据；`.env` 不入库。
6. **只改用户点名要改的地方。** 用户没有明确说的，一律不动，包括「顺手看起来更好」的调整；确有必要动别处，先说明再等明确答复。

---

## 2. 项目事实（勘察所得，非推测）

| 项 | 事实 |
| --- | --- |
| 仓库 | `LeafNeko-QwQ/Mizuki`，当前分支 `master`，remote `https://github.com/LeafNeko-QwQ/Mizuki.git` |
| 主题来源 | Mizuki（Astro 主题，上游 `matsuzaka-yuki/Mizuki`），`package.json` version 9.0 |
| 技术栈 | Astro 7.1.3 + Svelte 5 + Tailwind CSS 4 + TypeScript |
| 包管理器 | `pnpm@11.5.3`（`packageManager` 字段锁定） |
| 构建链 | `pnpm build` = `update-anime.mjs` → `astro build` → 全局样式检查 → `pagefind` 索引 → 字体检查 |
| 本地工具链 | Node v22.22.2 可用；**pnpm 不在 PATH**；**node_modules 不存在** → 目前无法本地 build |
| 线上部署 | Cloudflare Pages，Build command `pnpm build`，输出目录 `dist`；域名 `https://leafneko.cc.cd`（用户告知，未实际访问验证） |
| GitHub Actions | `.github/workflows/deploy.yml` 仅在 push 到 `main` 时触发；当前分支是 `master` → 该工作流休眠，不会把 `dist` 推到 `pages` 分支。Cloudflare 不依赖它 |
| 内容现状 | `src/content/posts/` 全是模板演示文章（markdown-tutorial、markdown-mermaid、video、encrypted-post、image-grid-demo、draft、guide/ 等）；`src/content/spec/` 为 about / friends 演示页 |
| 已有自定义 | 仅一处：最后一个提交把站点语言从 `en` 改为 `zh_CN` |
| 站点身份 | **仍是演示值**：title `Mizuki`、subtitle `One demo website`、siteURL `https://mizuki.mysqil.com/`、profile 名 `まつざか ゆき`、头像与社交链接均为模板作者信息 |

---

## 3. 关键文件地图

| 路径 | 作用 |
| --- | --- |
| `src/config/siteConfig.ts` | 站点标题、副标题、`siteURL`、语言、时区、特色页开关、横幅、TOC、统计等总配置 |
| `src/config/profileConfig.ts` | 头像、昵称、简介、社交链接 |
| `src/config/navBarConfig.ts` | 导航栏结构与下拉菜单 |
| `src/config/index.ts` | 配置统一出口 |
| `src/content.config.ts` | 内容集合 schema（frontmatter 字段定义） |
| `src/content/posts/` | 文章正文（Markdown / MDX） |
| `src/content/spec/about.md`、`friends.md` | 关于页、友链页内容 |
| `astro.config.mjs` | 集成（swup / icon / expressive-code / sitemap / mdx）与 Markdown 插件链 |
| `package.json` | 脚本与依赖，构建链入口 |
| `public/` | 直接拷贝的静态资源（`_headers`、favicon、assets、js、pio） |
| `src/assets/` | 参与 Astro 图片优化的图片与字体 |
| `wrangler.toml` 或 Cloudflare 面板 | 本项目仓库内**无** wrangler 配置，构建配置在 Cloudflare 面板侧 |
| `docs/` | 主题自带文档（部署、内容编写、内容分离等） |
| `.env.example` | 环境变量样例（内容分离、IndexNow、B 站凭证），`.env` 不入库 |

---

## 4. 待确认（不猜，等用户答复）

1. **站点身份**：站点标题、副标题、署名、头像、个人简介、社交链接、导航栏是否精简。
2. **演示文章**：`src/content/posts/` 里的模板演示文章是删除、保留还是替换成真实文章。
3. **本地构建环境**：是否允许 `corepack` 拉 pnpm 并 `pnpm install`（数百 MB，需要联网），以便改完在本地真实 build 验证，而不是推上去赌 Cloudflare。
4. **`siteURL`**：改为 `https://leafneko.cc.cd/`（需带结尾斜杠）——等你确认后改。
5. **`deploy.yml`**：保持休眠、还是删掉/改分支，避免以后误推。

### 已落实（2026-11-12，用户当面答复）

- 署名 / 昵称：**LeafNeko**。
- 站点标题：**LeafNeko**；副标题：**没实力喵事个fvv**（取自用户自述简介，非编造）。用户对「站点标题/副标题是什么」的概念未展开，此处按用户自述材料填，若需改只要一句话。
- 简介与头像：intro 按用户原文整理；头像由用户提供图片转为 webp 覆盖模板头像。
- 社交链接：GitHub / Bilibili / 邮箱，三个，其余模板链接删除。
- 导航栏（`navBarConfig.ts`）、演示文章（`src/content/posts/`）、特色页开关（`siteConfig.featurePages`）：用户明确要求**暂不动**，保持原样。
- 遗留可见项：`siteConfig.navbarTitle.text` 仍是 `MizukiUI`（顶栏文字），属导航栏区域，按「暂不动」未改。
- **追加更正（同日）**：站点标题最终定为 **`LeafNekoの小窝`**，副标题 **`你可以在这逛逛`**，由用户明确指定，覆盖上面临时的 `LeafNeko` / `没实力喵事个fvv`。同时新增铁律第 6 条：只改用户点名的地方。
- **日语部分保留（用户 2026-11-12 明确指示）**：首页大标题「わたしの部屋」、日文轮播副标题、TOC 假名标记等日文内容**属于本站设计的一部分，不得翻译或替换**。这一条对后续所有改动持续有效。

### 仍属模板内容的位置（已定位，未改，等点名）

| 位置 | 具体内容 |
| --- | --- |
| `src/config/announcementConfig.ts` | 公告正文 `ブログへようこそ！これはサンプルの告知です`（意为「欢迎来到博客，这是一条示例公告」），链接文字 `Learn More` |
| `src/content/spec/about.md` | 关于页整页是主题功能的英文介绍（"This website is built with the Astro framework using the Mizuki theme…"） |
| `src/content/spec/friends.md` | 0 字节空文件，友链页没有内容 |
| `src/config/musicConfig.ts` | 音乐播放器走 meting 演示歌单（`id: 14164869977`），列表里是 22/7、Dazbee 等曲目 |
| `src/config/siteConfig.ts` | `siteStartDate` 仍为 `2025-01-01`，右下角「运行天数」按此为基准 |
| `src/config/siteConfig.ts` | `featurePages` 九项全开（番剧/日记/友链/项目/技能/时间线/相册/设备/AI 工具），页面里是演示数据 |

---

## 5. 变更记录

| 日期 | 操作 | 涉及文件 | 验证 | 是否推送 |
| --- | --- | --- | --- | --- |
| 2026-11-12 | 接手勘察：读 package.json / astro.config.mjs / 各 config / 部署文档 / 工作流，确认技术栈、部署链、站点身份现状；建立本工程日志 | `docs/ENGINEERING_LOG.md`（新增） | 文件已写入；勘察结论均来自实际读取的文件与 `git` 输出 | 是（随本次提交） |
| 2026-11-12 | 把站点基址从模板演示域名改为用户提供的正式域名 `https://leafneko.cc.cd/`（带结尾斜杠，Astro `site` 要求） | `src/config/siteConfig.ts` | 静态核对：`siteURL` 全仓仅被 `astro.config.mjs`（`site`、sitemap）与 `src/pages/posts/[...slug].astro`、`src/pages/[...permalink].astro` 引用，替换为等长字符串不改变结构；**本地未 build**（`node_modules` 不存在），构建结果由 Cloudflare 侧验证 | 是（随本次提交） |
| 2026-11-12 | 站点标题 `Mizuki`→`LeafNeko`、副标题 `One demo website`→`没实力喵事个fvv`（用户自述原话，未编造） | `src/config/siteConfig.ts` | `node --experimental-strip-types` 实际加载模块，输出 `LeafNeko \| 没实力喵事个fvv \| https://leafneko.cc.cd/`，语法与导出均正常 | 是（随本次提交） |
| 2026-11-12 | 个人资料改为真实身份：昵称 `LeafNeko`；简介按用户原文整理为 `没实力喵事个fvv · 生产日期 2010-10 · 爱玩音游 / DIY / 刷机 / 编程喵`；社交链接替换为 GitHub / Bilibili / Email 三条，删除模板的 Gitee、Codeberg、Discord | `src/config/profileConfig.ts` | 同上方式实际加载模块，输出 `LeafNeko \| GitHub/Bilibili/Email`；Bilibili 补全 `https://` 前缀，邮箱用 `mailto:` | 是（随本次提交） |
| 2026-11-12 | 用户提供的头像（289×289 JPEG）转为 webp（quality 92）覆盖模板头像 | `src/assets/images/avatar.webp` | 文件大小 18734 字节，尺寸一致；`profileConfig.avatar` 路径未变，引用链无需改动 | 是（随本次提交） |
| 2026-11-12 | 上线复核：抓取 `https://leafneko.cc.cd/` 原始 HTML 逐项核对（非只看构建成功） | 无代码改动 | `<title>` = `LeafNeko - 没实力喵事个fvv`；头像 `/_astro/avatar.Dq6xi_qW_Z16ydMs.webp` 返回 HTTP 200（13572 字节）；GitHub / Bilibili 链接 href 正确；简介全文含「生产日期 2010-10 · 爱玩音游 / DIY / 刷机 / 编程喵」。邮箱链接被 Cloudflare 侧改写为 `/cdn-cgi/l/email-protection#…`（Cloudflare 邮箱混淆，浏览器端自行还原），非站点问题 | 否（仅记录） |
| 2026-11-12 | 用户定稿站点标题与副标题，覆盖上一版临时值；同次把「只改用户点名的地方」写进铁律第 6 条 | `src/config/siteConfig.ts`、`docs/ENGINEERING_LOG.md` | `node --experimental-strip-types` 实际加载模块，输出 `LeafNekoの小窝 \| 你可以在这逛逛`；`git diff --stat` 确认仅 `siteConfig.ts` 两行变化，无其它改动 | 是（随本次提交） |
| 2026-11-12 | 标题定稿上线复核 | 无代码改动 | 推送后约 3 分钟抓取线上首页：`<title>` = `LeafNekoの小窝 - 你可以在这逛逛`，`og:site_name` = `LeafNekoの小窝` | 否（仅记录） |
| 2026-11-12 | 顶栏品牌区换成用户自己的：图标改为头像，文字改为站点标题。头像另存 96×96 版本到 `public/`（`navbarTitle.icon` 走 `url()` 解析，只认 `public` 目录，`src/assets` 里的图片拿不到） | `src/config/siteConfig.ts`、`public/assets/home/avatar.webp`（新增） | 只改 `navbarTitle.icon` 与 `navbarTitle.text` 两行，`mode` 仍为 `text-icon`；头像 3074 字节 | 是 |
| 2026-11-12 | 8 篇模板演示文章全部译为中文：正文、标题、摘要、标签、分类一起译；代码块、代码示例、Mermaid/PlantUML 图源、图片路径、组件导入、`alias` 等原样保留（图源里的英文标签属于代码，未动） | `src/content/posts/` 下 9 个文件（含 `guide/index.md`） | 自写静态校验脚本跑通：9 个文件 frontmatter 闭合、代码围栏开闭配对、`:::` 容器指令开闭配对、可见图片引用（含 `public` 绝对路径与相对路径）全部存在；已排除代码围栏与缩进代码块内的示例路径 | 是 |
| 2026-11-12 | 顶栏与中文化的上线复核 | 无代码改动 | 首页 `<title>` = `LeafNekoの小窝 - 你可以在这逛逛`，顶栏头像 `/assets/home/avatar.webp` 返回 HTTP 200（3074 字节）；7 篇文章页（image-grid-demo / content-pipeline-fixture / markdown-extended / encrypted-example / video / guide / markdown-mermaid）全部 HTTP 200；`markdown-tutorial` 页生成中文锚点 `id="块级元素"`、`id="段落与换行"`，目录链接 `href="#块级元素"` 对得上；MDX 实时表达式输出「这里的实时表达式会算出 3 个主题：组件、表达式、扩展 Markdown。」；图片网格渲染出 `class="image-grid"` 且图注为中文；归档页中文分类可访问 | 否（仅记录） |
| 2026-11-12 | 修切页「一瞬间无样式」闪烁：根因是 `cssCodeSplit: true` 让每个路由拆出不同的 CSS 集合（实测首页/归档 11 个、文章页 15 个），Swup 切换时更新 head 会先移除旧样式表再插入新的，中间出现无样式画面。改为 `cssCodeSplit: false`，全站共用同一组样式 | `astro.config.mjs` | 本地 `astro build` 后按页面分组统计：26 个页面引用完全相同的 `style.BHrotYVy.css` + `style.CnnGUsxZ.css`（合计 400882 字节），仅独立的 `pio/live2d-host.html` 无外链样式；改动前同类统计为 11 个 vs 15 个不一致 | 是 |
| 2026-11-12 | 顶栏头像改圆形：图标 `img` 的 `object-contain` 换为 `rounded-full object-cover`（png 兜底分支与普通分支共 2 处） | `src/components/organisms/navigation/Navbar.astro` | 构建产物 `dist/index.html` 中确认输出 `class="h-[1.75rem] w-[1.75rem] mr-2 rounded-full object-cover"` | 是 |
| 2026-11-12 | 本地开发依赖补齐：`corepack` 启用 pnpm 11.5.3，`pnpm install --frozen-lockfile` 完成（4 分 52 秒）。注意 pnpm 全局 store 位于 `C:\Users\leafn\AppData\Local\pnpm\store`（工作区外，已获用户口头授权） | `node_modules/`（未入库） | `pnpm exec astro build` 跑通，产出 27 个 HTML；收尾阶段被宿主「批量删除保护」拦在 `dist/.prerender` 清理处，属本机工具链限制，故本地 `dist` 缺 sitemap；线上 `/sitemap-index.xml`、`/sitemap-0.xml` 均返回 200，生产构建不受影响 | 否（仅本地环境） |
| 2026-11-12 | 闪烁修复与圆头像的上线复核 | 无代码改动 | 首页 / 归档 / markdown-tutorial / image-grid-demo / 关于页五处均只引用同一组 `style.BHrotYVy.css` + `style.CoLMKNoF.css`（构建哈希与本地不同属正常，Cloudflare 侧产物）；顶栏图标 class 线上为 `h-[1.75rem] w-[1.75rem] mr-2 rounded-full object-cover`，`/assets/home/avatar.webp` 返回 200 | 否（仅记录） |
| 2026-11-12 | 运行天数起点改为今天（用户要求） | `src/config/siteConfig.ts` | 该字段只在 `SiteStats.astro` 用于计算运行天数；构建产物 `dist/index.html` 中确认出现 `2026-11-12` | 是 |
| 2026-11-12 | 过渡观感增强：离开时加轻微缩小 + `blur(2px)` 形成纵深，进入时先略小再落位；全部包在 `prefers-reduced-motion: no-preference` 里，并在 `html:not(.is-animating)` 时清掉模糊避免残留 | `src/styles/transition-polish.css`（新增）、`src/layouts/Layout.astro`（在 `transition.css` 之后导入，保证覆盖顺序） | 未改动主题原有 keyframe 与时长；构建后 `dist/_astro/style.DhWp7RGZ.css` 中确认存在 `blur(2px)` 规则 | 是 |
| 2026-11-12 | 跨页滚动连续性：挂载 swup 官方 Scroll Plugin（切页平滑回顶、前进/后退恢复原滚动位置）。Astro 集成没暴露 plugins 入口，故在 `swup:enable` 后手动 `swup.use()`，并包 try/catch，挂载失败时回落到默认滚动行为 | `package.json`（新增 `@swup/scroll-plugin@4.0.0`）、`src/scripts/swup-manager.ts` | 本地 `astro build` 26 页通过、生成 sitemap；`dist/_astro/Layout.astro_astro_type_script_index_0_lang.C38uqtnp.js` 中确认含插件代码。**运行时行为未在浏览器里实测**（本机无浏览器自动化），线上以导航手感为准 | 是 |
| 2026-11-12 | 过渡增强与滚动插件的上线复核 | 无代码改动 | 线上 `style.DhWp7RGZ.css` 中含 `blur(2px)`（`scale(.985)` 被压缩器去掉了前导 0，故按字符串搜 `.985` 才有）；`Layout.astro_astro_type_script_index_0_lang.PK1dE4f4.js` 含 `animateScroll`，说明 Scroll Plugin 已随包上线；运行天数由客户端脚本计算，HTML 里只有配置值 `2026-11-12` | 否（仅记录） |
