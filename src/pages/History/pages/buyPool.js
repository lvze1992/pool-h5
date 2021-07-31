import React, { useState, useEffect } from 'react';
import Actions from 'src/actions';
import { Toast } from 'antd-mobile';
import { EmptyList } from 'src/components';
import _ from 'lodash';
import './buyPool.scss';
const title = '购买记录';
async function fetchData(poolId) {
  try {
    if (poolId === 'CHIA') {
      const chiaUserBuy = await Actions.getChiaUserBuy();
      return chiaUserBuy;
    } else if (poolId === 'ETH') {
      const chiaUserBuy = await Actions.getEthUserBuy();
      return chiaUserBuy;
    }
  } catch (e) {
    Toast.info(e.rawMessage || '异常：BP20');
    return [];
  }
}
function Comp({ poolId }) {
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    (async function () {
      const historyData = await fetchData(poolId);
      setHistoryData(historyData);
    })();
  }, []);

  return (
    <div className="scroll-list buyPool-history">
      {historyData.map((item, idx) => {
        const { work, buyPowerCost, buyPower, startDate, endDate } = item;
        return (
          <div key={idx} className="scroll-item">
            <div className="title">
              <span>{work && work.name}</span>
              <span>{`${buyPowerCost} USDT / ${buyPower} ${work && work.powerUnit}`}</span>
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
