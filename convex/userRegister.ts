import { api } from './_generated/api';
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const createUser = mutation({
  args: {
    userId: v.string(),
    username: v.string(),
    phoneNumber: v.string(),
    profilePicture: v.string(),
    lastSeen: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.insert('users', {
      userId: args.userId,
      username: args.username,
      phoneNumber: args.phoneNumber,
      lastSeen: args.lastSeen,
      profilePicture: args.profilePicture,
    });

    return user;
  },
});

export const getUser = query({
  args: { phoneNumber: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.phoneNumber === '') return;

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('phoneNumber'), args.phoneNumber))
      .collect();

    return user;
  },
});

export const getAllUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query('users').collect();
    return users;
  },
});
