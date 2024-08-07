import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { validateEmail } from '../../utils/helpers';

const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password)
  }
`;

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [signup] = useMutation(SIGNUP);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ variables: { username, password, email } });
    navigate('/Login');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email address');
      return;
    }

    if (password !== verifyPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    handleSubmit(e, username, password, email);

    setUsername('');
    setPassword('');
    setVerifyPassword('');
    setEmail('');
    setErrorMessage('');
  };

  return (
    <>
    <form onSubmit={handleFormSubmit}>
    <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="password"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      <button type="submit">Signup</button>
    </form>
    {errorMessage && (
      <div>
        <p className="error-text alert alert-danger" role="alert">{errorMessage}</p>
      </div>
    )}
  </>
  );
}

export default Signup;
