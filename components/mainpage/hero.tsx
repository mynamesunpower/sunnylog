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
      <h1>Hi, I'm sunny, a pseudo-dev.</h1>
      <p>Web Development</p>
    </section>
  );
};

export default Hero;
