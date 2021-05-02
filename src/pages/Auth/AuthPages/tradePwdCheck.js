import React, { useEffect } from 'react';
import { Loading } from '../../../components';
async function tradePwdCheck() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('0');
    }, 2000);
  });
}
export default function TradePwdCheck(props) {
  useEffect(() => {
    async function fetchData() {
      let useCheck = await tradePwdCheck();
      props.next({ useCheck });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Loading label="安全校验中..." />
    </div>
  );
}
