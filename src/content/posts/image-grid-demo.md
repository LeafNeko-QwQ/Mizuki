---
title: "图片画廊网格：语法与完整示例"
published: 2026-07-13
description: "图片画廊网格的完整说明：语法、参数、裁切、响应式行为、图注以及灯箱浏览。"
tags: [Markdown, 图库, 图片网格, 演示]
category: "示例"
draft: false
---

`:::grid` 是这个博客的图片画廊容器指令。它把普通的 Markdown 图片排成统一比例的响应式网格，并自动启用灯箱查看。文章配图、截图、作品集、小相册都可以用它。

同一个画廊里的图片使用相同的卡片比例。默认从中间裁切填满每张卡片，让每一行看起来整齐；点开任意一张，灯箱里显示的是完整原图。每个画廊有独立的灯箱分组，不会和文章里其它图片混在一起。

> 本文既是功能文档，也是视觉测试页。建议在桌面、平板、手机三种宽度下看一遍示例，再点开任意图片验证灯箱分组。

## 最简语法

把 Markdown 图片直接写在 `:::grid` 和结尾的 `:::` 之间：

````markdown
:::grid
![图片描述](./image-1.webp)

![图片描述](./image-2.webp)
:::
````

每张图片必须独占一个段落，图片之间留空行。画廊里只放图片；段落、列表、代码块都写在容器外面。

下面是最简语法跑出来的效果。不带参数时，默认三列、`16/10` 比例、`cover` 填充。

:::grid
![最简语法效果：第一张图](/images/demos/image-grid-demo/landscape-1.webp)

![最简语法效果：第二张图](/images/demos/image-grid-demo/landscape-2.webp)
:::

## 参数一览

所有参数写在开始指令后面的花括号里：`:::grid{parameter="value"}`。

| 参数 | 可选值 | 默认值 | 作用 |
| --- | --- | --- | --- |
| `columns` | `1` 到 `6` 的整数 | `3` | 桌面端每行列数。填错会回退到 `3`。 |
| `aspect` | 正数比例，如 `16/9`、`3/4`、`1/1` | `16/10` | 卡片显示比例，不是原图比例。 |
| `fit` | `cover`、`contain` | `cover` | 图片填充方式。`cover` 裁切填满；`contain` 保留完整图片，可能留白。 |

完整示例：

````markdown
:::grid{columns="3" aspect="16/9" fit="cover"}
![第一张图](./image-1.webp "可选图注")

![第二张图](./image-2.webp "可选图注")

![第三张图](./image-3.webp "可选图注")
:::
````

下面的效果就用了上面这套三列横图语法。可以对比卡片比例、列数，以及 title 优先于 alt 文本成为图注这件事：

:::grid{columns="3" aspect="16/9" fit="cover"}
![参数示例：第一张横图](/images/demos/image-grid-demo/landscape-1.webp "横图图注 1")

![参数示例：第二张横图](/images/demos/image-grid-demo/landscape-2.webp "横图图注 2")

![参数示例：第三张横图](/images/demos/image-grid-demo/landscape-3.webp "横图图注 3")
:::

## 图注与 alt 文本

图片的 alt 文本既作为无障碍替代文本，也默认作为图注。如果图片写了可选的 title，则改用 title 当图注：

```markdown
![供无障碍使用的文本](./image.webp "显示在图片下方的图注")
```

同一行里，图注统一贴着卡片底部对齐。某条图注换行也不会让其它卡片的高度错位。像 `3:4`、`16:9` 这样的比例文字可以直接写在正文、标题和 alt 文本里，不用转义。

这个例子同时演示了默认的 alt 图注、显式 title 图注，以及较长图注的底部对齐：

:::grid{columns="3" aspect="1/1"}
![这张没有 title，所以 alt 文本就是图注](/images/demos/image-grid-demo/square-1.webp)

![第二张方图，带无障碍 alt 文本](/images/demos/image-grid-demo/square-2.webp "这条 title 被显示为图注")

![一张 3:4 海报的无障碍描述](/images/demos/image-grid-demo/square-3.webp "这是一条较长的图注，用来检查图注换行后是否仍然与卡片底部对齐")
:::

## 布局与裁切

桌面端按 `columns` 指定的列数排列。宽度小于 `768px` 时最多两列，小于 `480px` 时变成一列。卡片外层固定 `aspect` 比例并裁掉圆角外的部分，图片铺满卡片，不带主题默认的图片外边距。

