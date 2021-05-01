import React from 'react';
import { useHistory } from 'react-router-dom';
import { CustomNav } from '../../components';

export default function Login(props) {
  const history = useHistory();
  return (
    <div>
      <CustomNav
        onLeftClick={() => {
          history.replace('/');
        }}
      />
      <h1>Login</h1>
    </div>
  );
}
