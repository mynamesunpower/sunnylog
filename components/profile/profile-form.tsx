import React, { useRef } from 'react';
import styled from '@emotion/styled';

const StyledForm = styled.form`
  width: 95%;
  max-width: 25rem;
  margin: 2rem auto;
`;

const StyledDiv = styled.div`
  margin-bottom: 0.5rem;
  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #353336;
    display: block;
  }
  input {
    display: block;
    font: inherit;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #38015c;
    padding: 0.25rem;
    background-color: #f7f0fa;
  }
`;

const StyledButtonDiv = styled.div`
  margin-top: 1.5rem;
  button {
    font: inherit;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    background-color: #38015c;
    color: white;
    border: 1px solid #38015c;
  }
  button:hover {
    background-color: #540d83;
    border-color: #540d83;
  }
`;

const changePassword = async (
  oldPassword: string,
  newPassword: string,
): Promise<Response> => {
  const response = await fetch('/api/user/change-password', {
    method: 'PATCH',
    body: JSON.stringify({ oldPassword, newPassword }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Change Password Failed!');
  }

  return data;
};

const ProfileForm: React.FC = () => {
  let enteredOldPassword, enteredNewPassword;
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  if (oldPasswordRef.current) {
    console.log(oldPasswordRef.current.value);
    enteredOldPassword = oldPasswordRef.current.value;
  }
  if (newPasswordRef.current) {
    console.log(newPasswordRef.current.value);
    enteredNewPassword = newPasswordRef.current.value;
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await changePassword(enteredOldPassword, enteredNewPassword);
    console.log(result);
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <StyledDiv>
        <label htmlFor="old-password">기존 비밀번호</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </StyledDiv>
      <StyledDiv>
        <label htmlFor="new-password">새 비밀번호</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </StyledDiv>
      <StyledButtonDiv>
        <button>비밀번호 변경</button>
      </StyledButtonDiv>
    </StyledForm>
  );
};

export default ProfileForm;
