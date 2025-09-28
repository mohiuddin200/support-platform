import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getMany = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});
export const addUser = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.db.insert("users", { name });
    return user;
  },
});
