import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { desc, eq } from "@repo/db";
import { CreatePostSchema, Post } from "@repo/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";

// export const fetchPosts = async () => {
//   try {
//     console.log("Fetching posts...");
//     await new Promise((r) => setTimeout(r, 500));
//     const req = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const posts = (await req.json()) as PostType[];
//     return posts.slice(0, 10);
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const fetchPost = async (postId: string) => {
//   try {
//     console.log(`Fetching post with id ${postId}...`);
//     await new Promise((r) => setTimeout(r, 500));
//     const postReq = await fetch(
//       `https://jsonplaceholder.typicode.com/posts/${postId}`,
//     );
//     const post = (await postReq.json()) as PostType;
//     if (!post) {
//       throw new NotFoundError(`Post with id "${postId}" not found!`);
//     }
//     return post;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
export interface PostType {
  id: string;
  title: string;
  body: string;
}

export const postRouter = {
  all: publicProcedure.query(async ({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    console.log("Fetching posts...");
    await new Promise((r) => setTimeout(r, 500));
    const req = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = (await req.json()) as PostType[];
    return posts.slice(0, 10);
    // return ctx.db.query.Post.findMany({
    //   orderBy: desc(Post.id),
    //   limit: 10,
    // });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log(`Fetching post with id ${input.id}...`);
      await new Promise((r) => setTimeout(r, 500));
      const postReq = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${input.id}`,
      );
      const post = (await postReq.json()) as PostType;
      if (!post) {
        throw new Error(`Post with id "${input.id}" not found!`);
      }
      return post;
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(Post).values(input);
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(Post).where(eq(Post.id, input));
  }),
} satisfies TRPCRouterRecord;
