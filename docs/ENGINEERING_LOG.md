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
