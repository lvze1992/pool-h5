import React, { useEffect } from 'react';
import { Loading } from '../../../components';
async function passwordCheck() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('0');
    }, 2000);
  });
}
export default function PasswordCheck(props) {
  useEffect(() => {
    async function fetchData() {
      let useCheck = await passwordCheck();
      props.next({ useCheck });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Loading label="账号检查..." />
    </div>
  );
}
