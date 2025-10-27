export async function getMyBlogs() {
  const res = await fetch("/myblog");
  const json = await res.json();
}
