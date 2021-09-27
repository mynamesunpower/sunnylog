import React from "react";
import classes from "./featured-posts.module.css";
import PostsGrid from "../posts/posts-grid";

interface IFeaturedPosts {
  posts: any;
}

const FeaturedPosts: React.FC<IFeaturedPosts> = ({ posts }) => {
  return (
    <section className={classes.latest}>
      <h2>포스트</h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
