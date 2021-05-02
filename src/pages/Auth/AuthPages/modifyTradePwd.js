import React, { useEffect } from 'react';
import { Toast } from 'antd-mobile';
import { Loading } from '../../../components';
async function modifyTradePwd() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('0');
    }, 2000);
  });
}
export default function ModifyTradePwd(props) {
  useEffect(() => {
    async function fetchData() {
      await modifyTradePwd();
      Toast.info('交易密码修改成功');
      props.next({ result: true });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Loading label="修改交易密码：安全校验中..." />
    </div>
  );
}
