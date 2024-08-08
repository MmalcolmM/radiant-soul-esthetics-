import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { validateEmail } from '../../utils/helpers';
import {SIGNUP} from '../../utils/mutations';

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [signup] = useMutation(SIGNUP);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ variables: { name, password, email } });
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
    handleSubmit(e, name, password, email);

    setName('');
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
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
