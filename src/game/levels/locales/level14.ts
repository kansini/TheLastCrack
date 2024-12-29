import { LevelLocales } from "./index";

export const level14Locales: LevelLocales = {
  zh: {
    title: "人员追踪",
    description: "我们发现了一些可疑的人员资料，需要通过分析这些资料找到关键人物，并从他们的会议记录和邮件中获取重要信息。",
    objectives: [
      "分析人员资料",
      "找到关键人物",
      "查看会议记录",
      "检查邮件往来",
      "获取通关密码"
    ],
    hints: [
      "仔细查看员工资料中的异常记录",
      "注意观察刘强的可疑行为",
      "检查会议记录中的重要信息",
      "查看邮件中提到的项目代号",
      "密码格式：项目代号_姓名缩写_工号（全部大写）",
      "项目代号是Phoenix，刘强的缩写是LQ，工号是1005"
    ],
    fileContents: {
      "readme.txt": "任务简报：\n1. 分析员工资料找到可疑人员\n2. 查看相关会议记录\n3. 检查邮件通信\n4. 将收集到的信息组合成密码\n\n提示：注意观察员工的访问记录和异常行为",
      "employees.csv": "工号,姓名,部门,职位,入职时间\n1001,张明,技术部,高级工程师,2020-01-15\n1002,李华,人事部,主管,2019-06-20\n1003,王芳,财务部,经理,2018-03-10\n1004,陈静,技术部,系统架构师,2017-08-05\n1005,刘强,安全部,安全专家,2021-02-28\n注意：最近发现刘强经常在非工作时间访问系统",
      'virus.exe': '[警告] 这是一个危险的病毒样本\n只能在安全的沙箱环境中运行\n使用 sandbox 命令执行分析',
      'virus.log': '病毒行为日志：\n- 修改系统文件\n- 建立网络连接\n- 自我复制\n- 隐藏进程',
      'network.pcap': '网络通信记录：\n- 连接C&C服务器\n- 下载额外模块\n- 传播感染',
      'sandbox.txt': '沙箱分析环境说明：\n1. 隔离的虚拟环境\n2. 行为监控\n3. 网络模拟\n4. 内存分析'
    }
  },
  en: {
    title: "Personnel Tracking",
    description: "We found some suspicious personnel files and need to analyze them to find key persons and obtain important information from their meeting records and emails.",
    objectives: [
      "Analyze personnel files",
      "Find key persons",
      "Check meeting records",
      "Review email communications",
      "Get the password"
    ],
    hints: [
      "Carefully check abnormal records in employee files",
      "Pay attention to Liu Qiang's suspicious behavior",
      "Check important information in meeting records",
      "Look for project codename in emails",
      "Password format: PROJECT_NAME_INITIALS_ID (all uppercase)",
      "Project is Phoenix, Liu Qiang's initials are LQ, ID is 1005"
    ],
    fileContents: {
      "readme.txt": "Mission Brief:\n1. Analyze employee data to find suspicious personnel\n2. Check relevant meeting records\n3. Review email communications\n4. Combine collected information into password\n\nHint: Pay attention to employee access records and abnormal behavior",
      "employees.csv": "ID,Name,Department,Position,Entry Date\n1001,Zhang Ming,Tech,Senior Engineer,2020-01-15\n1002,Li Hua,HR,Supervisor,2019-06-20\n1003,Wang Fang,Finance,Manager,2018-03-10\n1004,Chen Jing,Tech,System Architect,2017-08-05\n1005,Liu Qiang,Security,Security Expert,2021-02-28\nNote: Recently found Liu Qiang accessing system during off-hours",
      'virus.exe': '[WARNING] This is a dangerous virus sample\nOnly run in secure sandbox environment\nUse sandbox command for analysis',
      'virus.log': 'Virus Behavior Log:\n- Modify system files\n- Establish network connections\n- Self replication\n- Hide process',
      'network.pcap': 'Network Communication Records:\n- Connect to C&C server\n- Download additional modules\n- Spread infection',
      'sandbox.txt': 'Sandbox Analysis Environment:\n1. Isolated virtual environment\n2. Behavior monitoring\n3. Network simulation\n4. Memory analysis'
    }
  }
}; 