import { UAParser } from 'ua-parser-js';
function escapeUnix(arg) {
    if (!/^[A-Za-z0-9_\/-]+$/.test(arg)) {
        return ('\'' + arg.replace(/'/g, '\'"\'"\'') + '\'').replace(/''/g, '');
    }
    return arg;
}
function escapeWin(arg) {
    if (!/^[A-Za-z0-9_\/-]+$/.test(arg)) {
        return '"' + arg.replace(/"/g, '""') + '"';
    }
    return arg;
}
const isWin = new UAParser().getOS().name === 'Windows';
export function shellEscape(stringOrArray) {
    const ret = [];
    const escapePath = isWin ? escapeWin : escapeUnix;
    if (typeof stringOrArray == 'string') {
        return escapePath(stringOrArray);
    }
    else {
        stringOrArray.forEach(function (member) {
            ret.push(escapePath(member));
        });
        return ret.join(' ');
    }
}
//# sourceMappingURL=shellEscape.js.map