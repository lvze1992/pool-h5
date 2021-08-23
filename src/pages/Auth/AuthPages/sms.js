import React, { useState, useEffect } from 'react';
import { Button, Toast } from 'antd-mobile';
import Actions from 'src/actions';
import Utils from 'src/utils';
import { useStore } from 'src/Provider';
import { CodeInput } from '../../../components';
let timer = null;
let safeTimer = null;
async function sendSmsCode({ authType, phone, code, setRemain }) {
  try {
    if (['loginSms', 'loginPwd', 'modifyPwd', 'modifyTradePwd', 'tradeAuth'].includes(authType)) {
      if(safeTimer){
        return;
      }
      safeTimer = setTimeout(()=>{
        safeTimer = null;
      }, 9000);
      await Actions.AV.Cloud.requestSmsCode(phone ? Utils.formatPhone(phone, code) : Actions.AV.User.current().get('mobilePhoneNumber'));
    }
    setRemain(60);
    clearInterval(timer);
    timer = setInterval(() => {
      setRemain((pre) => {
        if (pre <= 0) {
          clearInterval(timer);
        }
        return pre - 1;
      });
    }, 1000);
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
    } else {
      const user = await Actions.getUserInfo();
      await Actions.AV.Cloud.verifySmsCode(sms, user.phone);
    }
    next({});
  } catch (e) {
    Toast.info(e.rawMessage || '异常: P30');
  }
}
export default function Sms(props) {
  let store = useStore();
  const [remainSeconds, setRemain] = useState(-1);
  const { authType, next } = props;
  const { phone, code, pwd } = props.authStatus;
  useEffect(() => {
    sendSmsCode({ authType, phone, code, setRemain });
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
      <div className="sms-tip">
        {remainSeconds > 0 ? (
          <div>
            <span className="second">{remainSeconds}</span>秒后重新发送验证码
          </div>
        ) : (
          <div
            className="reset-sms"
            onClick={() => {
              sendSmsCode({ authType, phone, code, setRemain });
            }}
          >
            点击发送验证码
          </div>
        )}
      </div>
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
        {authType.includes('login') ? '登录' : '确定'}
      </Button>
    </div>
  );
}
