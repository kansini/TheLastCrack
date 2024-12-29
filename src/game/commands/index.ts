import type {Command} from "@/types/terminal";
import {trojanCommand} from "./trojan";
import {easterCommands} from "./easter";
import {level4Commands} from "./level/level4";
import {level6Commands} from "./level/level6";
import {level7Commands} from "./level/level7";
import {level8Commands} from "./level/level8";
import {level9Commands} from "./level/level9";
import {level10Commands} from "./level/level10";
import {level11Commands} from "./level/level11";
import {level12Commands} from "./level/level12";
import {level16Commands} from "./level/level16";
import {level17Commands} from "./level/level17";
import {
    saveCommand,
    loadCommand,
    deleteSaveCommand
} from "./save"

import {
    helpCommand,
    lsCommand,
    cdCommand,
    catCommand,
    clearCommand,
    unlockCommand,
    decodeCommand,
    pingCommand,
    connectCommand,
    downloadCommand,
    exitCommand,
    levelCommand,
    hintCommand,
    remoteCommand,
    ssh_exploitCommand,
    gotoCommand,
    trackCommand,
    cctvCommand
} from "./basic";

export const commands: { [key: string]: Command } = {
    help: helpCommand,
    ls: lsCommand,
    cd: cdCommand,
    cat: catCommand,
    clear: clearCommand,
    unlock: unlockCommand,
    decode: decodeCommand,
    save: saveCommand,
    load: loadCommand,
    deletesave: deleteSaveCommand,
    ping: pingCommand,
    connect: connectCommand,
    download: downloadCommand,
    exit: exitCommand,
    level: levelCommand,
    hint: hintCommand,
    remote: remoteCommand,
    ssh_exploit: ssh_exploitCommand,
    trojan: trojanCommand,
    goto: gotoCommand,
    track: trackCommand,
    cctv: cctvCommand,
    ...easterCommands,
    ...level4Commands,
    ...level6Commands,
    ...level7Commands,
    ...level8Commands,
    ...level9Commands,
    ...level10Commands,
    ...level11Commands,
    ...level12Commands,
    ...level16Commands,
    ...level17Commands
};

export const getCommands = () => {
    return commands;
};