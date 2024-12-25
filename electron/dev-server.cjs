const { spawn } = require('child_process')
const electron = require('electron')
const path = require('path')
const { createServer } = require('vite')

async function startViteServer() {
  const server = await createServer({
    configFile: path.resolve(__dirname, '../vite.config.ts'),
    mode: 'development'
  })
  await server.listen()
  return server
}

function startElectron() {
  const electronProcess = spawn(electron, ['.'], {
    env: {
      ...process.env,
      NODE_ENV: 'development',
      VITE_DEV_SERVER_URL: 'http://localhost:1987'
    }
  })

  electronProcess.stdout.on('data', data => {
    console.log(`Electron: ${data}`)
  })

  electronProcess.stderr.on('data', data => {
    console.error(`Electron Error: ${data}`)
  })

  electronProcess.on('close', () => {
    process.exit()
  })
}

// 启动开发环境
async function startDevEnvironment() {
  try {
    const viteServer = await startViteServer()
    console.log('Vite server started')
    
    // 等待一段时间确保服务器完全启动
    setTimeout(() => {
      startElectron()
    }, 2000)
    
    // 监听退出信号
    process.on('SIGINT', () => {
      viteServer.close()
      process.exit()
    })
  } catch (err) {
    console.error('Error starting dev environment:', err)
  }
}

startDevEnvironment() 