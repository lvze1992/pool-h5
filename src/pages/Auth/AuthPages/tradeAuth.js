import React, { useEffect } from 'react';
import { Toast } from 'antd-mobile';
import { Loading } from '../../../components';
async function checkTradeAuth() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('0');
    }, 2000);
  });
}
export default function TradeAuth(props) {
  useEffect(() => {
    async function fetchData() {
      await checkTradeAuth();
      Toast.info('验证通过');
      props.next({ result: true });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Loading label="交易安全校验中..." />
    </div>
  );
}
