import { BehaviorSubject } from 'rxjs';
import { get, writable } from 'svelte/store';
export function autosave(key, initial) {
    key = `warpgate:${key}`;
    const v = writable(JSON.parse(localStorage.getItem(key) ?? JSON.stringify(initial)));
    const v$ = new BehaviorSubject(get(v));
    v.subscribe(value => {
        localStorage.setItem(key, JSON.stringify(value));
        v$.next(value);
    });
    return [v, v$];
}
//# sourceMappingURL=autosave.js.map