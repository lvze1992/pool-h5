import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { useStore } from '../../../Provider';
import { Loading } from '../../../components';
async function login(phone, pwd, sms) {
  console.log('login', phone, pwd, sms);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { a: 1 } });
    }, 2000);
  });
}
export default function Login(props) {
  const { phone, pwd, sms } = props.authStatus;
  const location = useLocation();
  const history = useHistory();
  let store = useStore();

  useEffect(() => {
    async function fetchData() {
      let user = await login(phone, pwd, sms);
      store.signin(user);
      console.log('location', location);
      history.replace(_.get(location, 'state.from', '/'));
      //   props.next({ user });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Loading label="登录中..." />
    </div>
  );
}
