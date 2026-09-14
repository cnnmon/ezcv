import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { authTables } from '@convex-dev/auth/server';

export default defineSchema({
  ...authTables,
  resumes: defineTable({
    ownerId: v.id('users'),
    name: v.optional(v.string()),
    title: v.string(),
    text: v.string(),
    slug: v.string(),
    updatedAt: v.number(),
  })
    .index('by_owner_updated', ['ownerId', 'updatedAt'])
    .index('by_slug', ['slug']),
  versions: defineTable({
    resumeId: v.id('resumes'),
    text: v.string(),
    createdAt: v.number(),
  }).index('by_resume_created', ['resumeId', 'createdAt']),
});
