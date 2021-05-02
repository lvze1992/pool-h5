import React, { useState } from 'react';
import { Button } from 'antd-mobile';
export default function Password(props) {
  const [pwd, setPwd] = useState('');
  return (
    <div>
      <input
        className="custom-input"
        type="password"
        placeholder='输入登录密码'
        value={pwd}
        onChange={(e) => {
          setPwd(e.target.value);
        }}
      />
      <Button
        type="primary"
        disabled={pwd.length < 8}
        onClick={() => {
          props.next({
            pwd,
          });
        }}
      >
        下一步
      </Button>
    </div>
  );
}
