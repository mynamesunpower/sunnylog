import React from 'react';
import classes from './featured-posts.module.css';
import PostsGrid from '../posts/posts-grid';

interface FeaturedPostsProps {
  posts: any;
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  return (
    <section className={classes.latest}>
      <h2>포스트</h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