- 选 `cover`：推荐的默认值。图片从中间裁切填满卡片，画廊看起来最整齐。
- 选 `contain`：完整显示原图，不裁切。比例和卡片不一致时会露出主题背景色；不能裁的图片用这个。
- 既想保留完整图片又想不留空白，把 `aspect` 设成接近原图的比例，或者让它单独占一个网格。

下面的例子把同样的竖图分别放进 `16/9` 卡片，一个用 `cover` 一个用 `contain`。前者会裁切，后者保留完整图片并留出背景空间。

````markdown
:::grid{columns="3" aspect="16/9" fit="cover"}
![图片描述](./image-1.webp "可选图注")

![图片描述](./image-2.webp "可选图注")
:::

:::grid{columns="3" aspect="16/9" fit="contain"}
![图片描述](./image-1.webp "可选图注")

![图片描述](./image-2.webp "可选图注")
:::
````

:::grid{columns="3" aspect="16/9" fit="cover"}
![第一张 cover 效果](/images/demos/image-grid-demo/default-portrait-1.webp "Cover：居中裁切")

![第二张 cover 效果](/images/demos/image-grid-demo/default-portrait-2.webp "Cover：填满卡片")

![第三张 cover 效果](/images/demos/image-grid-demo/default-portrait-3.webp "Cover：布局更整齐")
:::

:::grid{columns="3" aspect="16/9" fit="contain"}
![第一张 contain 效果](/images/demos/image-grid-demo/default-portrait-1.webp "Contain：保留完整原图")

![第二张 contain 效果](/images/demos/image-grid-demo/default-portrait-2.webp "Contain：可能出现留白")

![第三张 contain 效果](/images/demos/image-grid-demo/default-portrait-3.webp "Contain：适合看边缘细节")
:::

## 默认配置

不写任何属性时，默认三列、`16/10` 比例、`cover` 裁切。这三张竖图用来验证默认裁切和图注。

````markdown
:::grid
![图片描述](./image-1.webp)

![图片描述](./image-2.webp)

![图片描述](./image-3.webp)
:::
````

:::grid
![默认配置：竖图一](/images/demos/image-grid-demo/default-portrait-1.webp)

![默认配置：竖图二](/images/demos/image-grid-demo/default-portrait-2.webp)

![默认配置：竖图三](/images/demos/image-grid-demo/default-portrait-3.webp)
:::

## 三列竖图：3:4

用 `aspect="3/4"` 时，三张竖图会被填进比例一致的竖向卡片。原图比例不同的话，`cover` 会从中间裁掉边缘。

````markdown
:::grid{columns="3" aspect="3/4"}
![竖图描述](./portrait-1.webp)

![竖图描述](./portrait-2.webp)

![竖图描述](./portrait-3.webp)
:::
````

:::grid{columns="3" aspect="3/4"}
![3:4 测试图一](/images/demos/image-grid-demo/default-portrait-1.webp "竖图 1")

![3:4 测试图二](/images/demos/image-grid-demo/default-portrait-2.webp "竖图 2")

![3:4 测试图三](/images/demos/image-grid-demo/default-portrait-3.webp "竖图 3")
:::

## 三列横图：16:9

这组演示三列布局下的常见视频封面比例。横图比例接近卡片时，裁切很少。

````markdown
:::grid{columns="3" aspect="16/9"}
![横图描述](./landscape-1.webp)

![横图描述](./landscape-2.webp)

![横图描述](./landscape-3.webp)
:::
````

:::grid{columns="3" aspect="16/9"}
![16:9 测试图一](/images/demos/image-grid-demo/feature-landscape-1.webp)

![16:9 测试图二](/images/demos/image-grid-demo/feature-landscape-2.webp)

![16:9 测试图三](/images/demos/image-grid-demo/feature-landscape-3.webp)
:::

## 两列方图：1:1

需要更大的预览卡片时用两列。第三张图会落到下一行。最后一行保持网格轨道宽度，不会把图片拉伸填满整行。

````markdown
:::grid{columns="2" aspect="1/1"}
![方图描述](./square-1.webp)

![方图描述](./square-2.webp)

![方图描述](./square-3.webp)
:::
````

:::grid{columns="2" aspect="1/1"}
![1:1 测试图一](/images/demos/image-grid-demo/mixed-square-1.webp)

![1:1 测试图二](/images/demos/image-grid-demo/mixed-square-2.webp)

![1:1 测试图三](/images/demos/image-grid-demo/mixed-square-3.webp)
:::

