import React from 'react';
import styled from '@emotion/styled';

const LogoDiv = styled.div`
  text-transform: uppercase;
  font-size: var(--size-5);
  font-weight: bold;
  font-family: 'Oswald', sans-serif;
  /*color: var(--color-grey-50);*/
  color: #e84a45;

  @media (min-width: 768px) {
    font-size: var(--size-8);
  }
`;

const Logo: React.FC = () => {
  return <LogoDiv>Sunny.log</LogoDiv>;
};

export default Logo;
