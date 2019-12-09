# Quasar App (xyx)

This is a basic development environment
需安装quasar脚手架环境

## 安装依赖包
```bash
npm install
```

### 开始运行

- SPA模式 需调整相关代码

```bash
quasar dev
```

- SSR模式

```bash
quasar dev -m ssr
```

### Build the app for production

- SSR模式

```bash
quasar build -m ssr
```

### 其余模式根据quasar文档进行

## 部署建议

打包资源文件放置CDN上, 采用PM2管理node进程

## 后端情况

采用express + mongodb进行数据操作
相关文件位于前端开发环境项目同一层目录

## 联系方式

wx: xyx1530

qq: 565420423

