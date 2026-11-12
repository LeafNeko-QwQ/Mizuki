---
title: "写一篇博客文章"
published: 2024-04-01
description: "文章结构与 frontmatter（前置元数据）的通用示例。"
image: "./cover.webp"
tags: ["示例", "写作", "Markdown"]
category: 指南
draft: false
---

这个博客模板基于 [Astro](https://astro.build/) 构建。本文是一个很小的通用示例，演示一篇文章的文件结构与常用 frontmatter（前置元数据）。当前完整的字段定义与 Markdown 语法维护在 [内容编写指南](../../../../docs/CONTENT_AUTHORING.md)。

## 常用 frontmatter

```yaml
---
title: "一篇示例文章"
published: 2026-08-01
updated: 2026-08-08
description: "用于列表预览的简短摘要。"
image: ./cover.webp
tags: [示例, 指南]
category: 指南
draft: false
comment: true
---
```

| 字段          | 说明 |
|---------------|------|
| `title`       | 文章标题。 |
| `published`   | 文章发布日期。 |
| `pinned`      | 是否置顶到文章列表顶部。 |
| `priority`    | 置顶文章的优先级，数值越小越靠前（0、1、2……）。 |
| `description` | 文章简短描述，显示在列表页。 |
| `image`       | 文章封面路径。<br/>1. 以 `http://` 或 `https://` 开头：使用网络图片<br/>2. 以 `/` 开头：使用 `public` 目录下的图片<br/>3. 都不带：相对 Markdown 文件所在目录 |
| `tags`        | 文章标签。 |
| `category`    | 文章分类。 |
| `licenseName` | 文章内容的许可协议名称。 |
| `author`      | 文章作者。 |
| `sourceLink`  | 文章内容的来源或参考链接。 |
| `draft`       | 若为草稿则不显示。 |

## 文章文件放在哪

把文章文件放进 `src/content/posts/`。可以建子目录来归类文章和它自己的图片资源。

```
src/content/posts/
├── example.md
└── guides/
    ├── cover.webp
    └── index.md
```

像 `./cover.webp` 这样的相对图片，以当前文章文件所在目录为准解析。
