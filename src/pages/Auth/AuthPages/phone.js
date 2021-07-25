import React, { useEffect, useState } from 'react';
import { Button, Picker, Toast } from 'antd-mobile';
import { loadAnimate, cancelAnimate } from 'src/imgs/animatebg/load';
import countries from '../location.json';
function renderActionButton({ code, phone, authType, setAuthType, next }) {
  if (authType === 'loginSms') {
    return (
      <div
        className="action-button"
        onClick={() => {
          if (phone.length < 8) {
            Toast.info('请输入正确的手机号');
            return;
          }
          setAuthType('loginPwd');
          next({
            code,
            phone,
          });
        }}
      >
        密码登录
      </div>
    );
  } else if (authType === 'loginPwd') {
    return (
      <div
        className="action-button"
        onClick={() => {
          if (phone.length < 8) {
            Toast.info('请输入正确的手机号');
            return;
          }
          setAuthType('loginSms');
          next({
            code,
            phone,
          });
        }}
      >
        验证码登录
      </div>
    );
  }
  return null;
}
export default function Phone(props) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('86_CN');
  useEffect(() => {
    loadAnimate();
    return function () {
      cancelAnimate();
    };
  }, []);
  const { setAuthType, authType, next } = props;
  return (
    <div>
      <div className="welcome-banner">
        <h1>你好，</h1>
        <h1>
          欢迎来到<span className="high-light">JL云矿</span>
        </h1>
      </div>
      <div className="input-box">
        <Picker
          data={countries.map(({ code, name, nationCode }) => {
            return {
              label: `+${code} ${name}(${nationCode})`,
              value: `${code}_${nationCode}`,
            };
          })}
          value={[code]}
          cols={1}
          onChange={(value) => {
            setCode(value[0]);
          }}
        >
          <span className="picker-value">
            +{code.split('_')[0]}
            <i className="iconfont icon-bottom" />
          </span>
        </Picker>
        <input
          className="custom-input"
          type="number"
          placeholder="请输入手机号"
          value={phone}
          onChange={(e) => {
            if (!phone && e.target.value) {
              window.bgAnimate && window.bgAnimate();
            }
            if (phone && !e.target.value) {
              window.bgCancelAnimate && window.bgCancelAnimate();
            }
            setPhone(e.target.value);
          }}
        />
      </div>
      <div className="tip">未注册的手机号验证后自动注册账户</div>
      <Button
        type="primary"
        disabled={phone.length < 8}
        onClick={async () => {
          props.next({
            code,
            phone,
          });
        }}
      >
        下一步
      </Button>
      {renderActionButton({ code, phone, authType, setAuthType, next })}
    </div>
  );
}
