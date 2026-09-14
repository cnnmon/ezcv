import { v } from 'convex/values';
import { getAuthUserId } from '@convex-dev/auth/server';
import { mutation, query } from './_generated/server';

const RESERVED = new Set([
  'view',
  'builder',
  'api',
  'login',
  'logout',
  'admin',
  'new',
  'edit',
]);

const AUTO_VERSION_MS = 2 * 60 * 1000;

function extractTitle(text) {
  const match = (text || '').match(/^#header\s+(.+)$/m);
  if (match) {
    return match[1].trim().slice(0, 80);
  }
  return 'Untitled resume';
}

export function normalizeSlug(raw) {
  return String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

function validateSlug(slug) {
  if (!slug || slug.length < 2) {
    throw new Error('Link needs at least 2 characters.');
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('Use letters, numbers, and hyphens only.');
  }
  if (RESERVED.has(slug)) {
    throw new Error('That link is reserved.');
  }
}

function displayName(row) {
  if (row.name && row.name.trim()) {
    return row.name.trim();
  }
  return row.title;
}

function toResume(row) {
  return {
    id: row._id,
    name: displayName(row),
    projectName: row.name || '',
    title: row.title,
    text: row.text,
    slug: row.slug,
    updatedAt: row.updatedAt,
  };
}

async function requireUser(ctx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new Error('Sign in to publish.');
  }
  return userId;
}

async function findBySlug(ctx, slug) {
  return ctx.db
    .query('resumes')
    .withIndex('by_slug', (q) => q.eq('slug', slug))
    .unique();
}

async function uniqueSlug(ctx, preferred) {
  let base = normalizeSlug(preferred) || 'resume';
  if (RESERVED.has(base) || base.length < 2) {
    base = 'resume';
  }
  let candidate = base;
  let n = 2;
  // eslint-disable-next-line no-await-in-loop
  while (await findBySlug(ctx, candidate)) {
    candidate = `${base}-${n}`;
    n += 1;
    if (n > 99) {
      candidate = `${base}-${Date.now().toString(36)}`;
      break;
    }
  }
  return candidate;
}

async function maybeVersion(ctx, resumeId, text, { force }) {
  const latest = await ctx.db
    .query('versions')
    .withIndex('by_resume_created', (q) => q.eq('resumeId', resumeId))
    .order('desc')
    .first();

  if (!latest) {
    await ctx.db.insert('versions', {
      resumeId,
      text,
      createdAt: Date.now(),
    });
    return;
  }

  if (latest.text === text) {
    return;
  }

  if (force || Date.now() - latest.createdAt >= AUTO_VERSION_MS) {
    await ctx.db.insert('versions', {
      resumeId,
      text,
      createdAt: Date.now(),
    });
  }
}

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    const rows = await ctx.db
      .query('resumes')
      .withIndex('by_owner_updated', (q) => q.eq('ownerId', userId))
      .order('desc')
      .collect();
    return rows.map(toResume);
  },
});

export const getPublic = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const key = normalizeSlug(slug) || slug;
    let row = await findBySlug(ctx, key);
    if (!row) {
      const id = ctx.db.normalizeId('resumes', slug);
      if (id) {
        row = await ctx.db.get(id);
      }
    }
    if (!row) {
      return null;
    }
    return {
      id: row._id,
      title: row.title,
      text: row.text,
      slug: row.slug,
      updatedAt: row.updatedAt,
    };
  },
});

export const listVersions = query({
  args: { resumeId: v.string() },
  handler: async (ctx, { resumeId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    const id = ctx.db.normalizeId('resumes', resumeId);
    if (!id) {
      return [];
    }
    const resume = await ctx.db.get(id);
    if (!resume || resume.ownerId !== userId) {
      return [];
    }
    const rows = await ctx.db
      .query('versions')
      .withIndex('by_resume_created', (q) => q.eq('resumeId', id))
      .order('desc')
      .take(50);
    return rows.map((row) => ({
      id: row._id,
      text: row.text,
      createdAt: row.createdAt,
    }));
  },
});

export const isSlugAvailable = query({
  args: {
    slug: v.string(),
    resumeId: v.optional(v.string()),
  },
  handler: async (ctx, { slug, resumeId }) => {
    const normalized = normalizeSlug(slug);
    if (!normalized || normalized.length < 2) {
      return { ok: false, reason: 'too_short' };
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalized)) {
      return { ok: false, reason: 'invalid' };
    }
    if (RESERVED.has(normalized)) {
      return { ok: false, reason: 'reserved' };
    }
    const existing = await findBySlug(ctx, normalized);
    if (!existing) {
      return { ok: true, slug: normalized };
    }
    const ownId = resumeId ? ctx.db.normalizeId('resumes', resumeId) : null;
    if (ownId && existing._id === ownId) {
      return { ok: true, slug: normalized };
    }
    return { ok: false, reason: 'taken' };
  },
});

