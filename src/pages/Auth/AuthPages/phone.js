import React, { useState } from 'react';
import { Button } from 'antd-mobile';
import * as authActions from './authActions';
export default function Phone(props) {
  const [phone, setPhone] = useState('');
  return (
    <div>
      <input
        className="custom-input"
        type="number"
        placeholder='请输入手机号'
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      <Button
        type="primary"
        disabled={phone.length < 8}
        onClick={async () => {
          const useCheck = await authActions.passwordCheck(phone);
          props.next({
            phone,
            useCheck,
          });
        }}
      >
        下一步
      </Button>
    </div>
  );
}
