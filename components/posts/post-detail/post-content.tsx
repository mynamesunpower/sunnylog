import React from "react";
import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import { SinglePostProps } from "../../../types/common";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  materialDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

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
      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1];
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
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderer}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
