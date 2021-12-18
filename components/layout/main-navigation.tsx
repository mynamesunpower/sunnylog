import React from 'react';
import Link from 'next/link';
import Logo from './logo';
import { useSession, signOut } from 'next-auth/client';
import styled from '@emotion/styled';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  background-color: #ffffff;
`;

const StyledAnchor = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #ffffff;
`;

const StyledNav = styled.nav``;

const StyledText = styled.text`
  text-align: left;
  vertical-align: top;
  font-size: 20px;
  font-family: Futura PT;
  line-height: 30%;
  color: #2e2675;
`;

const MainNavigation: React.FC = () => {
  const [session, loading] = useSession(); // loading -> 로딩 중인지.

  const logoutHandler = () => {
    signOut();
  };

  return (
    <StyledHeader>
      <Link href="/">
        <StyledAnchor>
          <Logo />
        </StyledAnchor>
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
              <Link href="/profile">
                <StyledText>Profile</StyledText>
              </Link>
            </li>
          )}
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">
              <StyledText>Contact</StyledText>
            </Link>
          </li>
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default MainNavigation;
