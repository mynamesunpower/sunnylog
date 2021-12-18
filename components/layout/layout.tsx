import React, { PropsWithChildren } from 'react';
import MainNavigation from './main-navigation';
import Hero from '../mainpage/hero';
import { useRouter } from 'next/router';

type Props = {};

const Layout: React.FC = (props: PropsWithChildren<Props>) => {
  // console.log(props);
  const { pathname, query } = useRouter();

  // 조건부로 MainNavigation / Hero 나누자. 첫 페이지에만 Hero
  return (
    <>
      {pathname === '/' && <Hero />}
      {pathname !== '/' && <MainNavigation />}
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
