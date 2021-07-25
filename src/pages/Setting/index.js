import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd-mobile';
import { CustomNav } from 'src/components';
import { useStore } from 'src/Provider';

import './Setting.scss';
export default function Setting() {
  const history = useHistory();
  let store = useStore();
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="setting-page">
      <CustomNav title="设置" icon={null} />
      <div className="user">
        <i className="iconfont icon-subscriber-square" />
        <span>{store.user.username}</span>
      </div>
      <div
        className="item"
        onClick={() => {
          history.push('/auth', {
            authType: 'modifyTradePwd',
            backPage: '/setting',
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
            backPage: '/setting',
          });
        }}
      >
        <span>修改登录密码</span>
        <i className="iconfont icon-right" />
      </div>
      <Button
        type="ghost"
        size="small"
        onClick={() => {
          store.signout();
        }}
      >
        退出登录
      </Button>
    </div>
  );
}
