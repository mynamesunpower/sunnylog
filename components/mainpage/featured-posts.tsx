import React from 'react';
import PostsGrid from '../posts/posts-grid';
import styled from '@emotion/styled';

const LatestSection = styled.section`
  width: 90%;
  max-width: 80rem;
  margin: var(--size-8) auto;
  h2 {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: var(--size-6);
    color: var(--color-grey-800);
    text-align: center;
  }
  @media (min-width: 768px) {
    h2 {
      font-size: var(--size-6);
    }
  }
`;

interface FeaturedPostsProps {
  posts: any;
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  return (
    <LatestSection>
      <h2>새로 올린 글</h2>
      <PostsGrid posts={posts} />
    </LatestSection>
  );
};

export default FeaturedPosts;
