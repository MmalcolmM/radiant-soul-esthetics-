
import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation SendEmail($name: String!, $email: String!, $message: String!) {
              sendEmail(name: $name, email: $email, message: $message)
            }
          `,
          variables: { name, email, message },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      setNotification('Email sent successfully!');
      setTimeout(() => {
        setNotification('');
        // Redirect to main page
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      setNotification(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button id="submitBtn" type="submit">Send</button>
      </form>
      {notification && <p>{notification}</p>}
    </div>
  );
};

export default ContactForm;
