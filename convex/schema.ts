import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    username: v.string(),
    phoneNumber: v.string(),
    profilePicture: v.optional(v.string()),
    status: v.optional(v.array(v.string())),
    about: v.optional(v.string()),
    lastSeen: v.string(),
  }),

  messages: defineTable({
    text: v.string(),
    sender: v.id('users'),
    receiver: v.id('users'),
    timestamp: v.string(),
    isRead: v.boolean(),
    mediaURL: v.optional(v.string()),
    messageType: v.string(),
    replyTo: v.optional(v.id('messages')),
  }),

  conversations: defineTable({
    participants: v.array(v.id('users')),
    lastMessage: v.id('messages'),
    unreadCount: v.number(),
  }),

  conversationMessages: defineTable({
    text: v.string(),
    sender: v.id('users'),
    receiver: v.id('users'),
    timestamp: v.string(),
    isRead: v.boolean(),
  }),

  groups: defineTable({
    name: v.string(),
    members: v.array(v.id('users')),
    admin: v.id('users'),
    memberToAdmins: v.optional(v.array(v.id('users'))),
    groupPicture: v.optional(v.string()),
    groupDescription: v.optional(v.string()),
  }),

  groupMessages: defineTable({
    text: v.string(),
    sender: v.id('users'),
    group: v.id('groups'),
    timestamp: v.string(),
    mediaURL: v.optional(v.string()),
    messageType: v.string(),
    replyTo: v.optional(v.id('groupMessages')),
  }),
});
