import {LevelLocales} from "./index";

export const level19Locales: LevelLocales = {
    zh: {
        title: "神秘手稿",
        description: "你发现了一份神秘的文件和一张古老的手稿，这些文件似乎隐藏着重要的信息。\n\n经过初步分析，这份手稿与著名的伏尼契手稿有关。你需要仔细分析这些文件，找出其中隐藏的密码。",
        objectives: [
            "分析神秘文件中的隐藏信息",
            "解密伏尼契手稿的内容",
            "比对两份文件找出关联",
            "找出隐藏的密码"
        ],
        fileContents: {
            file: "[图片] 一份神秘的文件，上面有奇怪的符号和数字",
            manuscript: "[图片] 伏尼契手稿的一页，充满了神秘的文字和图案",
            "note.txt": "这两份文件似乎都使用了某种加密系统...\n可以尝试用 analyze 和 decode 命令分析它们\n然后用 compare 命令比对两者的关联",
            ".secret-file.jpg":"asdas1123124scs阿舒服点" // 生成一串中文乱码
        },
        hints: [
            "仔细查看每个监控点的时间记录",
            "对比交通工具的使用时间",
            "注意目标在各个地点停留的时长",
            "分析可能的换乘路线",
            "找出最终的落脚点"
        ]
    },
    en: {
        title: "Mysterious Manuscript",
        description: "You found a mysterious file and an ancient manuscript. These documents seem to hide important information.\n\nPreliminary analysis shows this manuscript is related to the famous Voynich manuscript. You need to analyze these files carefully to find the hidden password.",
        objectives: [
            "Analyze hidden information in the mysterious file",
            "Decrypt the content of Voynich manuscript",
            "Compare both files to find connections",
            "Find the hidden password"
        ],
        fileContents: {
            file: "[Image] A mysterious file with strange symbols and numbers",
            manuscript: "[Image] A page from the Voynich manuscript, full of mysterious text and patterns",
            note: "Both files seem to use some kind of encryption system...\nTry using analyze and decode commands to analyze them\nThen use compare command to find connections between them"
        },
        hints: [
            "仔细查看每个监控点的时间记录",
            "对比交通工具的使用时间",
            "注意目标在各个地点停留的时长",
            "分析可能的换乘路线",
            "找出最终的落脚点"
        ]
    }
};