import React from "react";
import AllPosts from "../../components/posts/all-posts";
import { CommonProps } from "../../types/common";
import { getAllPosts } from "../../lib/posts-util";

const AllPostPage: React.FC<CommonProps> = (props) => {
  return <AllPosts posts={props.posts} />;
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
