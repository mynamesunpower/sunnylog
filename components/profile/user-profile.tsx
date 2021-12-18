import ProfileForm from './profile-form';
import React from 'react';
import styled from '@emotion/styled';

const StyledSection = styled.section`
  margin: 3rem auto;
  text-align: center;
  h1 {
    font-size: 5rem;
  }
`;

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
    <StyledSection>
      <h1>테스트</h1>
      <ProfileForm />
    </StyledSection>
  );
};

export default UserProfile;
