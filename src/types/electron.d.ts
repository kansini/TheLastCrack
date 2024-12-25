interface WindowSize {
  width: number
  height: number
  isMaximized: boolean
  isFullScreen: boolean
}

interface ElectronAPI {
  minimize: () => void
  maximize: () => void
  close: () => void
  toggleFullscreen: () => void
  onWindowResize: (callback: (event: Event, size: WindowSize) => void) => void
}

interface Window {
  electronAPI: ElectronAPI
} 