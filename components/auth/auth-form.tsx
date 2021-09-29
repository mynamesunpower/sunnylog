import React, { useState } from 'react';
import classes from './auth-form.module.css';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? '로그인' : '가입하기'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? '로그인' : '계정 생성'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? '새 계정 만들기' : '존재하는 계정으로 로그인'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
