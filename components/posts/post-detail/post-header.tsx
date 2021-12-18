import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';

interface PostHeaderProps {
  title: any;
  image: any;
}

const StyledHeader = styled.header`
  padding-bottom: var(--size-8);
  border-bottom: 8px solid var(--color-primary-100);
  margin: var(--size-4) 0;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  h1 {
    font-size: var(--size-8);
    color: var(--color-primary-500);
    margin: 0;
    line-height: initial;
    text-align: center;
  }
  img {
    object-fit: cover;
    width: 200px;
    height: 120px;
  }

  @media (min-width: 768px) {
    margin: var(--size-8) 0;
    flex-direction: row;
    align-items: flex-end;

    h1 {
      font-size: var(--size-16);
      text-align: left;
    }
  }
`;

const PostHeader: React.FC<PostHeaderProps> = (props) => {
  const { title, image } = props;
  return (
    <StyledHeader>
      <Image src={image} alt={title} width={200} height={150} />
      <h1>{title}</h1>
    </StyledHeader>
  );
};

export default PostHeader;
