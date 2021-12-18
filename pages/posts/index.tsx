import React from 'react';
import AllPosts from '../../components/posts/all-posts';
import { CommonProps } from '../../types/common';
import { getAllPosts } from '../../lib/posts-util';
import Head from 'next/head';

const AllPostPage: React.FC<CommonProps> = (props) => {
  return (
    <>
      <Head>
        <title>모든 글 보기</title>
        <meta name="description" content="써니로그의 모든 글" />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
};

// TODO Type GetStaticProps 확인!
export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostPage;
