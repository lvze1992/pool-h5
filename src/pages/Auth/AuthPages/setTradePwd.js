import React, { useState } from 'react';
import { Button } from 'antd-mobile';
export default function SetTradePwd(props) {
  const [tradePwd, setPwd] = useState('');
  return (
    <div>
      <input
        className="custom-input"
        type="password"
        placeholder='设置交易密码'
        value={tradePwd}
        onChange={(e) => {
          setPwd(e.target.value);
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
