import { formatDistanceToNow } from 'date-fns';
export function timeAgo(t) {
    return formatDistanceToNow(t, { addSuffix: true });
}
//# sourceMappingURL=time.js.map