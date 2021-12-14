import Image from 'next/image';
import classes from './hero.module.css';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/sunpower_transparent.png"
          alt="Image showing Sunny"
          width={150}
          height={150}
        />
      </div>
      <h1>안녕하세요! 김태양입니다.</h1>
      <div className={classes.introduce}>
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
      </div>
    </section>
  );
};

export default Hero;
