import { level8Locales } from '../locales/level8';
import { createLevelConfig } from '../utils/levelHelper';

export const level8 = createLevelConfig(8, level8Locales, {
  requiredTasks: ['start_capture', 'find_packet', 'analyze_packet', 'block_leak'],
  fileSystem: {
    '~': ['readme.txt', 'network', 'capture', 'tools'],
    '~/network': ['interfaces.conf', 'traffic.log', 'connections.list'],
    '~/capture': ['filters.txt'],
    '~/tools': ['tcpdump.exe', 'wireshark.exe', 'iptables.exe']
  }
}); 