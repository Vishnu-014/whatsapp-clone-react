import { api } from './_generated/api';
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const sendMessage = mutation({
  args: {
    text: v.string(),
    sender: v.id('users'),
    receiver: v.id('users'),
    timestamp: v.string(),
    isRead: v.boolean(),
    mediaURL: v.optional(v.string()),
    messageType: v.string(),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.insert('messages', {
      sender: args.sender,
      receiver: args.receiver,
      text: args.text,
      timestamp: args.timestamp,
      isRead: args.isRead,
      messageType: args.messageType,
    });

    return message;
  },
});

export const getMessages = query({
  args: {
    sender: v.id('users'),
    receiver: v.id('users'),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query('messages')
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field('sender'), args.sender),
            q.eq(q.field('receiver'), args.receiver)
          ),
          q.and(
            q.eq(q.field('receiver'), args.sender),
            q.eq(q.field('sender'), args.receiver)
          )
        )
      )
      .collect();

    return messages;
  },
});

// Get last message from all users
export const getUsersLastMsg = query({
  handler: async (ctx, args) => {
    const users = await ctx.db.query('users').collect();

    const lastMessagesObject: { [key: string]: any } = {};

    for (const user of users) {
      const lastMessage = await ctx.db
        .query('messages')
        .filter((q) =>
          q.or(
            q.eq(q.field('receiver'), user._id),
            q.eq(q.field('sender'), user._id)
          )
        )
        .order('desc')
        .first();

      if (lastMessage) {
        lastMessagesObject[user._id] = lastMessage;
      }
    }

    return lastMessagesObject;
  },
});
