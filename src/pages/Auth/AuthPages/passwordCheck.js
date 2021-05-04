import React, { useEffect } from 'react';
import Actions from 'src/actions';
import { Toast } from 'antd-mobile';
import Utils from 'src/utils';
import { Loading } from '../../../components';
async function passwordCheck({ phone, code, pre }) {
  try {
    const userInfo = await Actions.getUserInfo(Utils.formatPhone(phone, code));
    return userInfo.hasPWD ? '1' : '0';
  } catch (e) {
    Toast.info(e.rowMessage || '异常: PC12');
    pre();
  }
}
export default function PasswordCheck(props) {
  const { pre, next } = props;
  const { phone, code } = props.authStatus;
  useEffect(() => {
    async function fetchData() {
      let useCheck = await passwordCheck({ phone, code, pre });
      next({ useCheck });
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
