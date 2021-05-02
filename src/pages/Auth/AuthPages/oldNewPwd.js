import React, { useState } from 'react';
import { Button } from 'antd-mobile';
export default function Password(props) {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [newPwd2, setNewPwd2] = useState('');
  return (
    <div>
      <input
        className="custom-input"
        type="password"
        placeholder="请输入原登录密码"
        value={oldPwd}
        onChange={(e) => {
          setOldPwd(e.target.value);
        }}
      />
      <input
        className="custom-input"
        type="password"
        placeholder="请输入新登录密码"
        value={newPwd}
        onChange={(e) => {
          setNewPwd(e.target.value);
        }}
      />
      <input
        className="custom-input"
        type="password"
        placeholder="请再次输入新登录密码"
        value={newPwd2}
        onChange={(e) => {
          setNewPwd2(e.target.value);
        }}
      />
      <Button
        type="primary"
        disabled={!(newPwd === newPwd2 && oldPwd.length >= 8 && newPwd.length >= 8)}
        onClick={() => {
          props.next({
            oldPwd,
            newPwd,
            newPwd2,
          });
        }}
      >
        下一步
      </Button>
    </div>
  );
}
