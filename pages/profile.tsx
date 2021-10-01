import React from 'react';
import UserProfile from '../components/profile/user-profile';
import { getSession } from 'next-auth/client';
import { getToken } from 'next-auth/jwt';

const ProfilePage: React.FC = () => {
  return <UserProfile />;
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
