import '@fontsource/work-sans';
import { get, writable } from 'svelte/store';
const savedTheme = (localStorage.getItem('theme') ?? 'auto');
export const currentTheme = writable(savedTheme);
export const currentThemeFile = writable('dark');
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);
function loadThemeFile(name) {
    currentThemeFile.set(name);
    if (name === 'dark') {
        return import('./theme.dark.scss?inline');
    }
    return import('./theme.light.scss?inline');
}
async function loadTheme(name) {
    const theme = (await loadThemeFile(name)).default;
    styleElement.innerHTML = theme;
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (get(currentTheme) === 'auto') {
        loadTheme(event.matches ? 'dark' : 'light');
    }
});
export function setCurrentTheme(theme) {
    localStorage.setItem('theme', theme);
    currentTheme.set(theme);
    if (theme === 'auto') {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
            loadTheme('dark');
        }
        else {
            loadTheme('light');
        }
    }
    else {
        loadTheme(theme);
    }
}
setCurrentTheme(savedTheme);
//# sourceMappingURL=index.js.map