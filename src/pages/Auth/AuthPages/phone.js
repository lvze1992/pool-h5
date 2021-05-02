import React, { useState } from 'react';
import { Button, Picker } from 'antd-mobile';
import countries from '../location.json';
export default function Phone(props) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('86_CN');

  return (
    <div>
      <div className="welcome-banner">
        <h1>你好，</h1>
        <h1>
          欢迎来到<span className="high-light">加零云矿</span>
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
    </div>
  );
}
