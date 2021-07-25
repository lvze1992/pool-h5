import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd-mobile';
import _ from 'lodash';
import './pool.scss';
import CHIA from './CHIA';
import ETH from './ETH';
const poolPages = { CHIA, ETH };

const poolList = [
  {
    name: 'ETH云算力一期',
    profitRate: '70%-310%',
    icon: [<i className="iconfont icon-huo" />],
    price: '22',
    priceUnit: 'USDT/M',
    id: 'ETH',
  },
  {
    name: 'CHIA云算力一期',
    profitRate: '5%-2100%',
    price: '80',
    priceUnit: 'USDT/T',
    id: 'CHIA',
  },
];
export default function Pool(props) {
  const history = useHistory();
  const poolId = _.get(props, 'match.params.id');
  if (poolId && poolPages[poolId]) {
    const CompPage = poolPages[poolId];
    return <CompPage />;
  }
  return (
    <div className="pool-list">
      {poolList.map((item, idx) => {
        const { name, icon, profitRate, price, priceUnit, id } = item;
        return (
          <div className="pool-item" key={id}>
            <div className="header">
              <div className="title">{name}</div>
              <div className="icons">{icon}</div>
            </div>
            <div className="body">
              <div className="box">
                <div className="key">预估收益率</div>
                <div className="value">
                  <span className="rate">{profitRate}</span>
                </div>
              </div>
              <div className="box">
                <div className="key">价格</div>
                <div className="value">
                  <span className="price">{price}</span>
                  <span className="unit">{priceUnit}</span>
                </div>
              </div>
            </div>
            <div className="action">
              <Button
                type="ghost"
                onClick={() => {
                  history.push(`/energy/${id}`);
                }}
              >
                我的算力
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  history.push(`/pool/${id}`);
                }}
              >
                立即挖矿
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
