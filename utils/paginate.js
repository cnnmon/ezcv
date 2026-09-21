const EPS = 0.5;
const BLOCKS = 'li, p, h1, h2, h3, h4, h5, h6, div';
// blocks taller than this share of a page may break between their lines
const SPLITTABLE = 0.25;

// Measures every block of text in `root` as a vertical interval (relative to
// `contentTop`), i.e. the places a page break must not land inside. Long
// blocks (big paragraphs) are broken down into their lines so they can flow
// across pages instead of leaving a gap.
export function collectIntervals(root, contentTop, area) {
  const groups = new Map();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.nodeValue.trim()) {
      const block = node.parentElement && node.parentElement.closest(BLOCKS);
      if (block && block !== root && root.contains(block)) {
        if (!groups.has(block)) {
          groups.set(block, []);
        }
        groups.get(block).push(node);
      }
    }
  }

  const intervals = [];
  const range = document.createRange();

  groups.forEach((nodes, block) => {
    const rect = block.getBoundingClientRect();
    const top = rect.top - contentTop;
    const bottom = rect.bottom - contentTop;

    if (bottom - top <= area * SPLITTABLE) {
      intervals.push({
        top,
        bottom,
        left: rect.left,
        right: rect.right,
        // titles/headings stay with what follows; bullets can stand alone
        glue: block.tagName !== 'LI',
      });
      return;
    }

    nodes.forEach((node) => {
      range.selectNodeContents(node);
      Array.from(range.getClientRects()).forEach((line) => {
        if (line.height > 0) {
          intervals.push({
            top: line.top - contentTop,
            bottom: line.bottom - contentTop,
            left: line.left,
            right: line.right,
          });
        }
      });
    });
  });

  // keep titles/headings attached to what follows them in the same column
  intervals.forEach((interval) => {
    if (!interval.glue) {
      return;
    }
    let next = null;
    intervals.forEach((other) => {
      if (
        other !== interval &&
        other.top >= interval.bottom - EPS &&
        other.left < interval.right &&
        other.right > interval.left &&
        (!next || other.top < next.top)
      ) {
        next = other;
      }
    });
    if (next) {
      // eslint-disable-next-line no-param-reassign
      interval.bottom = Math.max(interval.bottom, next.bottom);
    }
  });

  return intervals;
}

// Splits content of `contentHeight` into pages of at most `area` px so that
// every break falls between blocks. Returns [{ start, end }] offsets into the
// content. A block taller than a page is cut at the page limit.
export function paginate(intervals, contentHeight, area) {
  const pages = [];
  let start = 0;

  while (pages.length < 500) {
    const limit = start + area;

    if (contentHeight <= limit + EPS) {
      pages.push({ start, end: contentHeight });
      break;
    }

    let end = limit;
    let hit = intervals.filter(
      (i) => i.top < end - EPS && i.bottom > end + EPS
    );
    while (hit.length) {
      end = Math.min(...hit.map((i) => i.top));
      const y = end;
      hit = intervals.filter((i) => i.top < y - EPS && i.bottom > y + EPS);
    }

    let hardCut = false;
    if (end <= start + EPS) {
      end = limit;
      hardCut = true;
    }
    pages.push({ start, end });

    // next page starts at the first block after the break, skipping the gap
    const tops = intervals.filter((i) => i.top >= end - EPS).map((i) => i.top);
    if (hardCut) {
      start = end;
    } else if (tops.length) {
      start = Math.min(...tops);
    } else {
      break;
    }
  }

  return pages;
}
