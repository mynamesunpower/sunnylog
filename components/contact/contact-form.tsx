import React, { useEffect, useState } from 'react';
import Notification from '../ui/notification';
import {
  ActionsDiv,
  ContactH1,
  ContactSection,
  ControlDiv,
  ControlsDiv,
  FormButton,
  FormInput,
  FormLabel,
  FormTextarea,
} from './contact-form-theme';

async function sendContactData(contactDetails: any): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something wrong!');
  }
}

const ContactForm: React.FC = () => {
  const [enteredEmail, setEnteredEmail] = useState<string>('');
  const [enteredName, setEnteredName] = useState<string>('');
  const [enteredMessage, setEnteredMessage] = useState<string>('');
  const [requestStatus, setRequestStatus] = useState<string>(''); // ing, suc, err
  const [requestError, setRequestError] = useState<string>('');

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus('');
        setRequestError('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    setRequestStatus('pending');
    // add client-side validation (optional)

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus('success');
      setEnteredMessage('');
      setEnteredEmail('');
      setEnteredName('');
    } catch (error: any) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: '전송',
      message: '보내는 중...',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: '성공!',
      message: '문의 전송 완료!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: '아이쿠!',
      message: requestError,
    };
  }

  return (
    <ContactSection>
      <ContactH1>문의하기</ContactH1>
      <form onSubmit={sendMessageHandler}>
        <ControlsDiv>
          <ControlDiv>
            <FormLabel htmlFor="email">이름</FormLabel>
            <FormInput
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </ControlDiv>
          <ControlDiv>
            <FormLabel htmlFor="name">이메일</FormLabel>
            <FormInput
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </ControlDiv>
        </ControlsDiv>
        <ControlDiv>
          <FormLabel htmlFor="message">내용</FormLabel>
          <FormTextarea
            id="message"
            rows={5}
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          />
        </ControlDiv>

        <ActionsDiv>
          <FormButton>문의 보내기</FormButton>
        </ActionsDiv>
      </form>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </ContactSection>
  );
};

export default ContactForm;
