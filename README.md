# The Last Crack

一个基于终端的黑客解谜游戏。

## 项目说明

这是一个模拟黑客入侵的解谜游戏，玩家需要通过各种终端命令和技巧来完成每一关的挑战。游戏包含多个关卡，每个关卡都有不同的主题和难度。

## 环境变量配置

项目使用 `.env` 文件来管理全局配置，主要包含以下变量：

### 版本信息
- `VITE_APP_VERSION`: 当前版本号 (例如: 1.0.1)
- `VITE_APP_COPYRIGHT`: 版权信息
- `VITE_APP_SERIAL`: 序列号

### 游戏配置
- `VITE_APP_LAST_LEVEL`: 最后一关的关卡号
- `VITE_APP_NAME`: 游戏名称
- `VITE_APP_AUTHOR`: 作者信息

## 开发说明

1. 克隆项目后，复制 `.env.example` 为 `.env`
2. 根据需要修改环境变量
3. 运行开发服务器：
   ```bash
   npm install
   npm run dev
   ```

## 许可证

MIT License