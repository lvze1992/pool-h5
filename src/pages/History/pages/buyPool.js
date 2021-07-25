import React, { useState, useEffect } from 'react';
import Actions from 'src/actions';
import { Toast } from 'antd-mobile';
import { EmptyList } from 'src/components';
import _ from 'lodash';
import './buyPool.scss';
const title = '购买记录';
async function fetchData() {
  try {
    const chiaUserBuy = await Actions.getChiaUserBuy();
    return chiaUserBuy;
  } catch (e) {
    Toast.info(e.rawMessage || '异常：BP20');
    return [];
  }
}
function Comp() {
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    (async function () {
      const historyData = await fetchData();
      setHistoryData(historyData);
    })();
  }, []);
  return (
    <div className="scroll-list buyPool-history">
      {historyData.map((item, idx) => {
        const { name, buyPowerCost, buyPower, startDate, endDate } = item;
        return (
          <div key={idx} className="scroll-item">
            <div className="title">
              <span>{name || 'Chia云算力'}</span>
              <span>{`${buyPowerCost} USDT / ${buyPower} T`}</span>
            </div>
            <div className="line">
              <span>生效时间</span>
              <span>{startDate}</span>
            </div>
            <div className="line">
              <span>到期时间</span>
              <span>{endDate}</span>
            </div>
          </div>
        );
      })}
      {_.isEmpty(historyData) ? <EmptyList /> : null}
    </div>
  );
}
export { Comp, title };
