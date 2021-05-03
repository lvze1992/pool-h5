import React from 'react';
import { useHistory } from 'react-router-dom';
import { CustomNav } from 'src/components';
import './Setting.scss';
const user = {
  phone: '3434222',
};
export default function Setting() {
  const history = useHistory();
  const { phone } = user;
  return (
    <div className="setting-page">
      <CustomNav title="设置" />
      <div className="user">
        <i className="iconfont icon-subscriber-square" />
        <span>{phone}</span>
      </div>
      <div
        className="item"
        onClick={() => {
          history.push('/auth', {
            authType: 'modifyTradePwd',
          });
        }}
      >
        <span>修改交易密码</span>
        <i className="iconfont icon-right" />
      </div>
      <div
        className="item"
        onClick={() => {
          history.push('/auth', {
            authType: 'modifyPwd',
          });
        }}
      >
        <span>修改登录密码</span>
        <i className="iconfont icon-right" />
      </div>
    </div>
  );
}