export const save = mutation({
  args: {
    resumeId: v.optional(v.string()),
    text: v.string(),
    auto: v.optional(v.boolean()),
  },
  handler: async (ctx, { resumeId, text, auto }) => {
    const userId = await requireUser(ctx);
    const now = Date.now();
    const title = extractTitle(text);
    const existingId = resumeId
      ? ctx.db.normalizeId('resumes', resumeId)
      : null;

    if (!existingId) {
      const slug = await uniqueSlug(ctx, title);
      const id = await ctx.db.insert('resumes', {
        ownerId: userId,
        title,
        text,
        slug,
        updatedAt: now,
      });
      await ctx.db.insert('versions', {
        resumeId: id,
        text,
        createdAt: now,
      });
      return { id, slug };
    }

    const existing = await ctx.db.get(existingId);
    if (!existing || existing.ownerId !== userId) {
      throw new Error('You cannot publish this resume.');
    }

    const patch = { title, text, updatedAt: now };
    if (!existing.slug) {
      patch.slug = await uniqueSlug(ctx, title);
    }

    await ctx.db.patch(existingId, patch);
    if (existing.text !== text) {
      await maybeVersion(ctx, existingId, text, { force: !auto });
    }
    const updated = await ctx.db.get(existingId);
    return { id: existingId, slug: updated.slug };
  },
});

export const create = mutation({
  args: {
    text: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, { text, name }) => {
    const userId = await requireUser(ctx);
    const now = Date.now();
    const title = extractTitle(text);
    const projectName = (name || '').trim().slice(0, 80);
    const slugPreferred = projectName || title;
    const slug = await uniqueSlug(ctx, slugPreferred);
    const id = await ctx.db.insert('resumes', {
      ownerId: userId,
      name: projectName || undefined,
      title,
      text,
      slug,
      updatedAt: now,
    });
    await ctx.db.insert('versions', {
      resumeId: id,
      text,
      createdAt: now,
    });
    return { id, slug, name: projectName || title };
  },
});

export const rename = mutation({
  args: {
    resumeId: v.string(),
    name: v.string(),
  },
  handler: async (ctx, { resumeId, name }) => {
    const userId = await requireUser(ctx);
    const id = ctx.db.normalizeId('resumes', resumeId);
    if (!id) {
      throw new Error('Resume not found.');
    }
    const resume = await ctx.db.get(id);
    if (!resume || resume.ownerId !== userId) {
      throw new Error('You cannot rename this resume.');
    }
    const next = name.trim().slice(0, 80);
    await ctx.db.patch(id, {
      name: next || undefined,
      updatedAt: Date.now(),
    });
    return next;
  },
});

export const setSlug = mutation({
  args: {
    resumeId: v.string(),
    slug: v.string(),
  },
  handler: async (ctx, { resumeId, slug }) => {
    const userId = await requireUser(ctx);
    const id = ctx.db.normalizeId('resumes', resumeId);
    if (!id) {
      throw new Error('Resume not found.');
    }
    const resume = await ctx.db.get(id);
    if (!resume || resume.ownerId !== userId) {
      throw new Error('You cannot edit this link.');
    }

    const normalized = normalizeSlug(slug);
    validateSlug(normalized);

    const taken = await findBySlug(ctx, normalized);
    if (taken && taken._id !== id) {
      throw new Error('That link is already taken.');
    }

    await ctx.db.patch(id, { slug: normalized, updatedAt: Date.now() });
    return normalized;
  },
});
