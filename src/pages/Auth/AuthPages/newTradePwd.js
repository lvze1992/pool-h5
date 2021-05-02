import React, { useState } from 'react';
import { Button } from 'antd-mobile';
export default function SetTradePwd(props) {
  const [tradePwd, setPwd] = useState('');
  const [tradePwd2, setPwd2] = useState('');
  return (
    <div>
      <div className="input-box">
        <input
          className="custom-input"
          type="password"
          placeholder="设置交易密码"
          value={tradePwd}
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        />
      </div>
      <div className="input-box">
        <input
          className="custom-input"
          type="password"
          placeholder="请再次输入交易密码"
          value={tradePwd2}
          onChange={(e) => {
            setPwd2(e.target.value);
          }}
        />
      </div>
      <Button
        type="primary"
        disabled={!(tradePwd.length === 6 && tradePwd === tradePwd2)}
        onClick={() => {
          props.next({
            tradePwd,
            tradePwd2,
          });
        }}
      >
        下一步
      </Button>
    </div>
  );
}
