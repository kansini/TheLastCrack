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
  extraResources: [
    {
      from: "dist",
      to: "dist",
      filter: ["**/*", "!**/*.map"]
    }
  ],
  asar: {
    compression: true,
    smartUnpack: true
  },
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
    entitlementsInherit: "build/entitlements.mac.plist",
    dmg: {
      compression: 2,
      contents: [
        {
          x: 130,
          y: 220
        },
        {
          x: 410,
          y: 220,
          type: "link",
          path: "/Applications"
        }
      ]
    }
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