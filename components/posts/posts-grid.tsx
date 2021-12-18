import React from 'react';
import PostItem from './post-item';
import styled from '@emotion/styled';

interface PostsGridProps {
  posts: any;
}

const StyledPostGrid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1.5rem;
  align-content: center;
`;

const PostsGrid: React.FC<PostsGridProps> = (props) => {
  const { posts } = props;

  return (
    <StyledPostGrid>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </StyledPostGrid>
  );
};

export default PostsGrid;
