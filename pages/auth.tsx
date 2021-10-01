import React, { useEffect, useState } from 'react';
import AuthForm from '../components/auth/auth-form';
import { getSession, providers } from 'next-auth/client';
import { useRouter } from 'next/router';

interface AuthPageProps {
  providers: any;
}

const AuthPage: React.FC<AuthPageProps> = ({ providers }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm providers={providers} />;
};

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await providers(),
    },
  };
}

export default AuthPage;
