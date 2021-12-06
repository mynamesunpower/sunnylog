import React, { PropsWithChildren } from 'react';
import MainNavigation from './main-navigation';
import Hero from '../mainpage/hero';

type Props = {};

const Layout: React.FC = (props: PropsWithChildren<Props>) => {
  return (
    <>
      <MainNavigation />
      <Hero />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
