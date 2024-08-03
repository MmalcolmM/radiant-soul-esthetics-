import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SEND_EMAIL = gql`
  mutation SendEmail($name: String!, $email: String!, $message: String!) {
    sendEmail(name: $name, email: $email, message: $message)
  }
`;

function SendEmail() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendEmail] = useMutation(SEND_EMAIL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendEmail({ variables: { name, email, message } });
    setName('');
    setEmail('');
    setMessage('');
    alert('Email sent successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default SendEmail;
