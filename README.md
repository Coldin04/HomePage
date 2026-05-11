# Coldin04's Homepage

👋 你好，这是 [Coldin04](https://cold04.com) 的个人主页源码仓库。

这是一个简洁、响应式的静态个人主页，用于展示我的个人信息、社交链接以及一些工作项目。

## ✨ 特性

- **静态站点生成**：基于 [Eleventy](https://www.11ty.dev/) 构建，响应迅速且易于维护。
- **响应式设计**：适配桌面、平板和移动设备。
- **深色模式**：支持系统级深色模式自动切换。
- **交互细节**：平滑滚动、渐变文字效果、复制功能等。

## 📂 项目结构

```text
.
├── content/            # 内容目录 (Markdown)
│   ├── home/           # 首页内容
│   └── page/           # 其他页面内容 (aff, pgp)
├── templates/          # 模板目录 (Nunjucks)
│   ├── shared/         # 公用组件 (base, footer)
│   └── ...
├── public/             # 静态资源 (由 Eleventy 直接复制到输出目录)
│   ├── src/            # 样式表与图片
│   └── ...
├── .eleventy.js        # Eleventy 配置文件
├── package.json        # 项目依赖与脚本
└── README.md           # 项目说明
```

## 🚀 本地运行

1. **安装依赖**：
   ```bash
   pnpm install
   ```

2. **启动开发服务器**：
   ```bash
   pnpm run dev
   ```
   然后访问 `http://localhost:8080`。

3. **构建生产版本**：
   ```bash
   pnpm run build
   ```
   生成的内容将存放在 `dist/` 目录中。

## 🔗 链接

- **主页**: [https://cold04.com](https://cold04.com)
- **博客**: [https://blog.cold04.com](https://blog.cold04.com)
- **笔记**: [https://note.cold04.com](https://note.cold04.com)
---

*Created by Coldin04*
