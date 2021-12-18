import React from 'react';
import Link from 'next/link';
import Logo from './logo';
import { useSession, signOut } from 'next-auth/client';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const backgroundColor = (props) => {
  console.log(props);
  return css`
    //background-color: rgba(67, 46, 81, 0.9);
  `;
};
export const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  ${backgroundColor};
  // background-color: rgba(30, 25, 79, 0.94);
`;

/*
  Logo 영역
 */
export const StyledAnchor = styled.a`
  cursor: pointer;
  //background-color: rgb(30, 25, 79, 0.94);
`;

/*
  Navigation 영역
 */
const StyledNav = styled.nav`
  width: 100%;
  ul {
    display: flex;
    align-items: center;
  }
  li {
    flex: 1 1 20px;
    list-style: none;
  }
  span {
    cursor: pointer;
  }
`;

/*
  Navigation Text 영역
 */
const StyledText = styled.span`
  text-align: left;
  vertical-align: top;
  font-size: 20px;
  color: #ffffff;
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
      <StyledNav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/auth">
                <StyledText>Login</StyledText>
              </Link>
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
            <Link href="/posts">
              <StyledText>Posts</StyledText>
            </Link>
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
      </StyledNav>
    </StyledHeader>
  );
};

export default MainNavigation;
