import db from "../config/firebase";

export const getCommentsDB = async (postId: string) => {
  const commentsRef = await db
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .get();

  const comments = commentsRef.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return comments;
};

export const addCommentDB = async (postId: string, comment: Object) => {
  await db.collection("posts").doc(postId).collection("comments").add(comment);

  return comment;
};
