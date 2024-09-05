import { shellEscape } from 'gateway/lib/shellEscape';
export function makeSSHUsername(opt) {
    if (opt.ticketSecret) {
        return `ticket-${opt.ticketSecret}`;
    }
    return `${opt.username ?? 'username'}:${opt.targetName ?? 'target'}`;
}
export function makeExampleSSHCommand(opt) {
    return shellEscape(['ssh', `${makeSSHUsername(opt)}@${opt.serverInfo?.externalHost ?? 'warpgate-host'}`, '-p', (opt.serverInfo?.ports.ssh ?? 'warpgate-ssh-port').toString()]);
}
export function makeMySQLUsername(opt) {
    if (opt.ticketSecret) {
        return `ticket-${opt.ticketSecret}`;
    }
    return `${opt.username ?? 'username'}#${opt.targetName ?? 'target'}`;
}
export function makeExampleMySQLCommand(opt) {
    let cmd = shellEscape(['mysql', '-u', makeMySQLUsername(opt), '--host', opt.serverInfo?.externalHost ?? 'warpgate-host', '--port', (opt.serverInfo?.ports.mysql ?? 'warpgate-mysql-port').toString(), '--ssl']);
    if (!opt.ticketSecret) {
        cmd += ' -p';
    }
    return cmd;
}
export function makeExampleMySQLURI(opt) {
    const pwSuffix = opt.ticketSecret ? '' : ':<password>';
    return `mysql://${makeMySQLUsername(opt)}${pwSuffix}@${opt.serverInfo?.externalHost ?? 'warpgate-host'}:${opt.serverInfo?.ports.mysql ?? 'warpgate-mysql-port'}?sslMode=required`;
}
export function makeTargetURL(opt) {
    const host = opt.targetExternalHost ? `${opt.targetExternalHost}:${opt.serverInfo?.ports.http ?? 443}` : location.host;
    if (opt.ticketSecret) {
        return `${location.protocol}//${host}/?warpgate-ticket=${opt.ticketSecret}`;
    }
    return `${location.protocol}//${host}/?warpgate-target=${opt.targetName}`;
}
//# sourceMappingURL=protocols.js.map