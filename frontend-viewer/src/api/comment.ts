export async function handleAddComment(comment: string, blogId: string) {
  const response = await fetch(`/api/blog/${blogId}/comments/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: comment,
    }),
  });
  const json = await response.json();
  console.log(json);
  return json;
}

export async function handleDeleteComment(blogId: string, commentId: string) {
  const response = await fetch(`/api/blog/${blogId}/comments/${commentId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const json = await response.json();
  console.log(json);
  return json;
}

export async function handleEditComment(
  blogId: string,
  commentId: string,
  text: string,
) {
  const response = await fetch(`/api/blog/${blogId}/comments/${commentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
    }),
  });
  const json = await response.json();
  console.log(json);
  return json;
}
