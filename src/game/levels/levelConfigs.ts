import type { LevelData } from '@/types/game';

export const levelConfigs: Record<number, LevelData> = {
  1: {
    id: 1,
    title: '初识终端',
    description: '欢迎来到黑客模拟器。在这一关，你将学习基本的终端命令操作。',
    objectives: [
      '使用 ls 命令查看当前目录下的文件',
      '使用 cat 命令读取 welcome.txt 的内容',
      '找到隐藏的 .secret 文件并查看其内容'
    ],
    requiredTasks: ['read_welcome', 'find_secret'],
    fileSystem: {
      '~': ['welcome.txt', 'documents', '.secret', 'notes', 'tutorial'],
      '~/documents': ['intro.md', 'guide.txt'],
      '~/notes': ['day1.txt', 'reminder.txt'],
      '~/tutorial': ['basic_commands.md', 'tips.txt']
    },
    fileContents: {
      'welcome.txt': '欢迎来到终端世界！\n你的第一个任务是找到隐藏在某处的秘密文件。\n提示：并不是所有文件都会直接显示...',
      '.secret': '恭喜你找到了隐藏文件！\n这是你的第一步，接下来的挑战会更加有趣。\n密码提示：MOON_LIGHT',
      'intro.md': '# 终端使用指南\n\n在这个世界中，使用命令来探索和解决问题。\n\n常用命令：\n- ls：列出文件\n- cd：切换目录\n- cat：查看文件内容',
      'guide.txt': '记住，在终端中，以 . 开头的文件通常是隐藏文件。\n使用 ls -a 可以查看所有文件，包括隐藏文件。',
      'day1.txt': '今天是我的第一天，还在适应这个系统。\n导师说要特别注意隐藏文件...',
      'reminder.txt': '备忘：\n1. 检查所有可能的位置\n2. 留意文件中的特殊提示\n3. 记录找到的密码',
      'basic_commands.md': '# 基础命令使用\n\nls：列出文件和目录\n  -a：显示所有文件（包括隐藏文件）\n  -l：显示详细信息\n\ncd：切换目录\n  cd ..：返回上级目录\n  cd ~：返回主目录',
      'tips.txt': '小技巧：\n- 命令区分大小写\n- 使用 Tab 键可以自动补全命令和文件名\n- 使用方向键可以查看历史命令'
    },
    hints: [
      '试试使用 ls -a 命令来查看所有文件，包括隐藏文件',
      '文件名以 . 开头的通常是隐藏文件'
    ]
  },

  2: {
    id: 2,
    title: '密码破解',
    description: '在这一关，你需要学会破解简单的加密信息。',
    objectives: [
      '找到加密的信息',
      '使用解密工具破解密码',
      '使用解密的密问文'
    ],
    requiredTasks: ['decode_text'],
    fileSystem: {
      '~': ['encrypted.txt', 'tools', 'notes'],
      '~/tools': ['decoder.exe', 'readme.md', 'examples.txt'],
      '~/notes': ['crypto_basics.txt', 'hints.md']
    },
    fileContents: {
      'encrypted.txt': 'Pme!Gmppe!\n这段文字被简单加密了，每个字母都被移动了一位...\n解密这段文字，用解密后的内容作为密码来解锁下一关。',
      'readme.md': '解密工具使用说明：\n使用 decode <text> 命令来尝试解密文本',
      'examples.txt': '加密示例：\nHello -> Ifmmp\nWorld -> Xpsme\n\n发现规律了吗？',
      'crypto_basics.txt': '凯撒密码是最基本的加密方式之一，\n它将每个字母移动固定的位数来实现加密。\n比如：将每个字母向后移动1位。',
      'hints.md': '解密技巧：\n1. 观察字母的变化规律\n2. 尝试移动字母位置\n3. 注意标点符号的变化',
      'decoder.exe': '[系统提示] 这是一个可执行文件，使用 run decoder 来运行它',
      'secret.txt': '需要密码才能访问此文件。\n提示：解密 encrypted.txt 中的文本'
    },
    hints: [
      '观察加密文本的规律',
      '尝试使用不同的解密方法',
      '密码就在加密文本中'
    ]
  },

  3: {
    id: 3,
    title: '权限密',
    description: '这一关将学习何处理文件权限，并找到隐藏的密钥。系统管理员在不同目录中留下了线索。',
    objectives: [
      '探索系统目录结构',
      '收集分散的线索',
      '找到完整密钥',
      '访问受保护的文件'
    ],
    requiredTasks: ['find_key', 'access_protected'],
    fileSystem: {
      '~': ['readme.txt', 'system', 'personal'],
      '~/system': ['permissions.md', 'access_log.txt', 'protected_data.enc'],
      '~/personal': ['diary.txt', 'notes.md', '.private']
    },
    fileContents: {
      'readme.txt': '系统安全级别已提升。\n所有重要文件都需要proper_key才能访问。\n提示：\n1. 检查系统日志获取密钥格式\n2. 查看个人笔记了解密钥内容\n3. 注意隐藏文件',
      
      // system 目录文件
      'permissions.md': '文件权限说明：\n- r: 读取权限\n- w: 写入权限\n- x: 执行权限\n\n重要提示：\n1. 密钥的第一部分是一个常见的黑客术语\n2. 使用 ls -a 命令可以查看隐藏文件',
      'access_log.txt': '访问记录：\n[警告] 未授权访问尝试\n[提示] 密钥格式：XXXX-XXXX\n[提示] 第二部分是一个4位数字，看起来像日期格式\n[记录] 系统安装日期：04/01',
      'protected_data.enc': '此件已密。\n要完整钥才能访问。\n提示：密钥的两个部分分别代表：\n1. 一个黑客行为（在日记中提到）\n2. 系统安装日期（在日志中记录）',
      
      // personal 目录文件
      'diary.txt': '今天学习了权限系统...\n管理员说密钥的第一部分是"HACK"\n这个词真形象，就是黑客的行为。\n第二部分好像是某个日期...',
      'notes.md': '备忘：\n1. 系统目录下的日志提到了密钥格式\n2. 第一部分是 HACK\n3. 第二部分在访问日志中提到了',
      '.private': '这是一个隐藏文件。\n重要提示：\n- 第一部分已经在日记中写明：HACK\n- 第二部分是系统安装日期：0401\n- 格式：XXXX-XXXX'
    },
    hints: [
      '第一步：浏览所有目录收集线索',
      '系统目录(system)中的文件说明了密钥格式',
      '个人目录(personal)中的文件暗示了密钥的内容',
      '日记中明确提到第一部分是"HACK"',
      '访问日志中记录了系统安装日期0401',
      '使用 ls -a 可以看到隐藏文件',
      '按 XXXX-XXXX 格式组合密钥（HACK-0401）'
    ]
  },

  4: {
    id: 4,
    title: '数据恢复',
    description: '这一关你需要恢复被损坏的重要数据。系统显示有一个据库文被，但运的存在备。',
    objectives: [
      '损坏的数据文件',
      '找到并使用正确的备份文件',
      '使用修复工具恢复数据',
      '获取修复后的密码'
    ],
    requiredTasks: ['analyze_corrupt', 'find_backup', 'repair_data'],
    fileSystem: {
      '~': ['corrupted_data.db', 'backup', 'tools', 'logs'],
      '~/backup': ['backup_0401.bak', 'backup_0402.bak', 'readme.txt'],
      '~/tools': ['repair.exe', 'scanner.exe', 'manual.pdf'],
      '~/logs': ['error_log.txt', 'system_log.txt', 'backup_log.txt']
    },
    fileContents: {
      'corrupted_data.db': '[数据损坏]\n原始数据: D@t@B@se_2024\n当前状态: D#t#B#se_***4\n[需要修复工具]',
      'readme.txt': '备份说明：\n1. 每日自动备份\n2. 文件格式：backup_MMDD.bak\n3. 使用 repair.exe 工具修复时需要指定正确的备份文件',
      'manual.pdf': '修复工具使用说明：\n1. 使用 scan <文件名> 分析损坏文件\n2. 使用 repair <源文件> <备份文件> 进行修复\n注意：必须使用正确的备份文件，否则可能导致数据进一步损坏',
      'error_log.txt': '错误记录：\n[2024-04-01 23:59:59] 数据库文件意外损坏\n[2024-04-02 00:00:01] 自动备份完成',
      'system_log.txt': '系统日志：\n最后一次正常访问时间：2024-04-01\n后次成功备份backup_0401.bak',
      'backup_log.txt': '备份记录：\n- backup_0401.bak (完整备份)\n- backup_0402.bak (能不完整)',
      'backup_0401.bak': '[备份数据 - 2024-04-01]\nD@t@B@se_2024',
      'backup_0402.bak': '[备份数据 - 2024-04-02]\nD#t#B#se_2024\n[备份可能不完整]',
      'repair.exe': '[系统提示] 这是一个修复工具。使用方法：repair <源文件> <备份文件>',
      'scanner.exe': '[系统提示] 这是一个文件分析工具。使用方法：scan <文件名>'
    },
    hints: [
      '查看日志文件可以了解数据库文件的损坏时间',
      '比较不同时间的备份文件',
      '使用 scan 命令分析损坏的文件',
      '使用正确的备份文件进行修复'
    ]
  },

  5: {
    id: 5,
    title: '网络连接',
    description: '这一关你需要建立网络连接并从远程服务器获取重要数据。系统管理员留下了一些网络配置文件。',
    objectives: [
      '配置网络连接',
      '连接远程服务器',
      '获取服务器数据',
      '破解数据加密'
    ],
    requiredTasks: ['config_network', 'connect_server', 'get_data'],
    fileSystem: {
      '~': ['readme.txt', 'network', 'remote', 'config'],
      '~/network': ['ifconfig.conf', 'connection.log', 'ping.exe'],
      '~/remote': ['server_list.txt', 'connect.exe', 'download.exe', 'access.log'],
      '~/config': ['network.conf', '.credentials', 'settings.json']
    },
    fileContents: {
      'readme.txt': '网络连接指南：\n1. 检查网络配置文件\n2. 使用正确的凭据连接服务器\n3. 从主服务器下载加密数据\n\n提示：\n- 查看服务器列表获取详细信息\n- 检查访问日志了解历史记录',
      
      // network 目录文件
      'ifconfig.conf': '网络配置：\nIP: 192.168.1.100\nMASK: 255.255.255.0\nGATEWAY: 192.168.1.1\nSERVER: 192.168.1.200',
      'connection.log': '连接日志：\n[成功] 本地网络配置加载完成\n[错误] 远程连接失败：需要认证\n[提示] 默认用户名：kansini',
      'ping.exe': '[系统提示] 这是一个网络测试工具。使用方法：ping <IP地址>',
      
      // remote 目录文件
      'server_list.txt': '可用服务器列表：\n1. 192.168.1.200 (主服务器)\n  - 状态：在线\n  - 服务：文件传输\n  - 备注：重要数据备份服务器\n2. 192.168.1.201 (备用服务器)\n  - 状态：离线\n\n注意：使用 connect 命令连接服务器',
      'connect.exe': '[系统提示] 这是一个远程连接工具。\n使用方法：connect <IP> <用户名> <密码>',
      'download.exe': '[系统提示] 这是一个数据下载工具。\n使用方法：download <文件名>\n\n注意：请看访问日志了解可下载的文件',
      'access.log': '访记录：\n[INFO] 文件传输服务启动\n[INFO] 用户 kansini 登录成功\n[WARN] 尝试访问: private_data (拒绝访问)\n[INFO] 下载文件: secret_data (成功)\n[INFO] 文件大小: 1.2MB\n[INFO] 传输完成: 2024-04-01 12:00:00',
      
      // config 目录文件
      'network.conf': '系统配置：\nHOSTNAME: local-machine\nDOMAIN: internal.net\nDEFAULT_USER: kansini\nDEFAULT_PASS: Netw0rk@2024\n\n可访问文件：\n- system_backup\n- secret_data (需要权限)\n- user_profile',
      '.credentials': '加密凭据：\n用户名：kansini\n密码：Netw0rk@2024\n\n警告：请勿泄露！',
      'settings.json': '{\n  "network": {\n    "timeout": 30,\n    "retries": 3,\n    "auth_required": true\n  }\n}'
    },
    hints: [
      '先使用 ping 命令测试服务器连通性',
      '检查配置文件找到登录凭据',
      '使用 connect 命令连接服务器',
      '连接成功后使用 download 命令下载数据',
      '下载的数据就是通关密码'
    ]
  },

  6: {
    id: 6,
    title: '进程管理',
    description: '系统出现异常，你需要分析进程并找出可疑进程。管理员留了一些系监控工具',
    objectives: [
      '查看系统程',
      '分析可疑进程',
      '终止恶意进程',
      '恢复系统状态'
    ],
    requiredTasks: ['analyze_process', 'kill_malware', 'system_restore'],
    fileSystem: {
      '~': ['readme.txt', 'system', 'monitor', 'tools'],
      '~/system': ['processes.list', 'services.conf', 'startup.log'],
      '~/monitor': ['top.exe', 'ps.exe', 'status.log'],
      '~/tools': ['kill.exe', 'analyze.exe', 'restore.exe']
    },
    fileContents: {
      'readme.txt': '系统监控指南：\n1. 使用 ps 命令查看进程列表\n2. 使用 top 命令监控系统资源\n3. 使用 kill 命令终止进程\n\n警告：谨慎操作，错误的操作可能导致系统崩溃',
      
      // system 目录文件
      'processes.list': '当前进程列表：\nPID   名称          CPU   内存   状态\n1     systemd        0.1%  1.2MB  运行中\n666   malware.exe   99.9% 512MB  运行中\n888   backdoor.exe  45.2% 128MB  运行中\n',
      'services.conf': '系统服务配置：\n1. systemd - 系统核心服务\n2. network - 网络服务\n3. security - 安全服务（已停止）',
      'startup.log': '启动日志：\n[警告] 发现可疑进程自启动\n[错误] 安全服务无法启动\n[提示] 使用 analyze 命令分析可疑进程',
      
      // monitor 目录文件
      'status.log': '系统状态：\n- CPU 使用率异常\n- 内存占用过高\n- 可疑网络连接\n- 多个未知进程\n\n建议：使用 top 命令实时监控',
      'top.exe': '[系统提示] 这是一个系统监控工具。使用方法：top',
      'ps.exe': '[系统提示] 这是一个进程查看工具。使用方法：ps',
      
      // tools 目录文件
      'kill.exe': '[系统提示] 这是一个进程终止工具。使用方法：kill <PID>',
      'analyze.exe': '[系统提示] 这是一个进程分析工具。使用方法：analyze <PID>',
      'restore.exe': '[系统提示] 这是一个系统恢复工具。使用方法：restore'
    },
    hints: [
      '使用 ps 命令查看所有进程',
      '注意进程的 CPU 和内存占用',
      '分析 PID 为 666 的可疑进程',
      '使用 kill 命令终止恶意进程',
      '最后使用 restore 命令恢复系统'
    ]
  },

  7: {
    id: 7,
    title: '权限提升',
    description: '你需要获取更高的系统权限来访问受保护的文件。系统中存在一个可利用的漏洞。',
    objectives: [
      '分析系统权限',
      '寻找提权漏洞',
      '获取 root 权限',
      '访问管理员文件'
    ],
    requiredTasks: ['check_permission', 'find_exploit', 'get_root'],
    fileSystem: {
      '~': ['readme.txt', 'bin', 'etc', 'usr'],
      '~/bin': ['whoami.exe', 'sudo.exe', 'chmod.exe'],
      '~/etc': ['passwd', 'shadow', 'sudoers'],
      '~/usr': ['local', 'share', '.hidden']
    },
    fileContents: {
      'readme.txt': '系统维护说明：\n1. 使用 whoami 查看当前用户\n2. 用 sudo 执行特权命令\n3. 使用 chmod 修改文件权限\n\n重要：\n- shadow 文件中存储着加密的密码\n- 需要 root 权限才能读取 shadow 文件\n- 使用 sudo cat <文件名> 可以以 root 权限查看文件',
      
      // bin 目录文件
      'whoami.exe': '[系统提示] 显示当前用户。使用方法：whoami\n本：1.0.2 (存已知漏洞)',
      'sudo.exe': '[系统提示] 以管理员权限执行命令。使用方法：sudo <命令>',
      'chmod.exe': '[系统提示] 修改文件权限。使用方法：chmod <权限> <文件>',
      
      // etc 目录文件
      'passwd': '系统用户列表：\nroot:x:0:0\nuser:x:1000:1000\nguest:x:1001:1001',
      'shadow': '权限不足：需要 root 权限才能查看此文件\n提示：使用 sudo cat shadow 命令以 root 权限查看',
      'sudoers': '# sudoers 文件说明\n\n# 允许 wheel 组的用户使用 sudo\n%wheel ALL=(ALL) ALL\n\n# 常用命令示例：\n# sudo cat /etc/shadow - 查看密码文件\n# sudo chmod - 修改文件权限\n# sudo su - 切换到 root 用户',
      
      // usr 目录文件
      '.hidden': '漏洞利用说明：\n1. whoami 命令版本 1.0.2 存在缓冲区溢出\n2. 使用特殊参数可以触发漏洞\n3. 格式：whoami --debug=OVERFLOW\n\n获 root 权限后：\n1. 使用 sudo cat shadow 查看加密的密码文件\n2. 密码文件中包含通关密码'
    },
    hints: [
      '先使用 whoami 查看当前权限',
      '检查所有命令的版本信息',
      '寻找可能存在漏洞的程序',
      '在隐藏文件中可能有漏洞利用的线索',
      '成功提权后用 sudo cat shadow 查看加密的密码'
    ]
  },

  8: {
    id: 8,
    title: '网络嗅探',
    description: '系统检测到可疑的网络量。你需要使用网络分析工具找出数据泄露的证据。',
    objectives: [
      '启动网络监听',
      '捕获可疑数据包',
      '分析数据包内容',
      '阻止数据泄露'
    ],
    requiredTasks: ['start_capture', 'find_packet', 'analyze_packet', 'block_leak'],
    fileSystem: {
      '~': ['readme.txt', 'network', 'capture', 'tools'],
      '~/network': ['interfaces.conf', 'traffic.log', 'connections.list'],
      '~/capture': ['packets.pcap', 'filters.txt', '.secret_data'],
      '~/tools': ['tcpdump.exe', 'wireshark.exe', 'iptables.exe']
    },
    fileContents: {
      'readme.txt': '网络分析指南：\n1. 使用 tcpdump 捕获网络数据包\n2. 使用 wireshark 分析数据包内容\n3. 使用 iptables 阻止可疑连接\n\n注意：某些数据包可能包含敏感信息',
      
      // network 目录文件
      'interfaces.conf': '网卡配置：\neth0: 192.168.1.100\neth1: 10.0.0.100\n\n可疑流量主要现在 eth1',
      'traffic.log': '流量记录：\n[警告] 检测到大量对外连接\n[警告] 端口 31337 有异常流量\n[提示] 使用 tcpdump port 31337 捕获可疑数据包',
      'connections.list': '当前连接：\n192.168.1.100:80 -> 192.168.1.1:80 (HTTP)\n10.0.0.100:31337 -> 10.0.0.1:31337 (未授权协议)',
      
      // capture 目录文件
      'packets.pcap': '[二进制数据包文件]\n需要使用 wireshark 分析',
      'filters.txt': '常用过滤器：\n1. port 31337\n2. host 10.0.0.1\n3. tcp[13] = 0x02\n\n提示：使用这些过滤器可以找到可疑数据包',
      '.secret_data': '发现数据泄露：\n1. 目标IP: 10.0.0.1\n2. 目标端口: 31337\n3. 泄露内容: 系统密码\n4. 阻止方法: iptables -A OUTPUT -d 10.0.0.1 -j DROP',
      
      // tools 目录文件
      'tcpdump.exe': '[系统提示] 这是一个数据包捕获工具。使用方法：tcpdump <过滤器>',
      'wireshark.exe': '[系统提示] 这是一个数据包分析工具。使用方法：wireshark <文件名>',
      'iptables.exe': '[系统提示] 这是一个防火墙配置工具。使用方法：iptables <规则>'
    },
    hints: [
      '使用 tcpdump 监听端口 31337',
      '查看 traffic.log 了解可疑流量特征',
      '使用 wireshark 分析捕获的数据包',
      '在可疑数据包中寻找密码信息',
      '使用 iptables 阻止数据泄露'
    ]
  },

  9: {
    id: 9,
    title: '邮件侦探',
    description: '你发现了一个旧的邮件服务器。通过查用户之间的邮件往来，你可能会发现一些有趣的秘密。',
    objectives: [
      '访问邮件系',
      '查看用户邮件',
      '发现隐藏的对话',
      '找出通关密码'
    ],
    requiredTasks: ['access_mail', 'read_threads', 'find_secret'],
    fileSystem: {
      '~': ['readme.txt', 'mail', 'users'],
      '~/mail': ['inbox', 'sent', 'draft'],
      '~/mail/inbox': ['alice.mbox', 'bob.mbox', 'charlie.mbox'],
      '~/users': ['accounts.txt', '.notes', 'calendar.txt']
    },
    fileContents: {
      'readme.txt': '邮件系统使用说明：\n1. 使用 mail <用户名> 查看用户邮箱\n2. 每个用户都有自己的邮箱和草稿\n\n提示：\n- 查看 users 目录了解系统用户\n- 注意检查隐藏文件',
      
      // users 目录
      'accounts.txt': '系统用户列表：\n- alice: 系统管理员\n- bob: 安全主管\n- charlie: 新入职员工',
      '.notes': '备忘录：\n1. 提醒 Alice 修改默认密码\n2. Bob 最近在处理一个秘密项目\n3. Charlie 似乎现了什么得了的事情...\n4. 提醒所有人：草稿箱不是个安全的存储位置',
      'calendar.txt': '重要日程：\n04/01 - 系统维护\n04/15 - 安全审计\n04/30 - 项目截止日期\n\n注意：所有密码都需要加上当前年份(2024)作为后缀',
      
      // mail 目录
      'alice.mbox': `发件人: bob@local
收件人: alice@local
主题: 关于新项目
内容: Alice，我们需要更安全的方式交流。
记得用我们约定的方式加密重要信息。
所有密码都要加上年份后缀 _2024。
另外，新来的 Charlie 似乎在草稿箱里记录了什么...

---
发件人: charlie@local
收件人: alice@local
主题: 请帮助我
内容: Alice，我可能发现了一些不该看的东西。
我该怎么办？我把一些想法记下来了，
但还没发出去...`,

      'bob.mbox': `发件人: alice@local
收件人: bob@local
主题: Re: 关于新项目
内容: 明白。我已经按照棋盘布局加密了信息。
记住：白色方格走车，黑色方格走马。
终点的密码就藏在那里。

---
发件人: charlie@local
收件人: bob@local
主题: 异常现象
内容: Bob，系统日志中是不是有什么异常？
我看到一些奇怪的访问记录...`,

      'charlie.mbox': `发件人: alice@local
收件人: charlie@local
主题: Re: 请帮助我
内容: Charlie，冷静。
我注意到你最近在一些东西。
记得及时清理那些未发送的内容。
有些事情知道太多并不是好事。

---
发件人: bob@local
收件人: charlie@local
主题: Re: 异常现象
内容: 这不是你该关心的事情。
我看到你保存了一些草稿。
建议你删除那些内容。
专注于你本职工作。`,

      // draft 目录（需要用特殊方式访问）
      '.charlie_draft': `未发送邮件：
主题：记录发现
内容：我终于理解了！
他们在用国际象棋加密信息：

1. 白车路线：R -> O -> K
2. 黑马路线：N -> I -> T
3. 按顺序拼接：ROK + NIT
4. 加上年份后缀：

天啊，有人来了，我得赶快...`,

      // 隐藏的棋盘布局文件
      '.chess_notes': `棋盘布局说明：
1. 白车路线：R -> O -> K
2. 黑马路线：N -> I -> T
3. 按顺序拼接：先白车后黑马
4. 加上标准后缀：`
    },
    hints: [
      '仔细阅读每个人的邮件',
      '注意邮件中提到的加密方式',
      '查看 Charlie 的草稿箱可能有线索',
      '将棋子移动路线拼接起来',
      '别忘了还有隐藏文件'
    ]
  },

  10: {
    id: 10,
    title: '聊天记录调查',
    description: '你发现了一个可疑的聊天服务器。通过调查用户之间的对话你可能会发现一个正在进行的密谋。',
    objectives: [
      '访问聊天系统',
      '查看历史记录',
      '破解加密对话',
      '阻止密谋事件'
    ],
    requiredTasks: ['access_chat', 'find_evidence', 'decode_plan'],
    fileSystem: {
      '~': ['readme.txt', 'chat_rooms.txt', 'users.txt', 'logs'],
      '~/logs': ['access.log', 'system.log', '.deleted']
    },
    fileContents: {
      'readme.txt': '聊天系统调查指南：\n1. 使用 chat <房间> 查看公共聊天\n2. 使用 private <用户> 查看私聊记录\n3. 使用 history <日期> 查看历史记录\n\n提示：查看 chat_rooms.txt 了解可用的聊天室',
      
      'chat_rooms.txt': '可用聊天室列表：\n- room1: 主聊天室\n- room2: 休闲聊天室（已关闭）\n- room3: 技术讨论室（已关闭）\n\n注意：目前只有 room1 处于开放状态',
      
      'users.txt': '在线用户列表：\n- David (管理员)\n- Eve (版主)\n- Frank (普通用户)\n\n可以使用 private <用户名> 查看与用户的私聊记录',
      
      // 添加聊天记录内容
      'public/room1.txt': `[公共聊天室 #1]
David: 服务器安全检查完成了吗？
Eve: 是的，按照清单都检查过了。
Frank: 防火墙规则也已经更新。
David: 很好，记得用之前说的方式加密要内容。
Eve: 收到，我已经把配置文件加密好了。
Frank: 我这边的日志也都处理完了。`,

      'private/david.txt': `[私聊记录 - David]
To Eve: 2024-04-01的配置文件里有几处要改动
From Eve: 好的，我马上看看加密文件
To Frank: 记得清理那天的日志记录
From Frank: 明白，我会处理好的
To Eve: 用老方法加密，别用新的方式`,

      'private/eve.txt': `[私聊记录 - Eve]
From David: 你看到今天的行动计划了吗？
To David: 我发现一个加密文件，正在分析
To Frank: 今天的系统日志很可疑，你看到了吗？
From Frank: 是的，我会尽快清理掉`,

      'encrypted/plan.txt': `[加密文件]
原文已加密，使用凯撒密码加密：

XVDIBKJ_QMBO                 // WUCHAJI_PLAN
UJNF: 2024-05-01 23:59      // TIME: ...
MPDBUJPO: DFOUSBM_QBSL      // LOCATION: ...
UBSHFU: TFDSFU_TFSWFS       // TARGET: ...
DPEF: XVDIBKJ_2024          // CODE: WUCHAJI_2024

提示：使用 decode <文本> 尝试解密`,

      'system.log': '系统日志：\n1. 检测到可疑的文件操作\n2. 加密类型：凯撒密码\n3. 每个字母都向后移动了一位\n4. 例如：A->B, B->C, ..., Z->A\n5. 使用 decode <文本> 可以还原\n\n提示：使用 history <日期> 可以查看历史记录，日期格式：YYYY-MM-DD',
      
      '.deleted': '已删除的系统日志：\n[WARN] 发现可疑进程\n[INFO] 尝试解密 XVDIBKJ\n[DEBUG] 清理完成',

      // 添加一个新的提示文件
      '.crypto_note': '加密分析：\n1. 文本 XVDIBKJ 是 WUCHAJI 的加密形式\n2. 每个字母都向后移动了一位\n3. 最终密码格式：解密后的文本 + _2024'
    },
    hints: [
      '查看 chat_rooms.txt 了解可用的聊天室',
      '使用 chat room1 查看公共聊天',
      '注意聊天中提到的加密方式',
      '在系统日志中找到加密说明',
      '使用 decode 命令尝试解密文本'
    ]
  }
}; 