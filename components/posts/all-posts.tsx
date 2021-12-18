import React from 'react';
import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';
import ButtonA from '../atoms/buttons/ButtonA';
import styled from '@emotion/styled';

const PostSection = styled.section`
  width: 90%;
  max-width: 60rem;
  margin: var(--size-8) auto;
`;
/*
.posts {
    width: 90%;
    max-width: 60rem;
    margin: var(--size-8) auto;
}

.posts h1 {
    font-size: var(--size-8);
    color: var(--color-grey-800);
    text-align: center;
}

@media (min-width: 768px) {
    .posts h1 {
        font-size: var(--size-16);
    }
}
*/
interface AllPostsProps {
  posts: any;
}

const AllPosts: React.FC<AllPostsProps> = ({ posts }) => {
  return (
    <PostSection>
      <h1>모든 포스트</h1>
      <ButtonA>English</ButtonA>
      <PostsGrid posts={posts} />
    </PostSection>
  );
};

export default AllPosts;
