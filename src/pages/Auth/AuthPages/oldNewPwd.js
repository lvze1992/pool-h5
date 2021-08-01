import React, { useState } from 'react';
import Actions from 'src/actions';
import { Button, Toast } from 'antd-mobile';
async function checkPwd({ oldPwd, newPwd, newPwd2, next }) {
  try {
    await Actions.AV.User.logIn(Actions.AV.User.current().get('mobilePhoneNumber'), oldPwd);
    next({
      oldPwd,
      newPwd,
      newPwd2,
    });
  } catch (e) {
    Toast.info(e.rawMessage || '旧密码错误');
  }
}
export default function Password(props) {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [newPwd2, setNewPwd2] = useState('');
  const { next } = props;
  return (
    <div>
      <div className="input-box">
        <input
          className="custom-input"
          type="password"
          placeholder="请输入原登录密码"
          value={oldPwd}
          onChange={(e) => {
            setOldPwd(e.target.value);
          }}
        />
      </div>
      <div className="input-box">
        <input
          className="custom-input"
          type="password"
          placeholder="请输入新登录密码"
          value={newPwd}
          onChange={(e) => {
            setNewPwd(e.target.value);
          }}
        />
      </div>
      <div className="input-box">
        <input
          className="custom-input"
          type="password"
          placeholder="请再次输入新登录密码"
          value={newPwd2}
          onChange={(e) => {
            setNewPwd2(e.target.value);
          }}
        />
      </div>
      <Button
        type="primary"
        onClick={async () => {
          if (!oldPwd || oldPwd.length < 8) {
            Toast.info('请输入旧密码');
            return;
          }
          if (!newPwd || newPwd.length < 8) {
            Toast.info('请输入新密码，至少8位');
            return;
          }
          if (newPwd !== newPwd2) {
            Toast.info('新密码2次输入不一致');
            return;
          }
          checkPwd({ oldPwd, newPwd, newPwd2, next });
        }}
      >
        下一步
      </Button>
    </div>
  );
}
