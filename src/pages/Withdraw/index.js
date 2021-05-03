import React, { useState } from 'react';
import { Button } from 'antd-mobile';
import { CustomNav } from 'src/components';
import './Withdraw.scss';
const data = {
  token: 'XCH',
  available: '23.23',
};
export default function Withdraw() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const { token, available } = data;

  return (
    <div className="withdraw-page">
      <CustomNav title="提币" />
      <div className="withdraw-container">
        <div className="title">
          <span>提币币种</span>
          <span>{token}</span>
        </div>
        <div className="title">
          <span>提币地址</span>
        </div>
        <div className="input-box">
          <input
            className="custom-input"
            placeholder="输入或长按粘贴地址"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div className="title">
          <span>提币数量</span>
        </div>
        <div className="input-box">
          <input
            type="number"
            className="custom-input"
            placeholder="输入或长按粘贴地址"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <div className="action-button">全部</div>
        </div>
        <div className="available-tip">
          <span>{`可用: ${available}`}</span>
        </div>
        <div className="title">
          <span>手续费</span>
        </div>
        <div className="fee-box">
          <span>0</span>
          <span>XCH</span>
        </div>
        <div className="tip">提币处理时间为每日9:00-23:00，请耐心等待</div>
        <Button type="primary">提币</Button>
      </div>
    </div>
  );
}
