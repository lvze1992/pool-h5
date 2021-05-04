import React, { useState } from 'react';
import { Button, Toast } from 'antd-mobile';
import Actions from 'src/actions';
async function setPassword({ pwd, next, authType }) {
  try {
    if (authType === 'loginSms') {
      const user = Actions.AV.User.current();
      user.setPassword(pwd);
      await Actions.setUserInfo({ hasPWD: true });
      next({
        pwd,
      });
    } else if (authType === 'loginPwd') {
      next({
        pwd,
      });
    }
  } catch (e) {
    Toast.info(e.rawMessage || '异常: SP19');
  }
}
export default function SetPassword(props) {
  const [pwd, setPwd] = useState('');
  const { next, authType } = props;
  return (
    <div>
      <div className="input-box">
        <input
          className="custom-input"
          type="password"
          placeholder="设置登录密码"
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        />
      </div>
      <Button
        type="primary"
        disabled={pwd.length < 8}
        onClick={async () => {
          await setPassword({ pwd, next, authType });
        }}
      >
        下一步
      </Button>
    </div>
  );
}
