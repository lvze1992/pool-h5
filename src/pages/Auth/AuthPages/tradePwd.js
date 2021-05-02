import React, { useState } from 'react';
import { Button } from 'antd-mobile';
export default function TradePwd(props) {
  const [tradePwd, setPwd] = useState('');
  return (
    <div>
      <div className="input-box">
        <input
          className="custom-input"
          type="password"
          placeholder="输入交易密码"
          value={tradePwd}
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        />
      </div>
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
