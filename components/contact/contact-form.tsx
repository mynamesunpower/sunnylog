import React, { useEffect, useState } from 'react';
import Notification from '../ui/notification';
import styled from '@emotion/styled';

const ContactSection = styled.section`
  margin: var(--size-8) auto;
  border-radius: 6px;
  background-color: var(--color-grey-100);
  width: 90%;
  max-width: 50rem;
  padding: var(--size-4);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  font-size: var(--size-6);
`;

const ContactH1 = styled.h1`
  font-size: var(--size-8);
  margin: var(--size-4) 0;
  text-align: left;
  @media (min-width: 768px) {
    font-size: var(--size-16);
    text-align: center;
  }
`;

const FormLabel = styled.label`
  display: block;
  font-family: 'Oswald', sans-serif;
  font-weight: bold;
  margin: var(--size-2) 0 var(--size-1) 0;
`;

const FormInput = styled.input`
  font: inherit;
  padding: var(--size-1);
  border-radius: 4px;
  width: 100%;
  border: 1px solid var(--color-grey-400);
  background-color: var(--color-grey-50);
  resize: none;
`;

const FormTextarea = styled.textarea`
  font: inherit;
  padding: var(--size-1);
  border-radius: 4px;
  width: 100%;
  border: 1px solid var(--color-grey-400);
  background-color: var(--color-grey-50);
  resize: none;
`;

const ControlsDiv = styled.div`
  display: flex;
  column-gap: 1rem;
  flex-wrap: wrap;
`;

const ControlDiv = styled.div`
  flex: 1;
  min-width: 10rem;
`;

const ActionsDiv = styled.div`
  margin-top: var(--size-4);
  text-align: right;
`;

const FormButton = styled.button`
  font: inherit;
  cursor: pointer;
  background-color: var(--color-primary-700);
  border: 1px solid var(--color-primary-700);
  padding: var(--size-2) var(--size-4);
  border-radius: 4px;
  color: var(--color-primary-50);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: var(--color-primary-500);
    border-color: var(--color-primary-500);
  }
`;

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
      title: '??????',
      message: '????????? ???...',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: '??????!',
      message: '?????? ?????? ??????!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: '?????????!',
      message: requestError,
    };
  }

  return (
    <ContactSection>
      <ContactH1>????????????</ContactH1>
      <form onSubmit={sendMessageHandler}>
        <ControlsDiv>
          <ControlDiv>
            <FormLabel htmlFor="email">??????</FormLabel>
            <FormInput
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </ControlDiv>
          <ControlDiv>
            <FormLabel htmlFor="name">?????????</FormLabel>
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
          <FormLabel htmlFor="message">??????</FormLabel>
          <FormTextarea
            id="message"
            rows={5}
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          />
        </ControlDiv>

        <ActionsDiv>
          <FormButton>?????? ?????????</FormButton>
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
