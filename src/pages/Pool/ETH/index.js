import React from 'react';
import { Button, Toast } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import * as copy from 'copy-to-clipboard';
import { CustomNav } from 'src/components';
import Info from './Info';
import qrcode from '../../../imgs/qrcode.jpg';
import './pool.scss';
const data = {
  price: '22',
  priceUnit: 'U/M',
  weChat: 'ypdsh001',
};

async function buyPool() {
  Toast.info('微信号已复制，请前往微信联系客服咨询', 3);
}
export default function Pool(props) {
  const { poolId } = props;

  const history = useHistory();
  const { price, priceUnit, weChat } = data;
  return (
    <div className="pool-wrapper">
      <CustomNav
        title="JL云矿"
        rightContent={
          <div
            className="action-button"
            onClick={() => {
              history.push(`/history/buyPool/${poolId}`);
            }}
          >
            购买记录
          </div>
        }
      />
      <div className="body">
        <div className="banner">
          <h1>做以太坊的主人，买不如挖</h1>
          <h3>Nvidia 3060Ti 8卡服务器，功耗低、算力强</h3>
          <h3>ETH转POS后，支持其他币种挖矿，灵活高效</h3>
        </div>
        <div className="box-list">
          <div className="box">
            <span>
              {price}
              {priceUnit}
            </span>
            <span>全网低价</span>
          </div>
          <div className="box">
            <span>720天</span>
            <span>服务周期长</span>
          </div>
          <div className="box">
            <span>快速上架</span>
            <span>闪电挖矿</span>
          </div>
        </div>
        <div className="price-box">
          <span className="price-key">算力单价</span>
          <span className="price-value">
            220
            <span className="unit">USDT/10M</span>
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
      <div className="bottom-action">
        <Button
          type="primary"
          onClick={() => {
            history.push(`/energy/${poolId}`);
          }}
        >
          我的算力
        </Button>
      </div>
    </div>
  );
}
