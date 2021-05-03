import React from 'react';
import { Button, Toast } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import * as copy from 'copy-to-clipboard';
import { CustomNav } from 'src/components';
import Info from './Info';
import qrcode from '../../imgs/qrcode.png';
import './pool.scss';
const data = {
  price: '80',
  weChat: 'xxxxx',
};

async function buyPool() {
  Toast.info('微信号已复制，请前往微信联系客服咨询', 3);
}
export default function Pool() {
  const history = useHistory();
  const { price, weChat } = data;
  return (
    <div className="pool-wrapper">
      <CustomNav
        title="加零云矿"
        icon={null}
        rightContent={
          <div
            className="action-button"
            onClick={() => {
              history.push('/history/buyPool');
            }}
          >
            购买记录
          </div>
        }
      />
      <div className="banner">
        <h1>CHIA 奇亚币挖矿</h1>
        <h3>全新中本聪共识+BitTorrent创始人+A16z投资</h3>
        <h3>绿色的类比特币公链，P盘周期短</h3>
      </div>
      <div className="box-list">
        <div className="box">
          <span>{price}U/T</span>
          <span>全网低价</span>
        </div>
        <div className="box">
          <span>540天</span>
          <span>服务周期长</span>
        </div>
        <div className="box">
          <span>快速上架</span>
          <span>闪电P盘</span>
        </div>
      </div>
      <div className="price-box">
        <span className="price-key">算力单价</span>
        <span className="price-value">
          {price}
          <span className="unit">USDT/T</span>
        </span>
        <Button
          type="primary"
          onClick={() => {
            copy(weChat);
            buyPool();
          }}
        >
          立即购买
        </Button>
      </div>
      <div className="qrcode">
        <img src={qrcode} alt="qrcode" />
        <p>客服微信: {weChat}</p>
      </div>
      <Info />
    </div>
  );
}
