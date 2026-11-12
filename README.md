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
│   └── page/           # 其他页面内容 (projects, friends, aff, pgp)
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

页面以 `content/` 和 `templates/` 为唯一来源，部署时使用 `dist/`。根目录曾保留的 `aff/index.html`、`pgp/index.html` 和旧版 `style-page.css` 已移除，避免维护两套不一致的页面。

## Web 实现约定

- 首页及普通二级页面的内容最大宽度为 `44rem`；友链通过 `.friends-layout` 单独加宽到 `64rem`，便于大桌面显示四列。二级页面标题左对齐，公共页脚居中。作品完整介绍放在 `/projects/`，首页及页脚提供入口。

- 浏览器兼容性采用 Modern Web Guidance 默认的 **Baseline Widely available**。较新的能力只作为渐进增强，例如浏览器不识别 `fetchpriority` 时仍按默认优先级加载头像。
- 优先使用语义化 HTML 与原生交互。友链采用头像在上、文字居中的无边框条目，列数随可用宽度调整；整个条目悬停或接收键盘焦点时显示简介浮层，键盘焦点轮廓只画在条目外沿。浮层使用原生 Popover API，不支持时回退到原有定位方式，脚本不可用时展示完整简介。
- 保留站点既有的链接无下划线设计、配色和内容间距；现代化修改应保持现有视觉设计。支持系统深浅色、减少动态效果和强制颜色模式，并保留清晰的键盘焦点。涉及配色或布局的审查建议应先说明，由维护者决定是否采用。
- 首屏头像直接加载；友链头像保留懒加载并声明尺寸。固定版本的外部样式必须同时配置 SRI、匿名 CORS 和 referrer policy，升级资源时同步核验摘要。

审查与修改 HTML、CSS、客户端 JavaScript 时，先用 Google Chrome 的 [Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance?hl=zh-cn) 查询相关指南。用户级技能位于 `~/.agents/skills/modern-web-guidance/`，不作为站点依赖安装。

## 🔗 链接

- **主页**: [https://cold04.com](https://cold04.com)
- **博客**: [https://blog.cold04.com](https://blog.cold04.com)
- **笔记**: [https://note.cold04.com](https://note.cold04.com)
- **芜忧芜院（UWH）**: [https://uwh.cold04.com](https://uwh.cold04.com)
---

*Created by Coldin04*
