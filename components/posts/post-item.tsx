import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';

interface PostItemProps {
  post: any;
}

const StyledPost = styled.li`
  //box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  //background-color: var(--color-grey-800);
  //text-align: center;

  a {
    color: var(--color-grey-100);
  }
`;
const StyledImage = styled.div`
  width: 100%;
  max-height: 10rem;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

const StyledContent = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  padding: var(--size-4);
  h4 {
    font-weight: 400;
    font-family: 'Noto Sans KR', sans-serif;
    margin: var(--size-1) 0;
    color: rgb(162, 34, 240);
    font-size: var(--size-3);
  }
  h3 {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
    margin: var(--size-2) 0;
    font-size: var(--size-5);
    color: rgb(67, 46, 81);
  }
  time {
    font-family: 'Noto Sans KR', sans-serif;
    font-style: italic;
    color: rgb(67, 46, 81);
    font-size: var(--size-3);
  }
  p {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
    font-size: var(--size-3);
    line-height: var(--size-4);
    color: rgb(67, 46, 81);
  }
`;

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { title, image, excerpt, date, slug, category } = post;

  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <StyledPost>
      <Link href={linkPath}>
        <a>
          {/*<StyledImage>*/}
          {/*  <Image*/}
          {/*    src={imagePath}*/}
          {/*    alt={title}*/}
          {/*    width={300}*/}
          {/*    height={200}*/}
          {/*    layout="responsive"*/}
          {/*  />*/}
          {/*</StyledImage>*/}
          <StyledContent>
            <time>{formattedDate}</time>
            <h4>{category}</h4>
            <h3>{title}</h3>
            <p>{excerpt}</p>
          </StyledContent>
        </a>
      </Link>
    </StyledPost>
  );
};

export default PostItem;
