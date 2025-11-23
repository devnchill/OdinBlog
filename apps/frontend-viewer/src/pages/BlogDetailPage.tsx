import { useState } from "react";

import useBlogDetails from "../hooks/useBlogDetails";
import { useAuth } from "../hooks/useAuth";
import BlogInfo from "../components/Blogs/BlogInfo";
import ReactionBar from "../components/Blogs/ReactionBar";
import CommentBar from "../components/Blogs/CommentBar";
import CommentSection from "../components/Blogs/CommentSection";

const BlogDetailPage = () => {
  const [newComment, setNewComment] = useState<string>("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const { role, id } = useAuth();

  const {
    likeCount,
    dislikeCount,
    blogDetailResponse,
    isLoading,
    comments,
    reactionId,
    reactionType,
    setReactionId,
    setReactionType,
    setLikeCount,
    setDislikeCount,
    setComments,
  } = useBlogDetails(id!);

  if (isLoading) return <div>Loading...</div>;

  const reactionBarState = {
    blogDetailResponse,
    reactionId,
    role,
    reactionType,
    likeCount,
    dislikeCount,
    setReactionId,
    setReactionType,
    setLikeCount,
    setDislikeCount,
  };

  const CommentBarState = {
    blogDetailResponse,
    role,
    newComment,
    setComments,
    setNewComment,
  };

  const CommentSectionState = {
    comments,
    editingCommentId,
    blogDetailResponse,
    editText,
    id,
    openMenuId,
    setEditText,
    setEditingCommentId,
    setComments,
    setOpenMenuId,
  };

  return (
    <main className="m-4 rounded-xl">
      <article className="bg-[var(--color-darkish)] m-4 rounded-xl p-8">
        <BlogInfo blogDetailResponse={blogDetailResponse!} />
        <ReactionBar {...reactionBarState} />
      </article>
      <section>
        <CommentBar {...CommentBarState} />
        <CommentSection {...CommentSectionState} />
      </section>
    </main>
  );
};

export default BlogDetailPage;
