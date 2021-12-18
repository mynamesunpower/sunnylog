import Image from 'next/image';
import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { StyledAnchor, StyledHeader } from '../layout/main-navigation';
import { css } from '@emotion/react';

const HeroSection = styled.section`
  text-align: center;
  background-image: linear-gradient(
    to bottom,
    rgba(15, 32, 39, 1),
    rgba(32, 58, 67, 0.98),
    rgba(44, 83, 100, 0.95)
  );
  padding: var(--size-8) 0 var(--size-20);
  h1 {
    display: inline;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
    font-size: var(--size-6);
    margin: var(--size-4) 0;
    color: #ffffff;
  }
  p {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
    font-size: var(--size-4);
    line-height: 1.8rem;
    letter-spacing: 0.04rem;
    color: #ffffff;
    width: 90%;
    max-width: 40rem;
    margin: auto;
  }

  border-style: solid;
  border-image: linear-gradient(to right, #01c9ca 0%, #3886ff 100%);
  border-image-slice: 1;
  border-image-width: 0 0 10px 0;
`;

const ImageDiv = styled.div`
  width: 300px;
  height: 300px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  //border-radius: 50%;
  overflow: hidden;
  background-color: var(--color-grey-700);
  margin: auto;
  margin-bottom: var(--size-4);
  img {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
  }
`;

const IntroduceDiv = styled.div`
  font-size: var(--size-6);
  color: #ffffff;
  p {
    padding-left: 40px;
    padding-top: 20px;
    font-size: var(--size-5);
    text-align: left;
  }
`;

const StrongText = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
`;

const Icons = (props) => {
  switch (props.title) {
    case 'github':
      return css`
        float: right;
        color: rgb(239, 234, 255);
      `;
    case 'notion':
      return css`
        float: right;
        color: rgb(255, 234, 122);
      `;
  }
};
const HeroText = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 100;
  font-size: var(--size-5);
  color: rgb(253, 253, 253);
  &:hover {
    font-weight: 300;
    border-bottom: 1px solid rgb(172, 74, 106);
  }
  ${Icons}
`;
/*
  Navigation 영역
 */
const StyledNav = styled.nav`
  width: 90%;
  max-width: 40rem;
  margin: 0 auto var(--size-16);
  ul {
    display: flex;
    align-items: center;
  }
  li {
    color: white;
    list-style: none;
    margin-right: var(--size-4);
  }
  span {
    cursor: pointer;
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroSection>
      <StyledHeader>
        <StyledNav>
          <ul>
            <li>
              <Link href="/">
                <HeroText>Home</HeroText>
              </Link>
            </li>
            <li>
              <Link href="/posts">
                <HeroText>Posts</HeroText>
              </Link>
            </li>
            <li>
              <HeroText title={'github'}>Github</HeroText>
            </li>
          </ul>
        </StyledNav>
      </StyledHeader>
      <ImageDiv>
        <Image
          src="/images/site/sunny.png"
          alt="Image showing Sunny"
          width={526}
          height={593}
        />
      </ImageDiv>

      <IntroduceDiv>
        <p>
          <StrongText>안녕하세요. 김태양입니다.</StrongText> <br /> <br />
          이름처럼 타오르는 열정을 지니고 있습니다. 겸손한 자세로 배움에 임하고,
          성실히 업무에 임하겠습니다. 최신 기술과 프론트엔드 업계 동향에 대한
          정보를 얻기를 좋아합니다. HTML5, CSS3, JavaScript(ECMA-262)로 웹
          페이지를 구성할 수 있습니다. 프론트엔드와 백엔드 통신의 흐름을
          이해하고 있습니다.
          <a href="https://dogpitch.notion.site/sunnylog-f27e0f50e96d402bb78da48af16d4315">
            Notion
          </a>
          {/*Skills(front-end): HTML, CSS, JavaScript, TypeScript, React.js,*/}
          {/*Next.js <br />*/}
          {/*Skills(back-end): Java, Spring Boot, JPA, Mybatis <br />*/}
          {/*Skills(Database): Oracle, MySQL, MariaDB, MongoDB*/}
        </p>
      </IntroduceDiv>
    </HeroSection>
  );
};

export default Hero;
