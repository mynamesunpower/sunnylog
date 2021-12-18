import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classes from './post-item.module.css';
import styled from '@emotion/styled';

interface PostItemProps {
  post: any;
}

const StyledPost = styled.li`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  background-color: var(--color-grey-800);
  text-align: center;

  a {
    color: var(--color-grey-100);
  }
`;
const StyledImage = styled.div`
  width: 100%;
  max-height: 20rem;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

const StyledContent = styled.div`
  padding: var(--size-4);
  h3 {
    margin: var(--size-2) 0;
    font-size: var(--size-5);
  }
  time {
    font-style: italic;
    color: var(--color-grey-300);
    font-size: var(--size-3);
  }
  p {
    font-size: var(--size-3);
    line-height: var(--size-4);
  }
`;

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { title, image, excerpt, date, slug } = post;

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
          <StyledImage>
            <Image
              src={imagePath}
              alt={title}
              width={300}
              height={200}
              layout="responsive"
            />
          </StyledImage>
          <StyledContent>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </StyledContent>
        </a>
      </Link>
    </StyledPost>
  );
};

export default PostItem;
