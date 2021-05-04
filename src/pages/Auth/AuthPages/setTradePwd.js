import React, { useState } from 'react';
import { Button } from 'antd-mobile';
import { CodeInput } from '../../../components';
export default function SetTradePwd(props) {
  const [tradePwd, setPwd] = useState('');
  return (
    <div>
      <CodeInput
        type="password"
        placeholder="设置交易密码"
        value={tradePwd}
        onChange={(value) => {
          setPwd(value);
        }}
      />
      <Button
        type="primary"
        disabled={tradePwd.length < 6}
        onClick={() => {
          props.next({
            tradePwd,
          });
        }}
      >
        下一步
      </Button>
    </div>
  );
}
