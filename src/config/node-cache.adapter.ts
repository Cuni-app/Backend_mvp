import NodeCache from "node-cache";

export const myCache = new NodeCache({
    stdTTL: 120,
});
