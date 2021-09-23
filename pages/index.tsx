import React from "react";
import Hero from "../components/mainpage/hero";
import FeaturedPosts from "../components/mainpage/featured-posts";
import {getFeaturedPosts} from "../lib/posts-util";
import {CommonProps} from "../types/common";


const MainPage: React.FC<CommonProps> = (props) => {
  const {posts} = props;

  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export function getStaticProps() {
  const featuredPost = getFeaturedPosts();

  return {
    props: {
      posts: featuredPost
    },
    // revalidate: 1800
  }
}

export default MainPage;
