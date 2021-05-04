import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import Actions from 'src/actions';
import { useStore } from 'src/Provider';
import Utils from 'src/utils';
import { Loading } from 'src/components';
async function loginFunc({ authType, store, next, pre, phone, code, pwd, sms }) {
  try {
    if (authType === 'loginSms') {
      Toast.info('登录成功');
      next({ result: true });
    } else if (authType === 'loginPwd') {
      const user = await Actions.AV.User.logInWithMobilePhone(Utils.formatPhone(phone, code), pwd);
      Toast.info('登录成功');
      store.signin(user.toJSON());
      next({ result: true });
    }
  } catch (e) {
    pre();
    Toast.info(e.rowMessage || '密码错误');
  }
}
export default function Login(props) {
  const { authType, next, pre } = props;
  const { phone, code, pwd, sms } = props.authStatus;
  const location = useLocation();
  const history = useHistory();
  let store = useStore();

  useEffect(() => {
    async function fetchData() {
      await loginFunc({ authType, store, next, pre, phone, code, pwd, sms });
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
