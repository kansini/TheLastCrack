import type {Command} from "@/types/terminal";
import { trojanCommand } from './trojan';

import {
    helpCommand,
    lsCommand,
    cdCommand,
    catCommand,
    clearCommand,
    unlockCommand,
    decodeCommand,
    saveCommand,
    loadCommand,
    deleteSaveCommand,
    scanCommand,
    repairCommand,
    pingCommand,
    connectCommand,
    downloadCommand,
    psCommand,
    topCommand,
    analyzeCommand,
    killCommand,
    restoreCommand,
    whoamiCommand,
    sudoCommand,
    chmodCommand,
    tcpdumpCommand,
    wiresharkCommand,
    iptablesCommand,
    mailListCommand,
    chatCommand,
    privateCommand,
    historyCommand,
    exitCommand,
    loganalyzerCommand,
    timelineCommand,
    traceCommand,
    memdumpCommand,
    stringsCommand,
    volatilityCommand,
    levelCommand,
    netstatCommand,
    hintCommand,
    remoteCommand
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
    scan: scanCommand,
    repair: repairCommand,
    ping: pingCommand,
    connect: connectCommand,
    download: downloadCommand,
    ps: psCommand,
    top: topCommand,
    analyze: analyzeCommand,
    kill: killCommand,
    restore: restoreCommand,
    whoami: whoamiCommand,
    sudo: sudoCommand,
    chmod: chmodCommand,
    tcpdump: tcpdumpCommand,
    wireshark: wiresharkCommand,
    iptables: iptablesCommand,
    mail: mailListCommand,
    chat: chatCommand,
    private: privateCommand,
    history: historyCommand,
    exit: exitCommand,
    loganalyzer: loganalyzerCommand,
    timeline: timelineCommand,
    trace: traceCommand,
    memdump: memdumpCommand,
    strings: stringsCommand,
    volatility: volatilityCommand,
    level: levelCommand,
    netstat: netstatCommand,
    hint: hintCommand,
    remote: remoteCommand,
    trojan: trojanCommand
};

export const getCommands = () => {
    return commands;
}; 