const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-min'),
  maximize: () => ipcRenderer.send('window-max'),
  close: () => ipcRenderer.send('window-close'),
  toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen'),
  onWindowResize: (callback) => ipcRenderer.on('window-resize', callback)
})

contextBridge.exposeInMainWorld('systemAPI', {
  getSystemVolume: () => ipcRenderer.invoke('get-system-volume'),
  setSystemVolume: (volume) => ipcRenderer.send('set-system-volume', volume)
}) 