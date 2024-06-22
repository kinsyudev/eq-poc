class NotFoundError extends Error {}

export interface PostType {
  id: string;
  title: string;
  body: string;
}

export const fetchPosts = async () => {
  try {
    console.log("Fetching posts...");
    await new Promise((r) => setTimeout(r, 500));
    const req = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = (await req.json()) as PostType[];
    return posts.slice(0, 10);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchPost = async (postId: string) => {
  try {
    console.log(`Fetching post with id ${postId}...`);
    await new Promise((r) => setTimeout(r, 500));
    const postReq = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );
    const post = (await postReq.json()) as PostType;
    if (!post) {
      throw new NotFoundError(`Post with id "${postId}" not found!`);
    }
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
};
