import React, { Component } from 'react';
import './pool.scss';
const data = {
  price: '80',
};
export default class Pool extends Component {
  render() {
    const { price } = data;
    return (
      <div className="pool-wrapper">
        <div className="banner">
          <h1>CHIA 奇亚币挖矿</h1>
          <h3>全新中本聪共识+BitTorrent创始人+A16z投资</h3>
          <h3>绿色的类比特币公链，P盘周期短</h3>
        </div>
        <div className="box-list">
          <div className="box">
            <span>80U/T</span>
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
      </div>
    );
  }
}
