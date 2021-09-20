import React from "react";
import classes from "./featured-posts.module.css";
import PostsGrid from "../posts/posts-grid";

interface IFeaturedPosts {
  posts: any;
}

const FeaturedPosts: React.FC<IFeaturedPosts> = ({ posts }) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
