import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // Redirect away if NOT auth

  return (
    <section className={classes.profile}>
      <h1>테스트</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
