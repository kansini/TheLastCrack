import type { LevelData } from '@/types/game';

export const level5: LevelData = {
  id: 5,
  title: '数据恢复',
  description: '【第5关】一些重要文件被删除了，你需要使用数据恢复技术找回它们。',
  objectives: [
    '扫描删除的文件',
    '分析文件特征',
    '恢复重要数据',
    '验证文件完整性'
  ],
  requiredTasks: ['scan_deleted', 'recover_files'],
  fileSystem: {
    '~': ['readme.txt', 'scan_results.txt', '.trash'],
    '~/backup': ['backup_log.txt', 'fragments.dat'],
    '~/tools': ['recovery.exe', 'scanner.log']
  },
  fileContents: {
    'readme.txt': '数据恢复指南：\n1. 使用 scan 命令扫描删除的文件\n2. 使用 recover <文件名> 恢复文件\n3. 使用 verify <文件名> 验证完整性',
    
    'scan_results.txt': '扫描结果：\n发现以下删除的文件：\n1. important.doc (大小: 1.2MB)\n2. password.txt (大小: 1KB)\n3. config.sys (大小: 4KB)\n\n文件特征：\n- 删除时间：2024-01-15\n- 文件系统：ext4\n- 簇大小：4KB',
    
    'backup_log.txt': '备份日志：\n[INFO] 上次备份时间：2024-01-14\n[INFO] 备份文件列表：\n- important.doc\n- password.txt\n[ERROR] 备份中断',
    
    'fragments.dat': '文件碎片信息：\n1. important.doc (已找到90%)\n2. password.txt (已找到100%)\n3. config.sys (已找到75%)\n\n恢复优先级：\n1. password.txt (关键文件)\n2. important.doc (用户文件)\n3. config.sys (系统文件)',
    
    'recovery.exe': '[系统提示] 这是一个数据恢复工具\n使用方法：\n1. recover <文件名>\n2. verify <文件名>',
    
    'scanner.log': '扫描日志：\n[扫描开始]\n发现多个文件碎片\n位置：0x1000-0x2000\n特征：文档文件头\n状态：可恢复\n[扫描结束]'
  },
  hints: [
    '使用 scan 命令扫描被删除的文件',
    '查看 backup_log.txt 了解备份情况',
    '分析 fragments.dat 中的文件碎片信息',
    '优先恢复 password.txt',
    '使用 verify 命令确保文件完整性'
  ]
}; 