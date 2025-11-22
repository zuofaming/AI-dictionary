# 🚀 快速开始指南

## 5 分钟快速启动

### 步骤 1: 克隆项目

```bash
git clone https://github.com/your-username/AI-dictionary.git
cd AI-dictionary
```

### 步骤 2: 安装依赖

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..
```

### 步骤 3: 配置 API Key

1. 注册 OpenAI 账户：https://platform.openai.com/signup
2. 创建 API Key：https://platform.openai.com/api-keys
3. 在后端目录创建 `.env` 文件：

```bash
cd backend
cp .env.example .env
```

4. 编辑 `.env`，填入你的 API Key：

```env
OPENAI_API_KEY=sk-your-api-key-here
```

### 步骤 4: 启动应用

返回项目根目录并运行：

```bash
npm run dev
```

### 步骤 5: 开始使用

浏览器会自动打开 http://localhost:3000

1. 选择母语和目标语言
2. 开始查询单词！

## 💰 费用说明

使用 OpenAI API 会产生费用：

- **GPT-4**: ~$0.03-0.06 每次查询
- **DALL-E 3**: ~$0.04 每张图片
- **总计**: 平均每次完整查询约 $0.10

建议：
- 设置 OpenAI 账户的使用限额
- 在开发时可以注释掉图片生成功能以节省成本
- 考虑使用 GPT-3.5-turbo 替代 GPT-4（更便宜但质量稍低）

## 🐛 常见问题

### 问题 1: 依赖安装失败

**解决方案：**
```bash
# 清除缓存
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json

# 重新安装
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 问题 2: API 请求失败

**检查清单：**
1. ✅ 后端服务是否启动（http://localhost:5000/health）
2. ✅ `.env` 文件是否正确配置
3. ✅ OpenAI API Key 是否有效
4. ✅ 是否有足够的 API 配额

### 问题 3: 语音不工作

**解决方案：**
- 使用 Chrome、Edge 或 Safari 浏览器
- 检查浏览器是否允许网站使用音频
- 确保系统音量未静音

### 问题 4: 端口被占用

**解决方案：**
```bash
# 修改后端端口（backend/.env）
PORT=5001

# 修改前端代理配置（frontend/vite.config.ts）
# 将 target 改为 'http://localhost:5001'
```

## 🎯 下一步

- 📖 阅读完整 [README.md](./README.md)
- 🎨 自定义 UI 主题和样式
- 🔧 配置生产环境部署
- 🌟 为项目点个 Star！

## 💡 提示

**节省 API 费用：**
```typescript
// backend/src/services/openai.service.ts
// 将 gpt-4 改为 gpt-3.5-turbo
model: 'gpt-3.5-turbo'  // 更便宜！
```

**禁用图片生成（开发时）：**
```typescript
// backend/src/routes/lookup.ts
// 注释掉这几行：
// try {
//   imageUrl = await openAIService.generateImage(wordData.word);
// } catch (error) {
//   console.error('Image generation failed:', error);
// }
```

享受使用 AI Dictionary 学习语言！🎉
