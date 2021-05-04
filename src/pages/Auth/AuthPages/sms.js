import React, { useState, useEffect } from 'react';
import { Button, Toast } from 'antd-mobile';
import Actions from 'src/actions';
import Utils from 'src/utils';
import { useStore } from 'src/Provider';
import { CodeInput } from '../../../components';
async function sendSmsCode(authType, { phone, code }) {
  try {
    if (['loginSms', 'loginPwd'].includes(authType)) {
      await Actions.AV.Cloud.requestSmsCode(Utils.formatPhone(phone, code));
    }
  } catch (e) {
    Toast.info(e.rawMessage);
  }
}
async function verifySmsCode({ authType, next, store, sms, phone, code, pwd }) {
  try {
    if (authType === 'loginSms') {
      // 801475
      const user = await Actions.AV.User.signUpOrlogInWithMobilePhone(Utils.formatPhone(phone, code), sms);
      store.signin(user.toJSON());
    } else if (authType === 'loginPwd') {
      await Actions.AV.User.signUpOrlogInWithMobilePhone(Utils.formatPhone(phone, code), sms);
      const user = Actions.AV.User.current();
      user.setPassword(pwd);
      await Actions.setUserInfo({ hasPWD: true });
      store.signin(user.toJSON());
      // Actions.AV.Cloud.verifySmsCode(sms, Utils.formatPhone(phone, code));
    }
    next({});
  } catch (e) {
    Toast.info(e.rawMessage || '异常: P30');
  }
}
export default function Sms(props) {
  let store = useStore();
  const { authType, next } = props;
  const { phone, code, pwd } = props.authStatus;
  useEffect(() => {
    sendSmsCode(authType, { phone, code });
  }, [phone, code, authType]);

  const [sms, setSms] = useState('');
  return (
    <div>
      <CodeInput
        placeholder="输入短信验证码"
        value={sms}
        onChange={(value) => {
          setSms(value);
        }}
      />
      <Button
        type="primary"
        disabled={sms.length < 6}
        onClick={() => {
          verifySmsCode({
            authType,
            next,
            store,
            sms,
            phone,
            code,
            pwd,
          });
        }}
      >
        登录
      </Button>
    </div>
  );
}
