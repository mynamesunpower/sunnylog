import React from 'react';
import PostContent from '../../components/posts/post-detail/post-content';
import { getAllPosts, getPostData, getPostsFiles } from '../../lib/posts-util';
import { SinglePostProps } from '../../types/common';
import Head from 'next/head';

const PostDetailPage: React.FC<SinglePostProps> = (props) => {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </>
  );
};

export function getStaticProps(context) {
  const { params } = context;
  const postData = getPostData(params.slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();
  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    // fallback: true
    // fallback: 'blocking'
    fallback: false,
  };
}

export default PostDetailPage;
