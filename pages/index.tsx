import React from 'react';
import Hero from '../components/mainpage/hero';
import FeaturedPosts from '../components/mainpage/featured-posts';
import { getFeaturedPosts } from '../lib/posts-util';
import { CommonProps } from '../types/common';
import Head from 'next/head';

const MainPage: React.FC<CommonProps> = (props) => {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>어나더</title>
        <meta
          name="description"
          content="어나더 개발자를 꿈꾸는 주니어들의 공작소"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export function getStaticProps() {
  const featuredPost = getFeaturedPosts();

  return {
    props: {
      posts: featuredPost,
    },
    // revalidate: 1800
  };
}

export default MainPage;
