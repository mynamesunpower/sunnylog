import React from 'react';
import PostHeader from './post-header';
import ReactMarkdown from 'react-markdown';
import { SinglePostProps } from '../../../types/common';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import styled from '@emotion/styled';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

const StyledArticle = styled.article`
  width: 95%;
  max-width: 60rem;
  margin: var(--size-8) auto;
  font-size: var(--size-5);
  line-height: var(--size-8);
  background-color: var(--color-grey-100);
  border-radius: 6px;
  padding: var(--size-4);
  p {
    color: var(--color-grey-800);
  }
  @media (min-width: 768px) {
    padding: var(--size-8);
  }
`;

const ParagraphDiv = styled.div`
  margin: var(--size-4) auto;
  width: 100%;
  max-width: 600px;
`;

const PostContent: React.FC<SinglePostProps> = (props) => {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderer = {
    // img(img) {
    //   console.log(img);
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${img.src}`}
    //       alt={img.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    p(paragraph) {
      const { node } = paragraph;
      if (node.children[0].tagName === 'img') {
        const image = node.children[0];
        return (
          <ParagraphDiv>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </ParagraphDiv>
        );
      }
      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { className, children } = code;
      const language = className.split('-')[1];
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          children={children}
        />
      );
    },
  };

  return (
    <StyledArticle>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderer}>{post.content}</ReactMarkdown>
    </StyledArticle>
  );
};

export default PostContent;
