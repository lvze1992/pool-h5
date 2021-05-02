import React, { useState } from 'react';
import { Button } from 'antd-mobile';
import { CodeInput } from '../../../components';
export default function Sms(props) {
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
          props.next({
            sms,
          });
        }}
      >
        登录
      </Button>
    </div>
  );
}
