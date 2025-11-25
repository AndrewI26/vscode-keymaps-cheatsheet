import * as jsonc from 'jsonc-parser';

export type CommentEntry = { type: 'comment'; value: string; offset: number };
export type ObjectEntry = { type: 'object'; value: any; offset: number };
export type JsoncArrayEntry = CommentEntry | ObjectEntry;

/**
 * Parse the JSONC from a users keybindings.json file. 
 * Maintains ordering of comments and objects.
 *
 * Throws if the top-level value is not an array.
 */
export function parseKeybindings(text: string): (Omit<JsoncArrayEntry, "offset">)[] {
    const entries: JsoncArrayEntry[] = [];

    let arrayDepth = 0;
    let objectDepth = 0;
    let currentObjectStart: number | null = null;

    jsonc.visit(text, {
        onArrayBegin() {
            arrayDepth++;
        },
        onArrayEnd() {
            arrayDepth--;
        },
        onObjectBegin(offset) {
            objectDepth++;
            if (arrayDepth === 1 && objectDepth === 1) {
                currentObjectStart = offset;
            }
        },
        onObjectEnd(offset, length) {
            if (arrayDepth === 1 && objectDepth === 1 && currentObjectStart !== null) {
                const objStart = currentObjectStart;
                const objEnd = offset + length;
                const raw = text.slice(objStart, objEnd);
                const parsed = jsonc.parse(raw);
                entries.push({ type: 'object', value: parsed, offset: objStart });
                currentObjectStart = null;
            }
            objectDepth--;
        },
        onComment(offset, length) {
            if (arrayDepth === 1 && objectDepth === 0) {
                const raw = text.slice(offset, offset + length);
                entries.push({ type: 'comment', value: raw, offset });
            }
        }
    });

    const parsedTop = jsonc.parse(text);
    if (!Array.isArray(parsedTop)) {
        throw new Error('Top-level JSONC value must be an array.');
    }

    entries.sort((a, b) => a.offset - b.offset);
    return entries.map(({ offset, ...rest }) => rest) as JsoncArrayEntry[];
}