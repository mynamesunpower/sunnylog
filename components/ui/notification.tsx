import React from 'react';
import classes from './notification.module.css';
import ReactDOM from 'react-dom';

interface INotification {
  title: string;
  message: string;
  status: string;
}

const Notification: React.FC<INotification> = (props) => {
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;
  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById('notifications')!, // TypeScript Null Checker (절대 null이 아니라면), 또는 널 체크를 따로 만들어야 함.
  );
};

export default Notification;
