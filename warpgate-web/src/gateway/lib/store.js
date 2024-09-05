import { writable } from 'svelte/store';
import { api } from './api';
export const serverInfo = writable(undefined);
export async function reloadServerInfo() {
    serverInfo.set(await api.getInfo());
}
//# sourceMappingURL=store.js.map