# 🤝 贡献指南

感谢你考虑为 AI Dictionary 做贡献！

## 如何贡献

### 报告 Bug

在 GitHub Issues 中创建新的 issue，包括：
- 清晰的标题和描述
- 复现步骤
- 预期行为 vs 实际行为
- 截图（如适用）
- 环境信息（浏览器、Node 版本等）

### 提出新功能

在 GitHub Issues 中：
- 描述功能的使用场景
- 解释为什么这个功能有用
- 如果可能，提供 UI/UX 草图

### 提交 Pull Request

1. Fork 这个仓库
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 开发规范

### 代码风格

- 使用 TypeScript
- 遵循 ESLint 规则
- 使用有意义的变量和函数名
- 添加必要的注释

### 提交信息格式

```
<type>: <subject>

<body>

<footer>
```

**类型（type）：**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例：**
```
feat: add voice speed control

Added a slider to control speech synthesis speed.
Users can now adjust playback speed from 0.5x to 2x.

Closes #123
```

## 项目结构

```
AI-dictionary/
├── frontend/          # React 前端
│   ├── src/
│   │   ├── components/    # 可复用组件
│   │   ├── pages/         # 页面级组件
│   │   ├── services/      # API 调用
│   │   ├── store/         # 状态管理
│   │   └── utils/         # 工具函数
├── backend/           # Node.js 后端
│   ├── src/
│   │   ├── routes/        # API 路由
│   │   ├── services/      # 业务逻辑
│   │   └── models/        # 数据模型
```

## 测试

在提交 PR 前：
1. 确保所有功能正常工作
2. 测试移动端响应式设计
3. 检查控制台是否有错误
4. 验证 TypeScript 类型检查通过

## License

提交贡献即表示你同意你的代码将在 MIT 许可证下发布。
