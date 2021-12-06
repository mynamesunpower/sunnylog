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
          Skills(front-end): HTML, CSS, JavaScript, TypeScript, React.js,
          Next.js <br />
          Skills(back-end): Java, Spring Boot, JPA, Mybatis <br />
          Skills(Database): Oracle, MySQL, MariaDB, MongoDB
        </p>
      </div>
    </section>
  );
};

export default Hero;
