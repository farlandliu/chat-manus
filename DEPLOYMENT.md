# Readaly 部署指南

## 项目信息

- **GitHub 仓库**: https://github.com/farlandliu/chat-manus.git
- **技术栈**: Next.js 16.1.1 + Prisma 7.2.0 + Neon PostgreSQL + Auth.js
- **数据库**: Neon Serverless PostgreSQL

## 数据库信息

项目已配置 Neon 数据库：

- **Project ID**: patient-surf-90947167
- **Branch**: main (br-lively-violet-aepijebq)
- **Database**: neondb
- **连接字符串**: 已配置在 `.env` 文件中（不要提交到 Git）

## 初始数据

数据库已初始化，包含：

1. **管理员账户**
   - 邮箱: admin@readaly.com
   - 密码: admin123

2. **示例分类**
   - 技术 (slug: tech)
   - 生活 (slug: life)

3. **示例标签**
   - Next.js (slug: nextjs)
   - React (slug: react)

## 本地开发

### 1. 克隆仓库

```bash
git clone https://github.com/farlandliu/chat-manus.git
cd chat-manus
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

创建 `.env` 文件：

```env
# 数据库连接（使用现有的 Neon 数据库）
DATABASE_URL="postgresql://neondb_owner:npg_7theNE6CXPuo@ep-withered-river-aesap2md-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require"

# Auth.js 配置
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="E6eos5QsBXgK2I+X1Ak3p952wYyKMD5JOJeLkkL0BzU="

# Neon 项目信息
NEON_PROJECT_ID="patient-surf-90947167"
NEON_BRANCH_ID="br-lively-violet-aepijebq"
```

### 4. 生成 Prisma Client

```bash
pnpm prisma generate
```

### 5. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

## Vercel 部署

### 方法一：通过 Vercel Dashboard

1. 访问 https://vercel.com
2. 点击 "Import Project"
3. 选择 GitHub 仓库: `farlandliu/chat-manus`
4. 配置环境变量（见下方）
5. 点击 "Deploy"

### 方法二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
cd /path/to/chat-manus
vercel
```

### 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```
DATABASE_URL=postgresql://neondb_owner:npg_7theNE6CXPuo@ep-withered-river-aesap2md-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require

NEXTAUTH_URL=https://your-domain.vercel.app

NEXTAUTH_SECRET=E6eos5QsBXgK2I+X1Ak3p952wYyKMD5JOJeLkkL0BzU=

NEON_PROJECT_ID=patient-surf-90947167

NEON_BRANCH_ID=br-lively-violet-aepijebq
```

⚠️ **重要**: 部署后记得更新 `NEXTAUTH_URL` 为实际的域名！

## 其他平台部署

### Railway

1. 访问 https://railway.app
2. 连接 GitHub 仓库
3. 配置环境变量
4. 部署

### Netlify

1. 访问 https://netlify.com
2. 导入 GitHub 仓库
3. 构建命令: `pnpm build`
4. 发布目录: `.next`
5. 配置环境变量

### 自托管（VPS/云服务器）

```bash
# 1. 克隆仓库
git clone https://github.com/farlandliu/chat-manus.git
cd chat-manus

# 2. 安装依赖
pnpm install

# 3. 配置环境变量（创建 .env 文件）

# 4. 构建
pnpm build

# 5. 启动（使用 PM2）
pm2 start pnpm --name readaly -- start

# 或使用 systemd
sudo systemctl start readaly
```

## 已知问题和解决方案

### 问题 1: Prisma 7.x 和 Neon Adapter 兼容性

**症状**: 开发环境中数据库连接错误

**解决方案**:
1. 使用标准 Prisma Client（当前配置）
2. 或降级到 Prisma 6.x
3. 等待官方更新

### 问题 2: 环境变量未加载

**症状**: "DATABASE_URL is not set" 错误

**解决方案**:
- 确保 `.env` 文件在项目根目录
- 检查环境变量名称是否正确
- 重启开发服务器

## 安全建议

1. **修改默认密码**: 首次登录后立即修改管理员密码
2. **更新 NEXTAUTH_SECRET**: 生产环境使用新的密钥
3. **保护 .env 文件**: 不要提交到 Git
4. **启用 HTTPS**: 生产环境必须使用 HTTPS
5. **定期更新依赖**: 运行 `pnpm update` 更新依赖

## 监控和维护

### 查看日志

```bash
# Vercel
vercel logs

# PM2
pm2 logs readaly

# Docker
docker logs readaly
```

### 数据库备份

Neon 提供自动备份功能，也可以手动导出：

```bash
# 使用 pg_dump
pg_dump $DATABASE_URL > backup.sql
```

### 性能监控

- 使用 Vercel Analytics
- 配置 Sentry 错误追踪
- 使用 Neon 控制台监控数据库性能

## 技术支持

- **项目文档**: README.md
- **GitHub Issues**: https://github.com/farlandliu/chat-manus/issues
- **Neon 文档**: https://neon.tech/docs
- **Next.js 文档**: https://nextjs.org/docs

## 更新日志

### 2026-01-06
- 初始版本发布
- 实现基础 CMS 功能
- 集成 Auth.js 认证
- 配置 Neon 数据库
- 实现 SEO 优化
