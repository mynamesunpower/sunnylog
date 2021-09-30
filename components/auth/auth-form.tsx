import React, { useRef, useState } from 'react';
import { signIn } from 'next-auth/client';
import {
  Section,
  ActionButton,
  ActionToggleButton,
  ActionDiv,
  H1,
  ControlLabel,
  ControlInput,
  ControlDiv,
} from './auth-form-theme';

const createUser = async (email: string, password: string): Promise<any> => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something Wrong!');
  }

  return data;
};

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let enteredEmail, enteredPassword;

    if (emailInputRef.current) {
      enteredEmail = emailInputRef.current.value;
    }
    if (passwordInputRef.current) {
      enteredPassword = passwordInputRef.current.value;
    }

    // 검증 (optional)

    if (isLogin) {
      // 로그인
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (result) {
        if (!result.error) {
          // set some auth state
        }
      }
    } else {
      // 가입하기
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Section>
      <H1>{isLogin ? '로그인' : '가입하기'}</H1>
      <form onSubmit={submitHandler}>
        <ControlDiv>
          <ControlLabel htmlFor="email">이메일</ControlLabel>
          <ControlInput type="email" id="email" ref={emailInputRef} required />
        </ControlDiv>
        <ControlDiv>
          <ControlLabel htmlFor="password">비밀번호</ControlLabel>
          <ControlInput
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </ControlDiv>
        <ActionDiv>
          <ActionButton>{isLogin ? '로그인' : '계정 생성'}</ActionButton>
          <ActionToggleButton type="button" onClick={switchAuthModeHandler}>
            {isLogin ? '새 계정 만들기' : '존재하는 계정으로 로그인'}
          </ActionToggleButton>
        </ActionDiv>
      </form>
    </Section>
  );
};

export default AuthForm;
