import type {Command} from "@/types/terminal";
import {filesystemCommands} from "./filesystem";
import {saveCommands} from "./save"
import {basicCommands} from "./basic";
import {easterCommands} from "./easter";
import {level4Commands} from "./level/level4";
import {level5Commands} from "./level/level5";
import {level6Commands} from "./level/level6";
import {level7Commands} from "./level/level7";
import {level8Commands} from "./level/level8";
import {level9Commands} from "./level/level9";
import {level10Commands} from "./level/level10";
import {level11Commands} from "./level/level11";
import {level12Commands} from "./level/level12";
import {level13Commands} from "./level/level13";
import {level15Commands} from "./level/level15";
import {level16Commands} from "./level/level16";
import {level17Commands} from "./level/level17";
import {level18Commands} from "./level/level18";
import {level19Commands} from "./level/level19";

export const commands: { [key: string]: Command } = {
    ...saveCommands,  // 存档命令
    ...basicCommands, // 基础命令
    ...filesystemCommands, // 文件系统命令
    ...easterCommands, // 彩蛋命令
    ...level4Commands,
    ...level5Commands,
    ...level6Commands,
    ...level7Commands,
    ...level8Commands,
    ...level9Commands,
    ...level10Commands,
    ...level11Commands,
    ...level12Commands,
    ...level13Commands,
    ...level15Commands,
    ...level16Commands,
    ...level17Commands,
    ...level18Commands,
    ...level19Commands,
};
