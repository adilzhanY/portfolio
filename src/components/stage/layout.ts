/**
 * Which stages take a full row. Wide stages always do; the others pair up two
 * to a row, and one left without a partner (before a wide stage, or at the
 * end) takes the row alone rather than leave half of it empty.
 */
export function stageSpans(items: { wide: boolean }[]): ("full" | "half")[] {
  const spans: ("full" | "half")[] = [];
  let i = 0;
  while (i < items.length) {
    if (items[i].wide) {
      spans.push("full");
      i += 1;
    } else if (i + 1 < items.length && !items[i + 1].wide) {
      spans.push("half", "half");
      i += 2;
    } else {
      spans.push("full");
      i += 1;
    }
  }
  return spans;
}
