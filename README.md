# Readaly - 内容管理网站

一个基于 Next.js 的现代化内容管理系统，包含后台管理和前端展示功能。

## 技术栈

- **框架**: Next.js 16.1.1 (App Router)
- **数据库**: Neon PostgreSQL (Serverless)
- **ORM**: Prisma 7.2.0
- **认证**: Auth.js (NextAuth v5)
- **UI 组件**: shadcn/ui + Tailwind CSS
- **语言**: TypeScript

## 功能特性

### 后台管理
- 用户认证系统（基于 Auth.js）
- 文章管理（创建、编辑、发布）
- 分类管理
- 标签管理
- 仪表盘统计

### 前端展示
- 响应式设计
- 文章列表和详情页
- 分类浏览
- SEO 优化（sitemap.xml、robots.txt、meta 标签）
- 动态渲染

## 数据库架构

- **users**: 用户表（支持管理员和普通用户角色）
- **posts**: 文章表
- **categories**: 分类表
- **tags**: 标签表
- **post_tags**: 文章标签关联表
- **accounts**: Auth.js 账户表
- **sessions**: Auth.js 会话表
- **verification_tokens**: Auth.js 验证令牌表

## 环境变量

创建 `.env` 文件并配置以下变量：

```env
# 数据库连接
DATABASE_URL="postgresql://..."

# Auth.js 配置
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Neon 项目信息（可选）
NEON_PROJECT_ID="your-project-id"
NEON_BRANCH_ID="your-branch-id"
```

## 安装和运行

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置数据库

确保已经配置好 `.env` 文件中的 `DATABASE_URL`。

### 3. 生成 Prisma Client

```bash
pnpm prisma generate
```

### 4. 推送数据库架构

```bash
pnpm prisma db push
```

### 5. 初始化数据

数据库已经初始化，包含：
- 管理员账户（admin@readaly.com / admin123）
- 示例分类（技术、生活）
- 示例标签（Next.js、React）

### 6. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000 查看前端页面。
访问 http://localhost:3000/admin 进入后台管理（需要登录）。

### 7. 构建生产版本

```bash
pnpm build
pnpm start
```

## 默认管理员账户

- **邮箱**: admin@readaly.com
- **密码**: admin123

⚠️ **重要**: 首次登录后请立即修改密码！

## 项目结构

```
readaly/
├── prisma/
│   ├── schema.prisma          # Prisma 数据库模型
│   └── prisma.config.ts       # Prisma 配置
├── src/
│   ├── app/
│   │   ├── admin/            # 后台管理页面
│   │   ├── api/              # API 路由
│   │   ├── auth/             # 认证页面
│   │   ├── category/         # 分类页面
│   │   ├── posts/            # 文章详情页
│   │   ├── layout.tsx        # 根布局
│   │   ├── page.tsx          # 首页
│   │   ├── robots.ts         # robots.txt
│   │   └── sitemap.ts        # sitemap.xml
│   ├── components/
│   │   ├── ui/               # shadcn/ui 组件
│   │   └── post-form.tsx     # 文章表单组件
│   └── lib/
│       ├── auth.ts           # Auth.js 配置
│       ├── prisma.ts         # Prisma 客户端
│       └── utils.ts          # 工具函数
├── .env                      # 环境变量
├── next.config.ts            # Next.js 配置
├── package.json              # 项目依赖
└── README.md                 # 项目文档
```

## 数据库信息

项目使用 Neon PostgreSQL 数据库：

- **Project ID**: patient-surf-90947167
- **Branch**: main (br-lively-violet-aepijebq)
- **Database**: neondb

数据库连接字符串已配置在 `.env` 文件中。

## 部署建议

### Vercel 部署

1. 将项目推送到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量：
   - DATABASE_URL
   - NEXTAUTH_URL (设置为您的域名)
   - NEXTAUTH_SECRET
4. 部署

### 其他平台

确保平台支持：
- Node.js 22+
- PostgreSQL 数据库
- 环境变量配置

## SEO 优化

项目已实现以下 SEO 优化：

1. **动态 Sitemap**: 自动生成包含所有文章和分类的 sitemap.xml
2. **Robots.txt**: 配置搜索引擎爬虫规则
3. **Meta 标签**: 每个页面都有完整的 meta 标签和 Open Graph 标签
4. **语义化 HTML**: 使用正确的 HTML5 标签
5. **响应式设计**: 移动端友好

## 开发说明

### 添加新文章

1. 登录后台管理系统
2. 进入"文章管理"
3. 点击"创建文章"
4. 填写标题、内容、分类等信息
5. 点击"发布"或"保存草稿"

### 管理分类和标签

- 分类和标签可以在后台管理系统中查看
- 目前支持查看，未来版本将支持创建和编辑

## License

MIT
