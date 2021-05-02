import React, { useEffect } from 'react';
import { Toast } from 'antd-mobile';
import { Loading } from '../../../components';
async function modifyPwd() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('0');
    }, 2000);
  });
}
export default function ModifyPwd(props) {
  useEffect(() => {
    async function fetchData() {
      await modifyPwd();
      Toast.info('登录密码修改成功');
      props.next({ result: true });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Loading label="修改登录密码：安全校验中..." />
    </div>
  );
}
