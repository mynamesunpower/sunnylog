import React from 'react';
import AllPosts from '../../components/posts/all-posts';
import { CommonProps } from '../../types/common';
import { getAllPosts } from '../../lib/posts-util';
import Head from 'next/head';

const AllPostPage: React.FC<CommonProps> = (props) => {
  return (
    <>
      <Head>
        <title>모든 포스트</title>
        <meta name="description" content="어나더의 모든 포스트" />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
};

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostPage;
