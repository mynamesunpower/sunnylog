import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface INotification {
  title: string;
  message: string;
  status: string;
}

const dynamicStyle = (props) => css`
  background-color: ${props.status === 'success'
    ? 'var(--color-success-500)'
    : 'var(--color-error-500)'};
  color: ${props.status === 'success' ? 'var(--color-grey-800)' : ''};
`;

const StyledNotification = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-grey-100);
  background-color: var(--color-grey-800);
  padding: 0 var(--size-8);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  height: 5rem;
  bottom: 0;
  width: 100%;
  left: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
  ${dynamicStyle}
`;

const Notification: React.FC<INotification> = (props) => {
  const { title, message, status } = props;

  return ReactDOM.createPortal(
    <StyledNotification>
      <h2>{title}</h2>
      <p>{message}</p>
    </StyledNotification>,
    document.getElementById('notifications')!, // TypeScript Null Checker (절대 null이 아니라면), 또는 널 체크를 따로 만들어야 함.
  );
};

export default Notification;
