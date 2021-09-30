import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import React, { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/client';

const UserProfile: React.FC = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);
  //
  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  return (
    <section className={classes.profile}>
      <h1>테스트</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
