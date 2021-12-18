import Image from 'next/image';
import React from 'react';
import styled from '@emotion/styled';

const HeroSection = styled.section`
  text-align: center;
  background-image: linear-gradient(
    to bottom,
    var(--color-grey-900),
    var(--color-grey-800)
  );
  padding: var(--size-8) 0;
  h1 {
    font-size: var(--size-8);
    margin: var(--size-4) 0;
    color: var(--color-grey-300);
  }
  p {
    font-size: var(--size-6);
    color: var(--color-grey-200);
    width: 90%;
    max-width: 40rem;
    margin: auto;
  }
`;

const ImageDiv = styled.div`
  width: 150px;
  height: 150px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--color-grey-700);
  margin: auto;
  img {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
  }
`;

const IntroduceDiv = styled.div`
  font-size: var(--size-6);
  color: var(--color-success-100);
  p {
    padding-left: 40px;
    padding-top: 20px;
    font-size: var(--size-4);
    text-align: left;
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroSection>
      <ImageDiv>
        <Image
          src="/images/site/sunpower_transparent.png"
          alt="Image showing Sunny"
          width={150}
          height={150}
        />
      </ImageDiv>
      <h1>안녕하세요! 김태양입니다.</h1>
      <IntroduceDiv>
        Web Developer
        <p>
          포스트들을 Notion에서 이관해야 하는데, 아직 하지 못하고 있습니다.
          Notion을 참고해 주세요. 감사합니다.
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
