/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  directories: {
    output: 'release'
  },
  npmRebuild: false,
  buildDependenciesFromSource: false,
  electronDownload: {
    mirror: 'https://npmmirror.com/mirrors/electron/'
  },
  files: [
    "dist/**/*",
    "electron/**/*.cjs"
  ],
  mac: {
    target: [
      {
        target: "dmg",
        arch: ["x64", "arm64"]
      },
      {
        target: "zip",
        arch: ["x64", "arm64"]
      }
    ],
    icon: "public/icon.icns",
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: "build/entitlements.mac.plist",
    entitlementsInherit: "build/entitlements.mac.plist"
  },
  win: {
    target: [
      {
        target: "portable",
        arch: ["x64"]
      },
      {
        target: "zip",
        arch: ["x64"]
      }
    ],
    icon: "public/icon.ico",
    artifactName: "${productName}-${version}-${arch}.${ext}"
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true
  }
} 