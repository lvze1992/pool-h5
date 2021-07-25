import React from 'react';
import Utils from 'src/utils';
const UnitMap = {
  CHIA: {
    totalProfit: '累计挖矿净收益/XCH',
    availablePower: '有效算力/T',
    waitpPower: '待P盘算力/T',
  },
  ETH: {
    totalProfit: '累计挖矿净收益/ETH',
    availablePower: '总算力/M',
    waitpPower: '待提取收益/ETH',
  },
};
export default function Summary(props) {
  const { data, poolId } = props;
  const { totalProfit, availablePower, waitpPower } = data;
  const labels = UnitMap[poolId];
  return (
    <div className="summary-page">
      <div className="box">
        <span className="value bigger">{totalProfit}</span>
        <span className="key">{labels.totalProfit}</span>
      </div>
      <div className="line">
        <div className="box">
          <span className="value">{availablePower ? Utils.cutNumber(availablePower, 6) : '-'}</span>
          <span className="key">{labels.availablePower}</span>
        </div>
        <div className="box">
          <span className="value">{waitpPower ? Utils.cutNumber(waitpPower, 6) : '-'}</span>
          <span className="key">{labels.waitpPower}</span>
        </div>
      </div>
    </div>
  );
}
