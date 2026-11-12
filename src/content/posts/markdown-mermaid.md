---
title: Markdown 中的 Mermaid 图表
published: 2023-10-01
pinned: false
description: 在 Markdown 文章里使用 Mermaid 绘图的一个简单示例。
tags: [Markdown, 博客, Mermaid]
category: 示例
draft: false
---
# Markdown 配合 Mermaid 绘图完全指南

本文演示如何在 Markdown 文档中用 Mermaid 画各种复杂图形，包括流程图、时序图、甘特图、类图和状态图。

## 流程图示例

流程图很适合表示流程或算法步骤。

```mermaid
graph TD
    A[Start] --> B{Condition Check}
    B -->|Yes| C[Process Step 1]
    B -->|No| D[Process Step 2]
    C --> E[Subprocess]
    D --> E
    subgraph E [Subprocess Details]
        E1[Substep 1] --> E2[Substep 2]
        E2 --> E3[Substep 3]
    end
    E --> F{Another Decision}
    F -->|Option 1| G[Result 1]
    F -->|Option 2| H[Result 2]
    F -->|Option 3| I[Result 3]
    G --> J[End]
    H --> J
    I --> J
```

## 时序图示例

时序图展示对象之间随时间发生的交互。

```mermaid
sequenceDiagram
    participant User
    participant WebApp
    participant Server
    participant Database

    User->>WebApp: Submit Login Request
    WebApp->>Server: Send Auth Request
    Server->>Database: Query User Credentials
    Database-->>Server: Return User Data
    Server-->>WebApp: Return Auth Result
    
    alt Auth Successful
        WebApp->>User: Show Welcome Page
        WebApp->>Server: Request User Data
        Server->>Database: Get User Preferences
        Database-->>Server: Return Preferences
        Server-->>WebApp: Return User Data
        WebApp->>User: Load Personalized Interface
    else Auth Failed
        WebApp->>User: Show Error Message
        WebApp->>User: Prompt Re-entry
    end
```

## 甘特图示例

甘特图很适合展示项目排期和时间线。

```mermaid
gantt
    title Website Development Project Timeline
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d
    
    section Design Phase
    Requirements Analysis      :a1, 2023-10-01, 7d
    UI Design                 :a2, after a1, 10d
    Prototype Creation        :a3, after a2, 5d
    
    section Development Phase
    Frontend Development      :b1, 2023-10-20, 15d
    Backend Development       :b2, after a2, 18d
    Database Design           :b3, after a1, 12d
    
    section Testing Phase
    Unit Testing              :c1, after b1, 8d
    Integration Testing       :c2, after b2, 10d
    User Acceptance Testing   :c3, after c2, 7d
    
    section Deployment
    Production Deployment     :d1, after c3, 3d
    Launch                    :milestone, after d1, 0d
```

## 类图示例

类图展示系统的静态结构，包括类、属性、方法以及它们之间的关系。

```mermaid
classDiagram
    class User {
        +String username
        +String password
        +String email
        +Boolean active
        +login()
        +logout()
        +updateProfile()
    }
    
    class Article {
        +String title
        +String content
        +Date publishDate
        +Boolean published
        +publish()
        +edit()
        +delete()
    }
    
    class Comment {
        +String content
        +Date commentDate
        +addComment()
        +deleteComment()
    }
    
    class Category {
        +String name
        +String description
        +addArticle()
        +removeArticle()
    }
    
    User "1" -- "*" Article : writes
    User "1" -- "*" Comment : posts
    Article "1" -- "*" Comment : has
    Article "1" -- "*" Category : belongs to
```

## 状态图示例

状态图展示一个对象在生命周期里经历的状态序列。

```mermaid
stateDiagram-v2
    [*] --> Draft
    
    Draft --> UnderReview : submit
    UnderReview --> Draft : reject
    UnderReview --> Approved : approve
    Approved --> Published : publish
    Published --> Archived : archive
    Published --> Draft : retract
    
    state Published {
        [*] --> Active
        Active --> Hidden : temporarily hide
        Hidden --> Active : restore
        Active --> [*]
        Hidden --> [*]
    }
    
    Archived --> [*]
```

## 饼图示例

饼图适合展示占比和百分比数据。

```mermaid
pie title Website Traffic Sources Analysis
    "Search Engines" : 45.6
    "Direct Access" : 30.1
    "Social Media" : 15.3
    "Referral Links" : 6.4
    "Other Sources" : 2.6
```

## 小结

Mermaid 是在 Markdown 文档里画各类图表的强力工具。本文演示了流程图、时序图、甘特图、类图、状态图和饼图。这些图能帮你更清楚地表达复杂的概念、流程和数据结构。

用 Mermaid 的方法很简单：在代码块里标注 `mermaid` 语言，然后用简洁的文本语法描述图形，Mermaid 会自动把它渲染成图。

下一篇文章或者项目文档里可以试试用 Mermaid，内容会更容易看懂。
