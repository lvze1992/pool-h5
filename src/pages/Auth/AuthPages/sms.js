import React, { useState } from 'react';
import { Button } from 'antd-mobile';
export default function Sms(props) {
  const [sms, setSms] = useState('');
  return (
    <div>
      <div className="input-box">
        <input
          className="custom-input"
          type="number"
          placeholder="输入短信验证码"
          maxLength="6"
          value={sms}
          onChange={(e) => {
            setSms(e.target.value);
          }}
        />
      </div>
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
