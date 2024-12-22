interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_COPYRIGHT: string
  readonly VITE_APP_SERIAL: string
  readonly VITE_APP_LAST_LEVEL: number
  readonly VITE_APP_NAME: string
  readonly VITE_APP_AUTHOR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 