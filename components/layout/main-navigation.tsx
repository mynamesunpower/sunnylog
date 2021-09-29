import React from 'react';
import Link from 'next/link';
import Logo from './logo';
import classes from './main-navigation.module.css';
import { useSession, signOut } from 'next-auth/client';

const MainNavigation: React.FC = () => {
  const [session, loading] = useSession(); // loading -> 로딩 중인지.

  const logoutHandler = () => {
    signOut();
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
