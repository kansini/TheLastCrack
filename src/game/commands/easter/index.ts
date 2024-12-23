import {matrixCommand} from "./matrix";
import {helloCommand} from "./hello";
import {ghostCommand} from "./ghost";
import {countdownCommand,} from "./countdown";
import {starwarsCommand} from "./starwars";
import {Command} from "@/types/terminal"

// 导出所有彩蛋命令
export const easterCommands: { [key: string]: Command } = {
    matrix: matrixCommand,
    hello: helloCommand,
    ghost: ghostCommand,
    countdown: countdownCommand,
    starwars: starwarsCommand
}; 