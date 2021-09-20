import React from "react";
import classes from "./all-posts.module.css";
import PostsGrid from "./posts-grid";

interface IAllPosts {
  posts: any;
}

const AllPosts: React.FC<IAllPosts> = ({ posts }) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
