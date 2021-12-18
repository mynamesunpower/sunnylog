import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory: string = path.join(process.cwd(), 'content', 'posts');

export function getPostData(postIdentifier: string): Post {
  let postSlug, fileContent;
  postSlug = postIdentifier.replace(/\.md$/, ''); // removes file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    date: data.date,
    category: data.category,
    image: data.image,
    title: data.title,
    isFeatured: data.isFeatured,
    excerpt: data.excerpt,
    slug: postSlug,
    content,
  };
}

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getAllPosts(): Post[] {
  const postFiles = getPostsFiles();

  return postFiles
    .map((postFile) => getPostData(postFile))
    .sort((postA: Post, postB: Post) => (postA.date > postB.date ? -1 : 1));
}

export function getNewPosts(): Post[] {
  return getAllPosts().filter((v, i) => i < 5);
}
