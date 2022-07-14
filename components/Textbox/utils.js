export function getLastImportantSymbol(text, startingPoint) {
  return Math.max(
    text.lastIndexOf("/", text.lastIndexOf("/", startingPoint + 1) - 1),
    text.lastIndexOf(">", startingPoint)
  );
}
