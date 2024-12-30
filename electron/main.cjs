const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 960,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs'),
      webSecurity: true,
      sandbox: true,
      devTools: isDev
    },
    titleBarStyle: 'hidden',
    frame: false,
    resizable: true,
    show: false,
  })

  if (!isDev) {
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  try {
    if (isDev) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
      mainWindow.show()
      mainWindow.webContents.openDevTools()
    } else {
      const indexPath = path.join(app.getAppPath(), 'dist', 'index.html')
      await mainWindow.loadFile(indexPath)
      mainWindow.show()
    }
  } catch (err) {
    console.error('Failed to load URL:', err)
  }

  ipcMain.on('window-min', () => mainWindow.minimize())
  ipcMain.on('window-max', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })
  ipcMain.on('window-close', () => mainWindow.close())

  ipcMain.on('toggle-fullscreen', () => {
    if (mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false)
    } else {
      mainWindow.setFullScreen(true)
    }
  })

  mainWindow.on('resize', () => {
    mainWindow.webContents.send('window-resize', {
      width: mainWindow.getSize()[0],
      height: mainWindow.getSize()[1],
      isMaximized: mainWindow.isMaximized(),
      isFullScreen: mainWindow.isFullScreen()
    })
  })

  // 禁用刷新快捷键
  mainWindow.webContents.on('before-input-event', (event, input) => {
    // 禁用 F5 和 Ctrl+R/Command+R
    if (input.key === 'F5' || ((input.control || input.meta) && input.key === 'r')) {
      event.preventDefault()
    }
    // 禁用 Ctrl+Shift+R 和 Command+Shift+R
    if ((input.control || input.meta) && input.shift && input.key === 'r') {
      event.preventDefault()
    }
  })

  // 禁用右键菜单
  mainWindow.webContents.on('context-menu', (e) => {
    e.preventDefault()
  })

  // 禁用菜单栏快捷键
  mainWindow.setMenu(null)

  // 在 Mac 上额外禁用 Command+R
  if (process.platform === 'darwin') {
    mainWindow.webContents.on('before-input-event', (event, input) => {
      if (input.meta && input.key === 'r') {
        event.preventDefault()
      }
    })
  }
}

// 设置 CSP
app.on('web-contents-created', (event, contents) => {
  contents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:;"
        ]
      }
    })
  })
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})