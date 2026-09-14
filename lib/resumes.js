export function extractTitle(text) {
  const match = (text || '').match(/^#header\s+(.+)$/m);
  if (match) {
    return match[1].trim().slice(0, 80);
  }
  return 'Untitled resume';
}

export function formatStamp(ts) {
  if (ts == null) {
    return 'Just now';
  }
  const date = typeof ts === 'number' ? new Date(ts) : new Date(ts);
  if (Number.isNaN(date.getTime())) {
    return 'Just now';
  }
  return date.toLocaleString();
}

export function formatRelative(ts) {
  if (ts == null) {
    return 'Just now';
  }
  const date = typeof ts === 'number' ? new Date(ts) : new Date(ts);
  const ms = Date.now() - date.getTime();
  if (Number.isNaN(ms)) {
    return 'Just now';
  }
  const mins = Math.floor(ms / 60000);
  if (mins < 1) {
    return 'Just now';
  }
  if (mins < 60) {
    return `${mins}m ago`;
  }
  const hours = Math.floor(mins / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}d ago`;
  }
  return date.toLocaleDateString();
}

export function versionPreview(text) {
  const title = extractTitle(text);
  const lines = String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) =>
        line &&
        !line.startsWith('@') &&
        !/^#(header|section|title|subtitle|description|date|pagebreak)\b/i.test(
          line
        )
    );
  const snippet = lines.slice(0, 2).join(' · ').slice(0, 90);
  return { title, snippet };
}
