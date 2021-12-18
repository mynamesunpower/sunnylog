import React, { useEffect } from 'react';
import NewPosts from '../components/mainpage/new-posts';
import { getNewPosts } from '../lib/posts-util';
import { CommonProps } from '../types/common';
import Head from 'next/head';
import { getSession } from 'next-auth/client';

const MainPage: React.FC<CommonProps> = (props) => {
  useEffect(() => {
    getSession().then((response) => {
      console.log(response);
    });
  }, []);

  const { posts } = props;

  return (
    <>
      <Head>
        <title>써니로그</title>
        <meta name="description" content="써니의 놀이터" />
      </Head>
      <NewPosts posts={posts} />
    </>
  );
};

export function getStaticProps() {
  const featuredPost = getNewPosts();

  return {
    props: {
      posts: featuredPost,
    },
    // revalidate: 1800
  };
}

export default MainPage;
