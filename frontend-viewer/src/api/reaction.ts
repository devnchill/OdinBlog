export async function reactBlog(blogId: string, type: "LIKE" | "DISLIKE") {
  const response = await fetch(`/api/blog/${blogId}/reactions/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reactionType: type }),
    credentials: "include",
  });
  const json = await response.json();
  if (!response.ok || !json.success)
    throw new Error(json.message || "Network error");
  return json.data;
}

export async function deleteReaction(blogId: string, reactionId: string) {
  const response = await fetch(`/api/blog/${blogId}/reactions/${reactionId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });
  const json = await response.json();

  if (!response.ok) {
    console.error("network errror");
  }
  if (!json.success) {
    console.error(json.message);
  }
  return response;
}