## 四列 + `contain`

`fit="contain"` 不裁原图。图片比例和卡片比例不同时会露出主题背景，这是预期行为，不是布局错误。这组同时验证四列网格与各自独立的灯箱分组互不干扰。

````markdown
:::grid{columns="4" aspect="16/9" fit="contain"}
![图片描述](./image-1.webp)

![图片描述](./image-2.webp)

![图片描述](./image-3.webp)
:::
````

:::grid{columns="4" aspect="16/9" fit="contain"}
![Contain：竖图一](/images/demos/image-grid-demo/default-portrait-1.webp)

![Contain：竖图二](/images/demos/image-grid-demo/default-portrait-2.webp)

![Contain：竖图三](/images/demos/image-grid-demo/default-portrait-3.webp)
:::

## 单列大图

图片需要更大的阅读尺寸时用一列。桌面、平板、手机都保持一列，原图在灯箱里仍然可看。

````markdown
:::grid{columns="1" aspect="16/9"}
![图片描述](./detail.webp)
:::
````

:::grid{columns="1" aspect="16/9"}
![单列测试图](/images/demos/image-grid-demo/feature-landscape-1.webp)
:::

## 五列稀疏排布

五列用来验证更高的列数支持。只有三张图时，最后一行保持左对齐，不会把图片拉伸。

````markdown
:::grid{columns="5" aspect="1/1"}
![缩略图描述](./thumb-1.webp)

![缩略图描述](./thumb-2.webp)

![缩略图描述](./thumb-3.webp)
:::
````

:::grid{columns="5" aspect="1/1"}
![五列测试图一](/images/demos/image-grid-demo/mixed-square-1.webp)

![五列测试图二](/images/demos/image-grid-demo/mixed-square-2.webp)

![五列测试图三](/images/demos/image-grid-demo/mixed-square-3.webp)
:::

## 六列混排

六列是当前上限。横图竖图混在一起，用来验证 `cover` 裁切、窄卡片上的图注以及密集的桌面布局。想让正文好读，一般两到四列更合适。

````markdown
:::grid{columns="6" aspect="1/1"}
![图片描述](./image-1.webp)

![图片描述](./image-2.webp)

![图片描述](./image-3.webp)

![图片描述](./image-4.webp)

![图片描述](./image-5.webp)

![图片描述](./image-6.webp)
:::
````

:::grid{columns="6" aspect="1/1"}
![六列测试图一](/images/demos/image-grid-demo/default-portrait-1.webp)

![六列测试图二](/images/demos/image-grid-demo/default-portrait-2.webp)

![六列测试图三](/images/demos/image-grid-demo/default-portrait-3.webp)

![六列测试图四](/images/demos/image-grid-demo/feature-landscape-1.webp)

![六列测试图五](/images/demos/image-grid-demo/feature-landscape-2.webp)

![六列测试图六](/images/demos/image-grid-demo/feature-landscape-3.webp)
:::

## 四列方图：1:1

四张比例一致的方图是典型的四列布局。桌面一行放四张，平板收成两列，手机一列。

````markdown
:::grid{columns="4" aspect="1/1"}
![方图描述](./square-1.webp)

![方图描述](./square-2.webp)

![方图描述](./square-3.webp)

![方图描述](./square-4.webp)
:::
````

:::grid{columns="4" aspect="1/1"}
![方图一](/images/demos/image-grid-demo/square-1.webp)

![方图二](/images/demos/image-grid-demo/square-2.webp)

![方图三](/images/demos/image-grid-demo/square-3.webp)

![方图四](/images/demos/image-grid-demo/square-4.webp)
:::

## 六列横图：16:9

六列横图适合缩略图预览、作品集和截图索引。即使原图比例略有差异，`cover` 也能把每张 `16/9` 卡片填得整齐。

````markdown
:::grid{columns="6" aspect="16/9"}
![横图描述](./landscape-1.webp)

![横图描述](./landscape-2.webp)

![横图描述](./landscape-3.webp)

![横图描述](./landscape-4.webp)

![横图描述](./landscape-5.webp)

![横图描述](./landscape-6.webp)
:::
````

:::grid{columns="6" aspect="16/9"}
![横图一](/images/demos/image-grid-demo/landscape-1.webp)

![横图二](/images/demos/image-grid-demo/landscape-2.webp)

![横图三](/images/demos/image-grid-demo/landscape-3.webp)

