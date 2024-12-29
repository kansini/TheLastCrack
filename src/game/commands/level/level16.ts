import {createApp, h} from "vue";
import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
import PersonnelFile from "@/components/PersonnelFile.vue";


const personnelCommand: Command = {
    name: "personnel",
    description: "查看可疑人员档案列表",
    execute: () => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 16) {
            return "personnel: 命令不可用";
        }

        gameStore.completeTask("find_command");
        return `发现以下可疑人员档案：

档案编号: P003
姓名: Robert Johnson
状态: 未知
备注: 深夜活动频繁

档案编号: P007
姓名: Alex Zhang
状态: 调查中
备注: 可疑组织联系人

档案编号: P009
姓名: Sarah Chen
状态: 监控中
备注: 行为异常

档案编号: P012
姓名: Michael Lee
状态: 待确认
备注: 身份存疑

档案编号: P015
姓名: David Wang
状态: 监控中
备注: 频繁出入机房
`;
    }
}; // level 16

interface PersonnelData {
    id: string;
    name: string;
    age: number;
    status: string;
    lastSeen: string;
    description: string;
    notes: string;
    image?: string;
}

interface PersonnelDataMap {
    [key: string]: PersonnelData;
}

const personnelData: PersonnelDataMap = {
    "P001": {
        id: "P001",
        name: "Paul Davis",
        age: 45,
        status: "未知",
        lastSeen: "2023-12-14 23:45",
        description: "身高180cm，黑发，经常穿黑色夹克。深夜经常在数据中心附近出现，行为异常。",
        notes: "与多个可疑人员有接触，特别是P012。近期活动频繁，需要重点关注。"
    },
    "P003": {
        id: "P003",
        name: "Robert Johnson",
        age: 42,
        status: "未知",
        lastSeen: "2023-12-14 23:45",
        description: "身高180cm，黑发，经常穿黑色夹克。深夜经常在数据中心附近出现，行为异常。",
        notes: "与多个可疑人员有接触，特别是P012。近期活动频繁，需要重点关注。"
    },
    "P007": {
        id: "P007",
        name: "Alex Zhang",
        age: 25,
        status: "调查中",
        lastSeen: "2023-12-11 15:20",
        description: "身高175cm，戴眼镜，常穿休闲装。表面看起来人畜无害，但与多个黑客组织有联系。",
        notes: "发现多次与境外可疑IP地址通信。声称是普通程序员，但技术水平远超其履历所述。"
    },
    "P009": {
        id: "P009",
        name: "Sarah Chen",
        age: 42,
        status: "监控中",
        lastSeen: "2023-12-12 09:15",
        description: "身高165cm，长发，经常穿职业装。最近行为模式发生明显改变。",
        notes: "原系统管理员，但近期访问了多个非授权区域。与P015有频繁接触，疑似在策划某些行动。"
    },
    "P012": {
        id: "P012",
        name: "Michael Lee",
        age: 35,
        status: "待确认",
        lastSeen: "2023-12-13 16:30",
        description: "身高178cm，棕发，总是带着笔记本电脑。身份背景存在多处疑点。",
        notes: "声称的工作经历无法验证，提供的证件可能是伪造的。与P003有密切往来，需要进一步调查。"
    },
    "P015": {
        id: "P015",
        name: "David Lewis",
        age: 40,
        status: "监控中",
        lastSeen: "2023-12-10 14:20",
        description: "身高172cm，短发，经常穿polo衫。在机房逗留时间异常。",
        notes: "新入职员工，但对系统架构了解程度超出预期。与P009形成小组，经常在非工作时间进出机房。",
    }
};

const viewCommand: Command = {
    name: "view",
    description: "查看可疑人员详细档案",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 16) {
            return "view: 命令不可用";
        }

        if (!args.length) {
            return "Usage: view <档案编号>";
        }

        const id = args[0].toUpperCase();
        const personnel = personnelData[id];

        if (!personnel) {
            return "无效的档案编号";
        }

        gameStore.completeTask("check_files");

        // 创建一个容器来挂载弹窗
        const container = document.createElement("div");
        document.body.appendChild(container);

        // 创建并挂载弹窗
        const app = createApp({
            render() {
                return h(PersonnelFile, {
                    data: personnel,
                    onClose: () => {
                        app.unmount();
                        document.body.removeChild(container);
                    }
                });
            }
        });

        app.mount(container);
        return "正在查看档案...";
    }
}; // level16


const verifyCommand: Command = {
    name: "verify",
    description: "验证密码",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 16) {
            return "verify: 命令不可用";
        }

        if (args.length === 0) {
            return "请输入密码";
        }

        const password = args[0];
        // 正确密码：P003_42_未知
        if (password === "P003_42_RJ") {
            gameStore.completeTask("verify_password");
            return "密码正确！你已成功找出最可疑的目标。";
        }

        return "密码错误，请仔细检查密码格式和内容。";
    }
}; // level16

const suspectCommand: Command = {
    name: "suspect",
    description: "标记可疑人员",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 16) {
            return "suspect: 命令不可用";
        }

        if (args.length === 0) {
            return "Usage: suspect <档案编号>";
        }

        const fileId = args[0].toUpperCase();
        if (!["P001", "P012", "P003", "P007", "P015", "P009"].includes(fileId)) {
            return "无效的档案编号";
        }

        if (fileId === "P003") {
            return `已标记 ${fileId} 为主要嫌疑人。
分析结果：
- 年龄：42岁
- 身份：情报贩子
- 状态：未知
- 危险等级：高`; // [提示] 使用 verify 命令验证密码（格式：档案编号_年龄_状态）
        }

        return `${fileId} 的可疑程度较低，建议继续调查其他人员。`;
    }
}; // level16

export {
    personnelCommand,
    viewCommand,
    verifyCommand,
    suspectCommand
}
export const level16Commands: { [key: string]: Command } = {
    personnel: personnelCommand,
    view: viewCommand,
    verify: verifyCommand,
    suspect: suspectCommand,
};