import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import * as AuthPages from './AuthPages';
import { CustomNav } from '../../components';
import './Auth.scss';

/**
 * 验证码登录
 * Phone【下一步】=> 验证码 => （如未设置）=> 设置登录密码 => 登录成功
 *                            => 登录成功
 * 密码登录
 * Phone【下一步】=> （如未设置）=> 设置登录密码 => 验证码 => 登录成功
 *                  => 登录密码 => 登录成功
 * 交易检查
 * (未设置交易密码) => 设置交易密码 => 验证码 => 设置成功
 *                => 输入交易密码 => 验证成功
 *
 */
const authConfigs = {
  loginSms: ['phone', 'sms', 'passwordCheck', { 0: ['setPassword', 'login'], 1: ['login'] }],
  loginPwd: ['phone', 'passwordCheck', { 0: ['setPassword', 'sms', 'login'], 1: ['password', 'login'] }],
  tradeAuth: ['tradePwdCheck', { 0: ['setTradePwd', 'sms', 'tradeAuth'], 1: ['tradePwd', 'tradeAuth'] }],
  modifyPwd: ['oldNewPwd', 'sms', 'modifyPwd'],
  modifyTradePwd: ['newTradePwd', 'sms', 'modifyTradePwd'],
};
function useAuthStatus(authConfig) {
  const [authStatus, setAuthStatus] = useState({ result: false });
  const [step, setNext] = useState('0');
  const authAction = _.get(authConfig, step);
  const authActionCache = useRef();
  const preAction = authActionCache.current;
  authActionCache.current = authAction;
  return {
    authStatus,
    authAction,
    preAction,
    next: ({ useCheck, ...preAuthResult }) => {
      setAuthStatus({ ...authStatus, ...preAuthResult });
      let nextStep = [step.split('.').slice(0, -1), +step.split('.').slice(-1) + 1];
      if (useCheck) {
        nextStep.push(useCheck, 0);
      }
      setNext([].concat(...nextStep).join('.'));
    },
  };
}
export default function Auth(props) {
  const history = useHistory();
  const location = useLocation();
  const [authType, setAuthType] = useState(location.state.authType || 'loginPwd');
  const authConfig = authConfigs[authType];
  const { authStatus, authAction, next } = useAuthStatus(authConfig);
  useEffect(() => {
    if (authStatus.result) {
      //校验通过，跳回原页面 & 回调
      history.replace(_.get(location, 'state.from', '/'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus.result]);
  const Comp = AuthPages[authAction];

  return (
    <div className="auth-page">
      <CustomNav
        onLeftClick={() => {
          history.replace('/');
        }}
      />
      <div className="auth-container">{!!Comp ? <Comp next={next} authStatus={authStatus} authConfig={authConfig} authType={authType} setAuthType={setAuthType} /> : null}</div>
    </div>
  );
}