![横图四](/images/demos/image-grid-demo/landscape-4.webp)

![横图五](/images/demos/image-grid-demo/landscape-5.webp)

![横图六](/images/demos/image-grid-demo/landscape-6.webp)
:::

## 三列竖图：3:4

这六张竖图演示人物、海报或手机截图的常见排法。图片排成两行三列，图注贴底对齐。

````markdown
:::grid{columns="3" aspect="3/4"}
![竖图描述](./portrait-1.webp)

![竖图描述](./portrait-2.webp)

![竖图描述](./portrait-3.webp)

![竖图描述](./portrait-4.webp)

![竖图描述](./portrait-5.webp)

![竖图描述](./portrait-6.webp)
:::
````

:::grid{columns="3" aspect="3/4"}
![竖图一](/images/demos/image-grid-demo/portrait-1.webp)

![竖图二](/images/demos/image-grid-demo/portrait-2.webp)

![竖图三](/images/demos/image-grid-demo/portrait-3.webp)

![竖图四](/images/demos/image-grid-demo/portrait-4.webp)

![竖图五](/images/demos/image-grid-demo/portrait-5.webp)

![竖图六](/images/demos/image-grid-demo/portrait-6.webp)
:::

## 边缘有重要内容：`cover` 与灯箱

这些图片的边缘附近有重要文字或细节。`cover` 让网格整齐，但可能裁掉边缘；点开图片可以在灯箱里看未裁切的原图。边缘敏感的图片请写清图注，或者用下面的 `contain`。

````markdown
:::grid{columns="3" aspect="16/9" fit="cover"}
![边缘有重要内容](./critical-1.webp "打开灯箱查看完整的边缘内容")

![边缘有重要内容](./critical-2.webp "打开灯箱查看完整的边缘内容")

![边缘有重要内容](./critical-3.webp "打开灯箱查看完整的边缘内容")
:::
````

:::grid{columns="3" aspect="16/9" fit="cover"}
![边缘重要的图一](/images/demos/image-grid-demo/critical-1.webp "打开灯箱查看完整的边缘内容")

![边缘重要的图二](/images/demos/image-grid-demo/critical-2.webp "打开灯箱查看完整的边缘内容")

![边缘重要的图三](/images/demos/image-grid-demo/critical-3.webp "打开灯箱查看完整的边缘内容")
:::

## 极端比例 + `contain`

横幅、长截图这类极端比例的图片，用 `contain` 显示完整原图。它和 `cover` 不同，可能留出主题背景，但绝不裁掉内容。

````markdown
:::grid{columns="3" aspect="16/9" fit="contain"}
![完整截图描述](./wide-1.webp)

![完整截图描述](./wide-2.webp)

![完整截图描述](./wide-3.webp)
:::
````

:::grid{columns="3" aspect="16/9" fit="contain"}
![极端比例图一](/images/demos/image-grid-demo/extreme-1.webp)

![极端比例图二](/images/demos/image-grid-demo/extreme-2.webp)

![极端比例图三](/images/demos/image-grid-demo/extreme-3.webp)
:::

## 透明图片

透明图片会露出卡片的主题背景。这个单列 `contain` 例子方便看清透明区域、原图边缘和灯箱行为。

````markdown
:::grid{columns="1" aspect="16/9" fit="contain"}
![透明图片描述](./transparent.webp)
:::
````

:::grid{columns="1" aspect="16/9" fit="contain"}
![透明背景测试图](/images/demos/image-grid-demo/transparent-1.webp)
:::

## 灯箱浏览

点开网格里任意一张图，会打开 Fancybox 灯箱。里面可以缩放、旋转、全屏、看缩略图，也能用方向键切换。切换范围只限当前这个 `:::grid` 容器：例如点开「16:9 测试图一」，灯箱里只会在该小节的另外两张横图之间切换。

同一篇文章里的普通 Markdown 图片依然单独处理，不会加进任何网格画廊。

## 自检清单

1. 每个网格里的图片尺寸一致，图注在卡片下方。
2. 图片悬停时轻微放大；点开后能缩放、旋转，并用键盘切换。
3. 点开「16:9 测试图一」后，灯箱只在该小节的另外两张横图之间浏览。
4. 宽度小于 768px 时网格最多两列；小于 480px 时一列。
5. 「四列 + `contain`」里的竖图完整可见，有留白但没有裁切。
6. 五列、六列的网格在宽屏上保持指定列数，再按响应式规则收成两列或一列。
