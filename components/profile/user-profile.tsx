import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import React from 'react';

const UserProfile: React.FC = () => {
  // Redirect away if NOT auth
  return (
    <section className={classes.profile}>
      <h1>테스트</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
