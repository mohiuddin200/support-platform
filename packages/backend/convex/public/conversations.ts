import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const getOne = query({
  args: {
    conversationId: v.id("conversation"),
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);
    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Contact session is invalid or expired",
      });
    }
    const conversation = await ctx.db.get(args.conversationId); 

    if(!conversation){
      return null
    }

    return{
      _id: conversation._id,
      status: conversation.status,
      threadId: conversation.threadId, 
    }
    
  },
});

export const create = mutation({
  args: {
    organizationId: v.string(),
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);
    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Contact session is invalid or expired",
      });
    }

    // TODO: Replace once functionality works.

    const threadId = "123";

    const conversationId = await ctx.db.insert("conversation", {
      organizationId: args.organizationId,
      status: "unresolved",
      threadId,
      contactSessionId: args.contactSessionId,
    });
    return conversationId;
  },
});
