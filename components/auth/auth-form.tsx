import React, { useRef, useState } from 'react';
import { signIn } from 'next-auth/client';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ProviderType } from 'next-auth/providers';
import Section from '../atoms/Section';
import H1 from '../atoms/H1';

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

  function switchAuthModeHandler(): void {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    let enteredEmail, enteredPassword;

    if (emailInputRef.current) {
      enteredEmail = emailInputRef.current.value;
    }
    if (passwordInputRef.current) {
      enteredPassword = passwordInputRef.current.value;
    }

    // TODO front-end 검증

    // 직접 로그인
    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (result) {
        if (!result.error) {
          // credential 인증 이후
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
            if (provider.name === 'Credentials') return;
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
