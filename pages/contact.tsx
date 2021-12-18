import React from 'react';
import ContactForm from '../components/contact/contact-form';
import Head from 'next/head';

const ContactPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>문의하기</title>
        <meta name="description" content="메일 보내기" />
      </Head>
      <ContactForm />
    </>
  );
};

export default ContactPage;
