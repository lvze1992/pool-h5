import React, { useState } from 'react';
import { Button } from 'antd-mobile';
import { CodeInput } from '../../../components';
export default function TradePwd(props) {
  const [tradePwd, setPwd] = useState('');
  return (
    <div>
      <CodeInput
        placeholder="输入交易密码"
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
        确认
      </Button>
    </div>
  );
}
