# 🌏 AI Dictionary - 多语言学习词典

一款基于 AI 的多语言学习词典，提供自然语言解释、图片生成、语音合成、智能对话、笔记本管理和闪卡学习等功能。

![AI Dictionary](https://img.shields.io/badge/AI-Dictionary-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-20-green)

## ✨ 核心功能

### 🎯 语言选择
- 支持全球最常用的 10 种语言
- 选择母语和目标语言
- 直观的视觉界面

### 📖 智能词典
- **自然语言解释**：用母语清晰解释词义
- **双例句展示**：每个例句都有母语翻译
- **用法说明**：朋友式的轻松讲解，涵盖：
  - 文化语境和使用场景
  - 语气和正式程度
  - 同义词和易混淆词汇
  - 关键差异点

### 🎨 AI 生成图片
- 为每个词语生成直观的概念图
- 帮助视觉记忆

### 🔊 语音合成
- 每个词语和例句都可朗读
- 自然发音，无延迟
- 基于浏览器原生 Web Speech API

### 💬 智能对话
- 随时提问关于词语的任何问题
- AI 在对话中继续深入解释
- 保持对话历史

### 📔 笔记本功能
- 保存查询过的词语
- 一键管理收藏的内容
- 支持删除和浏览

### ✨ 编故事功能
- AI 将笔记本中的词汇串联成故事
- 有趣的记忆方式
- 需要至少 3 个词汇

### 🎓 学习模式（闪卡）
- 自动生成闪卡
- 正面：目标语言词语 + 概念图
- 背面：母语定义 + 例句
- 流畅的翻面动画
- 进度追踪

### 🎭 庄子式逍遥美学
- 飘逸的动画效果
- 明亮、活力的视觉设计
- 优雅的交互体验

## 🛠️ 技术栈

### 前端
- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **Zustand** - 状态管理
- **React Router** - 路由管理
- **Axios** - HTTP 客户端
- **React Hot Toast** - 通知提示

### 后端
- **Node.js 20** - 运行时
- **Express** - Web 框架
- **TypeScript** - 类型安全
- **OpenAI API** - AI 服务
  - GPT-4 - 自然语言处理
  - DALL-E 3 - 图片生成

### 其他
- **Web Speech API** - 语音合成
- **LocalStorage** - 数据持久化

## 📦 安装和运行

### 前置要求

- Node.js 18+
- npm 或 yarn
- OpenAI API Key

### 1. 克隆仓库

```bash
git clone https://github.com/your-username/AI-dictionary.git
cd AI-dictionary
```

### 2. 安装依赖

```bash
# 安装根目录依赖
npm install

# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../backend
npm install
```

### 3. 配置环境变量

在 `backend` 目录下创建 `.env` 文件：

```bash
cd backend
cp .env.example .env
```

编辑 `.env` 文件，填入你的 OpenAI API Key：

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 4. 运行项目

#### 方式一：同时启动前后端（推荐）

在项目根目录：

```bash
npm run dev
```

这会同时启动：
- 前端开发服务器（http://localhost:3000）
- 后端 API 服务器（http://localhost:5000）

#### 方式二：分别启动

**启动后端：**
```bash
cd backend
npm run dev
```

**启动前端（新终端）：**
```bash
cd frontend
npm run dev
```

### 5. 访问应用

打开浏览器访问：http://localhost:3000

## 📁 项目结构

```
AI-dictionary/
├── frontend/                 # 前端代码
│   ├── src/
│   │   ├── components/      # React 组件
│   │   │   ├── WordResult.tsx
│   │   │   └── ChatDialog.tsx
│   │   ├── pages/           # 页面组件
│   │   │   ├── LanguageSelection.tsx
│   │   │   ├── Dictionary.tsx
│   │   │   ├── Notebook.tsx
│   │   │   └── LearnMode.tsx
│   │   ├── services/        # API 服务
│   │   │   └── api.ts
│   │   ├── store/           # 状态管理
│   │   │   └── useStore.ts
│   │   ├── types/           # TypeScript 类型
│   │   │   └── index.ts
│   │   ├── utils/           # 工具函数
│   │   │   ├── languages.ts
│   │   │   └── speech.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── backend/                 # 后端代码
│   ├── src/
│   │   ├── routes/          # API 路由
│   │   │   ├── lookup.ts
│   │   │   ├── chat.ts
│   │   │   ├── story.ts
│   │   │   └── image.ts
│   │   ├── services/        # 业务逻辑
│   │   │   └── openai.service.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── package.json
└── README.md
```

## 🎨 支持的语言

1. 🇺🇸 English (英语)
2. 🇨🇳 中文 (Chinese)
3. 🇪🇸 Español (西班牙语)
4. 🇮🇳 हिन्दी (印地语)
5. 🇸🇦 العربية (阿拉伯语)
6. 🇫🇷 Français (法语)
7. 🇷🇺 Русский (俄语)
8. 🇵🇹 Português (葡萄牙语)
9. 🇩🇪 Deutsch (德语)
10. 🇯🇵 日本語 (日语)

## 🚀 使用指南

### 1. 选择语言
- 启动应用后，首先选择你的母语
- 然后选择你要学习的目标语言
- 点击"开始学习"进入词典页面

### 2. 查询词语
- 在搜索框输入单词、短语或整句话
- 点击"查询"或按回车键
- AI 会生成详细的解释、例句和用法说明

### 3. 使用发音功能
- 点击任何词语或例句旁边的 🔊 图标
- 浏览器会使用自然语音朗读

### 4. 保存到笔记本
- 点击结果页的书签图标 📑
- 词语会被保存到你的笔记本
- 可以在笔记本页面管理所有保存的词语

### 5. 开启对话
- 点击 💬 图标开启与 AI 的对话
- 提问任何关于这个词的问题
- AI 会以友好的方式回答

### 6. 编故事
- 在笔记本页面，点击"编故事"按钮
- AI 会将你收藏的词语串联成一个有趣的故事
- 需要至少 3 个词语

### 7. 学习模式
- 点击"学习模式"进入闪卡系统
- 点击卡片翻面查看详细信息
- 使用前后按钮浏览所有卡片
- 点击"洗牌"随机打乱卡片顺序

## 🔧 开发说明

### 构建生产版本

**构建前端：**
```bash
cd frontend
npm run build
```

**构建后端：**
```bash
cd backend
npm run build
```

**运行生产版本：**
```bash
cd backend
npm start
```

### 环境变量

**后端环境变量（`backend/.env`）：**
- `PORT` - 后端服务器端口（默认：5000）
- `NODE_ENV` - 运行环境（development/production）
- `OPENAI_API_KEY` - OpenAI API 密钥（必需）
- `CORS_ORIGIN` - 允许的前端源（默认：http://localhost:3000）

## 🎯 API 端点

### POST /api/lookup
查询词语并获取详细信息

**请求体：**
```json
{
  "text": "hello",
  "targetLanguage": "en",
  "nativeLanguage": "zh"
}
```

### POST /api/chat
发送聊天消息

**请求体：**
```json
{
  "wordId": "uuid",
  "message": "这个词怎么用？",
  "conversationHistory": [],
  "targetLanguage": "en",
  "nativeLanguage": "zh"
}
```

### POST /api/generate-story
生成故事

**请求体：**
```json
{
  "words": ["hello", "world", "beautiful"],
  "targetLanguage": "en",
  "nativeLanguage": "zh"
}
```

### POST /api/generate-image
生成概念图

**请求体：**
```json
{
  "concept": "hello",
  "language": "en"
}
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 💡 常见问题

### Q: 为什么语音不播放？
A: 确保你的浏览器支持 Web Speech API。推荐使用 Chrome、Edge 或 Safari 浏览器。

### Q: 图片生成失败怎么办？
A: 检查你的 OpenAI API 配额。如果 DALL-E 调用失败，会自动使用占位符图片。

### Q: 如何获取 OpenAI API Key？
A: 访问 https://platform.openai.com/api-keys 创建账户并生成 API Key。

### Q: 支持离线使用吗？
A: 部分功能支持（如笔记本浏览），但 AI 功能需要网络连接。

## 🌟 特色亮点

- ✅ **完全响应式设计** - 移动端体验优先
- ✅ **零配置数据库** - 使用 LocalStorage 本地存储
- ✅ **现代化 UI** - Tailwind CSS + Framer Motion
- ✅ **类型安全** - 全栈 TypeScript
- ✅ **AI 驱动** - GPT-4 + DALL-E 3
- ✅ **自然语音** - Web Speech API
- ✅ **优雅动画** - 庄子式逍遥美学

## 📧 联系方式

如有问题或建议，欢迎通过 Issue 或 PR 与我们交流！

---

**Enjoy learning languages with AI! 🚀📚**
