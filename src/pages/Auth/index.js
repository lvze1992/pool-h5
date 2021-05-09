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
const titleMap = {
  loginSms: '验证码登录',
  loginPwd: '密码登录',
  tradeAuth: '交易密码验证',
  modifyPwd: '修改登录密码',
  modifyTradePwd: '修改交易密码',
};
const authConfigs = {
  loginSms: ['phone', 'sms', '_passwordCheck', { 0: ['setPassword', '_login'], 1: ['_login'] }],
  loginPwd: ['phone', '_passwordCheck', { 0: ['setPassword', 'sms', '_login'], 1: ['password', '_login'] }],
  tradeAuth: ['_tradePwdCheck', { 0: ['setTradePwd', 'sms', '_modifyTradePwd', 'tradePwd', '_tradeAuth'], 1: ['tradePwd', '_tradeAuth'] }],
  modifyPwd: ['oldNewPwd', 'sms', '_modifyPwd'],
  modifyTradePwd: ['newTradePwd', 'sms', '_modifyTradePwd'],
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
    pre: () => {
      let lastPoint = Number(step.split('.').slice(-1)[0]) - 1;
      let preStep = lastPoint >= 0 ? [...step.split('.').slice(0, -1), lastPoint].join('.') : step.split('.').slice(0, -1).join('.');
      while (_.get(authConfig, preStep).includes('_') && Number(preStep) !== 0) {
        lastPoint = Number(preStep.split('.').slice(-1)[0]) - 1;
        preStep = lastPoint >= 0 ? [...preStep.split('.').slice(0, -1), lastPoint].join('.') : preStep.split('.').slice(0, -1).join('.');
      }
      setNext(preStep);
    },
  };
}
export default function Auth(props) {
  const history = useHistory();
  const location = useLocation();
  const [authType, setAuthType] = useState(_.get(location.state, 'authType') || 'loginSms');
  const authConfig = authConfigs[authType];
  const { authStatus, authAction, next, pre } = useAuthStatus(authConfig);
  useEffect(() => {
    if (authStatus.result) {
      //校验通过，跳回原页面 & 回调
      history.replace(_.get(location, 'state.to') || _.get(location, 'state.from', '/'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus.result]);
  const Comp = AuthPages[authAction];

  return (
    <div className="auth-page">
      <CustomNav
        title={titleMap[authType]}
        onLeftClick={() => {
          const callback = _.get(location.state, 'callback');
          callback ? callback() : history.replace('/');
        }}
      />
      <div className="auth-container">{!!Comp ? <Comp next={next} pre={pre} authStatus={authStatus} authConfig={authConfig} authType={authType} setAuthType={setAuthType} /> : null}</div>
    </div>
  );
}
