import { api } from './_generated/api';
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const createGroup = mutation({
  args: {
    name: v.string(),
    members: v.array(v.id('users')),
    admin: v.id('users'),
    memberToAdmins: v.optional(v.array(v.id('users'))),
    groupPicture: v.optional(v.string()),
    groupDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const group = await ctx.db.insert('groups', {
      name: args.name,
      members: args.members,
      admin: args.admin,
    });

    return group;
  },
});

export const getAllGroups = query({
  args: {
    currentuser: v.optional(v.id('users')),
  },
  handler: async (ctx, args) => {
    const groups = await ctx.db.query('groups').collect();

    return groups;
  },
});

export const getGroup = query({
  args: { groupId: v.id('groups') },
  handler: async (ctx, args) => {
    const group = await ctx.db
      .query('groups')
      .filter((q) => q.eq(q.field('_id'), args.groupId))
      .unique();

    return group;
  },
});

export const sendGroupMessage = mutation({
  args: {
    text: v.string(),
    sender: v.id('users'),
    group: v.id('groups'),
    timestamp: v.string(),
    mediaURL: v.optional(v.string()),
    messageType: v.string(),
    replyTo: v.optional(v.id('groupMessages')),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.insert('groupMessages', {
      text: args.text,
      sender: args.sender,
      group: args.group,
      timestamp: args.timestamp,
      messageType: args.messageType,
      mediaURL: args.mediaURL,
      replyTo: args.replyTo,
    });

    return message;
  },
});

export const getAllGroupMessages = query({
  args: {
    groupId: v.id('groups'),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query('groupMessages')
      .filter((q) => q.eq(q.field('group'), args.groupId))
      .collect();

    return messages;
  },
});
