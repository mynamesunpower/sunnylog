import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  border-radius: 0.4rem;
  width: 4rem;
  height: 2rem;
  margin: 0.5rem;
  background-color: rgba(213, 129, 199, 0.08);
`;

const Text = styled.span`
  border: none;
  background: none;

  text-align: center;
  line-height: 2rem;
  font-size: 0.8rem;
  font-weight: 400;
  color: #d581c7;

  &:hover {
    font-weight: 700;
  }
`;

const ButtonA = (props) => {
  return (
    <Button>
      <Text>{props.children}</Text>
    </Button>
  );
};

export default ButtonA;
