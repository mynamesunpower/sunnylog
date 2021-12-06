import classes from './profile-form.module.css';
import React, { useRef } from 'react';

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
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="old-password">기존 비밀번호</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">새 비밀번호</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>비밀번호 변경</button>
      </div>
    </form>
  );
};

export default ProfileForm;
