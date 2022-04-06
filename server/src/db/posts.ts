import db from "../config/firebase";

export const getPostsDB = async (page: number, limit: number) => {
  const postsRef = await db.collection("posts").limit(limit).get();

  const posts = postsRef.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return posts;
};

export const addPostDB = async (post: Object) => {
  const posts = db.collection("posts");
  await posts.add(post);
  return post;
};

export const deletePostDB = async (postId: string) => {
  const posts = db.collection("posts");
  await posts.doc(postId).delete();
  return postId;
};

export const updatePostStatusDB = async (postId: string, status: number) => {
  const posts = db.collection("posts");
  await posts.doc(postId).update({ status });
  return postId;
};
