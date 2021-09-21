import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory: string = path.join(process.cwd(), "content", "posts");

function getPostData(fileName: string): Post {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, ""); // removes file extension

  return {
    date: data.date,
    image: data.image,
    title: data.title,
    isFeatured: data.isFeatured,
    slug: postSlug,
    content,
  };
}

export function getAllPosts(): Post[] {
  const postFiles = fs.readdirSync(postsDirectory);

  return postFiles
    .map((postFile) => getPostData(postFile))
    .sort((postA: Post, postB: Post) => (postA.date > postB.date ? -1 : 1));
}

export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.isFeatured);
}
