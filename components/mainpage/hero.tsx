import Image from "next/image";
import classes from "./hero.module.css";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/sunpower_transparent.png"
          alt="Image showing Sunny"
          width={300}
          height={300}
        />
      </div>
      <h1>안녕하세요</h1>
      <p>개발자입니다</p>
    </section>
  );
};

export default Hero;
