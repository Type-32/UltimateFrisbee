// server/middleware/serveMedia.ts
import { serveStatic } from 'h3'
import {readFile, stat} from "node:fs/promises";
import {join} from "pathe";

const publicDir = "media";

export default defineEventHandler((event) => {
    return serveStatic(event, {
        getContents: (id) => readFile(join(publicDir, id)),
        getMeta: async (id) => {
            const stats = await stat(join(publicDir, id)).catch(() => {});

            if (!stats || !stats.isFile()) {
                return;
            }

            return {
                size: stats.size,
                mtime: stats.mtimeMs,
            };
        },
    });
})