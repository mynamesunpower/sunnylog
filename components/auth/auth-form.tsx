import React, { useRef, useState } from 'react';
import { signIn } from 'next-auth/client';
// import {
//   Section,
//   ActionButton,
//   ActionToggleButton,
//   ActionDiv,
//   H1,
//   ControlLabel,
//   ControlInput,
//   ControlDiv,
// } from './auth-form-theme';
// TODO 이거 styled-component를 별도의 파일로 관리하면 새로고침때 CSS가 적용이 안되고 있음
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ProviderType } from 'next-auth/providers';

export const Section = styled.section`
  margin: 3rem auto;
  width: 95%;
  max-width: 25rem;
  border-radius: 6px;
  background-color: #38015c;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  text-align: center;
`;

export const H1 = styled.h1`
  text-align: center;
  color: white;
`;

export const ControlDiv = styled.div`
  margin-bottom: 0.5rem;
`;

export const ControlLabel = styled.label`
  display: block;
  color: white;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const ControlInput = styled.input`
  font: inherit;
  background-color: #f1e1fc;
  color: #38015c;
  border-radius: 4px;
  border: 1px solid white;
  width: 100%;
  text-align: left;
  padding: 0.25rem;
`;

export const ActionDiv = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ActionButton = styled.button`
  cursor: pointer;
  font: inherit;
  color: white;
  background-color: #9f5ccc;
  border: 1px solid #9f5ccc;
  border-radius: 4px;
  padding: 0.5rem 2.5rem;
  &:hover {
    background-color: #873abb;
    border-color: #873abb;
  }
`;

export const ActionToggleButton = styled.button`
  margin-top: 1rem;
  background-color: transparent;
  color: #9f5ccc;
  border: none;
  padding: 0.15rem 1.5rem;
  &:hover {
    background-color: transparent;
    color: #ae82cc;
  }
`;

const SocialLoginButton = styled.button`
  background-color: transparent;
  border: none;
`;

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

interface AuthFormProps {
  providers: ProviderType[];
}

const AuthForm: React.FC<AuthFormProps> = ({ providers }) => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

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
          router.replace('/profile');
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
      <ActionDiv>
        <div>
          {Object.values(providers).map((provider: any) => {
            if (provider.name.toLowerCase() === 'credentials') return;
            return (
              <SocialLoginButton
                key={provider.id}
                onClick={() => signIn(provider.id)}
              >
                <Image
                  src={`/images/ui/login_${provider.name.toLowerCase()}.png`}
                  width={48}
                  height={48}
                />
              </SocialLoginButton>
            );
          })}
        </div>
      </ActionDiv>
    </Section>
  );
};

export default AuthForm;
