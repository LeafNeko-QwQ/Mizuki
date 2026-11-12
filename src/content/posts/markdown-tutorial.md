---
title: Markdown 教程
published: 2025-01-20
pinned: true
description: 一篇 Markdown 博客文章的简单示例，讲清怎么写 Markdown 文件。
tags: [Markdown, 博客]
category: 示例
licenseName: "Unlicensed"
author: emn178
sourceLink: "https://github.com/emn178/markdown"
draft: false
---

# Markdown 教程

这是一份 Markdown 示例，演示 Markdown 文件怎么写。本文把核心语法和扩展语法（GMF）放在一起讲。

- [块级元素](#块级元素)
  - [段落与换行](#段落与换行)
  - [标题](#标题)
  - [引用块](#引用块)
  - [列表](#列表)
  - [代码块](#代码块)
  - [分割线](#分割线)
  - [表格](#表格)
- [行内元素](#行内元素)
  - [链接](#链接)
  - [强调](#强调)
  - [代码](#代码)
  - [图片](#图片)
  - [删除线](#删除线)
- [其它](#其它)
  - [自动链接](#自动链接)
  - [反斜杠转义](#反斜杠转义)
- [行内 HTML](#行内-html)

## 块级元素

### 段落与换行

#### 段落

对应的 HTML 标签：`<p>`

用一个或多个空行分隔。（一行的内容只有**空格**或**制表符**，也算空行。）

代码：

    This will be
    inline.

    This is second paragraph.

预览：

---

This will be
inline.

This is second paragraph.

---

#### 换行

对应的 HTML 标签：`<br />`

在一行结尾加**两个或更多空格**。

代码：

    This will be not
    inline.

预览：

---

This will be not  
inline.

---

### 标题

Markdown 支持两种标题写法：Setext 和 atx。

#### Setext

对应的 HTML 标签：`<h1>`、`<h2>`

用任意数量的**等号（=）**「下划线」表示 `<h1>`，用**短横线（-）**表示 `<h2>`。

代码：

    This is an H1
    =============
    This is an H2
    -------------

预览：

---

# This is an H1

## This is an H2

---

#### atx

对应的 HTML 标签：`<h1>`、`<h2>`、`<h3>`、`<h4>`、`<h5>`、`<h6>`

在行首用 1 到 6 个 **井号（#）**，分别对应 `<h1>` 到 `<h6>`。

代码：

    # This is an H1
    ## This is an H2
    ###### This is an H6

预览：

---

# This is an H1

## This is an H2

###### This is an H6

---

atx 风格的标题还可以「闭合」：结尾井号的数量**不需要**和开头一致。

代码：

    # This is an H1 #
    ## This is an H2 ##
    ### This is an H3 ######

预览：

---

# This is an H1

## This is an H2

### This is an H3

---

### 引用块

对应的 HTML 标签：`<blockquote>`

Markdown 用类似邮件的 **>** 符号做引用。把文本硬换行、每行前面都加一个 > 时，效果最好。

代码：

    > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
    > consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    > Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
    >
    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
    > id sem consectetuer libero luctus adipiscing.

预览：

---

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

---

如果你偷懒，只在硬换行段落的第一行前面加 >，Markdown 也认。

代码：

    > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
    id sem consectetuer libero luctus adipiscing.

预览：

---

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

---

引用可以嵌套（也就是引用里再引用），多加一层 > 就行。

代码：

    > This is the first level of quoting.
    >
    > > This is nested blockquote.
    >
    > Back to the first level.

预览：

---

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

---

引用里可以放其它 Markdown 元素，包括标题、列表和代码块。

代码：

    > ## This is a header.
    >
    > 1.   This is the first list item.
    > 2.   This is the second list item.
    >
    > Here's some example code:
    >
    >     return shell_exec("echo $input | $markdown_script");

预览：

---

> ## This is a header.
>
> 1.  This is the first list item.
> 2.  This is the second list item.
>
> Here's some example code:
>
>     return shell_exec("echo $input | $markdown_script");

---

### 列表

Markdown 支持有序列表（带编号）和无序列表（带项目符号）。

#### 无序列表

对应的 HTML 标签：`<ul>`

无序列表用**星号（\*）**、**加号（+）**和**短横线（-）**。

代码：

    *   Red
    *   Green
    *   Blue

预览：

---

- Red
- Green
- Blue

---

等价于：

代码：

    +   Red
    +   Green
    +   Blue

也等价于：

代码：

    -   Red
    -   Green
    -   Blue

#### 有序列表

对应的 HTML 标签：`<ol>`

有序列表用数字加点号：

代码：

    1.  Bird
    2.  McHale
    3.  Parish

预览：

---

1.  Bird
2.  McHale
3.  Parish

---

有时候会不小心触发有序列表，比如这样写：

代码：

    1986. What a great season.

预览：

---

1986. What a great season.

---

可以在点号前加**反斜杠转义（\\）**：

代码：

    1986\. What a great season.

预览：

---

1986\. What a great season.

---

#### 缩进

##### 引用

要在列表项里放引用，引用块的 > 需要缩进：

代码：

    *   A list item with a blockquote:

        > This is a blockquote
        > inside a list item.

预览：

---

- A list item with a blockquote:

  > This is a blockquote
  > inside a list item.

---

##### 代码块

要在列表项里放代码块，代码块需要缩进两层 —— **8 个空格**或**两个制表符**：

代码：

    *   A list item with a code block:

            <code goes here>

预览：

---

- A list item with a code block:

      <code goes here>

---

##### 嵌套列表

代码：

    * A
      * A1
      * A2
    * B
    * C

预览：

---

- A
  - A1
  - A2
- B
- C

---

### 代码块

对应的 HTML 标签：`<pre>`

把整块内容的每一行至少缩进 **4 个空格**或 **1 个制表符**。

代码：

    This is a normal paragraph:

        This is a code block.

预览：

---

This is a normal paragraph:

    This is a code block.

---

代码块会一直持续到出现没有缩进的一行（或者文章结束）。

代码块里的 **_& 符号_** 和尖**括号（< 和 >）**会自动转换成 HTML 实体。

代码：

        <div class="footer">
            &copy; 2004 Foo Corporation
        </div>

预览：

---

    <div class="footer">
        &copy; 2004 Foo Corporation
    </div>

---

下面两节「围栏代码块」和「语法高亮」属于扩展语法，可以用另一种写法写代码块。

#### 围栏代码块

把代码包在 ` ``` `（三个反引号，如下所示）之间，就不必再缩进四个空格。

代码：

    Here's an example:

    ```
    function test() {
      console.log("notice the blank line before this function?");
    }
    ```

预览：

---

Here's an example:

```
function test() {
  console.log("notice the blank line before this function?");
}
```

---

#### 语法高亮

在围栏代码块里加一个语言标识，就会走语法高亮（[支持的语言](https://github.com/github/linguist/blob/master/lib/linguist/languages.yml)）。

代码：

    ```ruby
    require 'redcarpet'
    markdown = Redcarpet.new("Hello World!")
    puts markdown.to_html
    ```

预览：

---

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

---

### 分割线

对应的 HTML 标签：`<hr />`

在单独一行放**三个或更多短横线（-）、星号（\*）或下划线（\_）**。符号之间可以有空格。

代码：

    * * *
    ***
    *****
    - - -
    ---------------------------------------
    ___

预览：

---

---

---

---

---

---

---

---

### 表格

对应的 HTML 标签：`<table>`

这是扩展语法。

用**竖线（|）**分列，用**短横线（-）**分表头，用**冒号（:）**控制对齐。

最外层的**竖线（|）**和对齐标记都可以省略。分隔表头的每个单元格至少要写 **3 个分隔符**。

代码：

```
| Left | Center | Right |
|:-----|:------:|------:|
|aaa   |bbb     |ccc    |
|ddd   |eee     |fff    |

 A | B
---|---
123|456


A |B
--|--
12|45
```

预览：

---

| Left | Center | Right |
| :--- | :----: | ----: |
| aaa  |  bbb   |   ccc |
| ddd  |  eee   |   fff |

| A   | B   |
| --- | --- |
| 123 | 456 |

| A   | B   |
| --- | --- |
| 12  | 45  |

---

## 行内元素

### 链接

对应的 HTML 标签：`<a>`

Markdown 支持两种链接写法：行内式和参考式。

#### 行内式

行内链接的格式是这样：`[链接文字](URL "标题")`

标题是可选的。

代码：

    This is [an example](http://example.com/ "Title") inline link.

    [This link](http://example.net/) has no title attribute.

预览：

---

This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

---

如果是同一服务器上的本地资源，可以用相对路径：

代码：

    See my [About](/about/) page for details.

预览：

---

See my [About](/about/) page for details.

---

#### 参考式

可以预先定义链接引用，格式是：`[id]: URL "标题"`

标题同样是可选的。引用的时候写成：`[链接文字][id]`

代码：

    [id]: http://example.com/  "Optional Title Here"
    This is [an example][id] reference-style link.

预览：

---

[id]: http://example.com/ "Optional Title Here"

This is [an example][id] reference-style link.

---

也就是说：

- 方括号里是链接标识（**不区分大小写**，左边最多可缩进三个空格）；
- 后面跟一个冒号；
- 再跟一个或多个空格（或制表符）；
- 再跟链接地址；
- 链接地址可以用尖括号包起来（可选）。
- 后面可以再跟一个标题属性，用双引号、单引号或圆括号包起来（可选）。

下面三种链接定义是等价的：

代码：

    [foo]: http://example.com/  "Optional Title Here"
    [foo]: http://example.com/  'Optional Title Here'
    [foo]: http://example.com/  (Optional Title Here)
    [foo]: <http://example.com/>  "Optional Title Here"

方括号留空时，链接文字本身就当作标识。

代码：

    [Google]: http://google.com/
    [Google][]

预览：

---

[Google]: http://google.com/

[Google][]

---

### 强调

对应的 HTML 标签：`<em>`、`<strong>`

Markdown 把**星号（\*）**和**下划线（\_）**当作强调标记。**一个分隔符**是 `<em>`；\*_两个分隔符_是 `<strong>`。

代码：

    *single asterisks*

    _single underscores_

    **double asterisks**

    __double underscores__

预览：

---

_single asterisks_

_single underscores_

**double asterisks**

**double underscores**

---

但如果 \* 或 \_ 两边是空格，它就会被当成普通的星号或下划线。

也可以用反斜杠转义：

代码：

    \*this text is surrounded by literal asterisks\*

预览：

---

\*this text is surrounded by literal asterisks\*

---

### 代码

对应的 HTML 标签：`<code>`

用**反引号（`）**包起来。

代码：

    Use the `printf()` function.

预览：

---

Use the `printf()` function.

---

如果代码里本身要出现反引号，可以用**多个反引号**作为开头和结尾的分隔符：

代码：

    ``There is a literal backtick (`) here.``

预览：

---

``There is a literal backtick (`) here.``

---

包住代码的反引号内侧可以带空格 —— 开头后一个、结尾前一个。这样就能在代码段的首尾放真正的反引号：

代码：

    A single backtick in a code span: `` ` ``

    A backtick-delimited string in a code span: `` `foo` ``

预览：

---

A single backtick in a code span: `` ` ``

A backtick-delimited string in a code span: `` `foo` ``

---

### 图片

对应的 HTML 标签：`<img />`

Markdown 的图片语法刻意写得和链接很像，同样有两种写法：行内式和参考式。

#### 行内式

行内图片的语法是这样：`![替代文本](URL "标题")`

标题是可选的。

代码：

    ![Alt text](/path/to/img.jpg)

    ![Alt text](/path/to/img.jpg "Optional title")

预览：

---

![Alt text](https://s2.loli.net/2024/08/20/5fszgXeOxmL3Wdv.webp)

![Alt text](https://s2.loli.net/2024/08/20/5fszgXeOxmL3Wdv.webp "Optional title")

---

也就是说：

- 一个感叹号：!；
- 后面跟一对方括号，里面是图片的 alt 属性文字；
- 再跟一对圆括号，里面是图片地址或路径，以及可选的标题（用双引号或单引号包起来）。

#### 参考式

参考式图片的语法是这样：`![替代文本][id]`

代码：

    [img id]: https://s2.loli.net/2024/08/20/5fszgXeOxmL3Wdv.webp  "Optional title attribute"
    ![Alt text][img id]

预览：

---

[img id]: https://s2.loli.net/2024/08/20/5fszgXeOxmL3Wdv.webp "Optional title attribute"

![Alt text][img id]

---

### 删除线

对应的 HTML 标签：`<del>`

这是扩展语法。

GFM 给文字加上了删除线写法。

代码：

```
~~Mistaken text.~~
```

预览：

---

~~Mistaken text.~~

---

## 其它

### 自动链接

Markdown 支持一种简写，用尖括号把 URL 或邮箱地址包起来，就能生成「自动」链接。

代码：

    <http://example.com/>

    <address@example.com>

预览：

---

<http://example.com/>

<address@example.com>

---

GFM 会自动把标准 URL 转成链接。

代码：

```
https://github.com/emn178/markdown
```

预览：

---

https://github.com/emn178/markdown

---

### 反斜杠转义

Markdown 允许用反斜杠转义，生成那些本来在 Markdown 里有特殊含义的字面字符。

代码：

    \*literal asterisks\*

预览：

---

\*literal asterisks\*

---

Markdown 为下面这些字符提供反斜杠转义：

代码：

    \   backslash
    `   backtick
    *   asterisk
    _   underscore
    {}  curly braces
    []  square brackets
    ()  parentheses
    #   hash mark
    +   plus sign
    -   minus sign (hyphen)
    .   dot
    !   exclamation mark

## 行内 HTML

凡是 Markdown 语法覆盖不到的标记，直接写 HTML 就行。不需要加什么前缀或分隔符来声明「这里要从 Markdown 切换到 HTML」，照常写标签即可。

代码：

    This is a regular paragraph.

    <table>
        <tr>
            <td>Foo</td>
        </tr>
    </table>

    This is another regular paragraph.

预览：

---

This is a regular paragraph.

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

This is another regular paragraph.

---

注意：在**块级 HTML 标签内部**，Markdown 的格式语法**不会被处理**。

和块级标签不同，在**行内标签内部**，Markdown 语法**会被处理**。

代码：

    <span>**Work**</span>

    <div>
        **No Work**
    </div>

预览：

---

<span>**Work**</span>

<div>
  **No Work**
</div>
***
