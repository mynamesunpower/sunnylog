import React from "react";
import classes from "./posts-grid.module.css";
import PostItem from "./post-item";

interface IPostsGrid {
  posts: any;
}

const PostsGrid: React.FC<IPostsGrid> = (props) => {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem />
      ))}
    </ul>
  );
};

export default PostsGrid;
