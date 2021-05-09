import React from 'react';
import Utils from 'src/utils';

export default function Summary(props) {
  const { data } = props;
  const { totalProfit, availablePower, waitpPower } = data;
  return (
    <div className="summary-page">
      <div className="box">
        <span className="value bigger">{totalProfit}</span>
        <span className="key">累计挖矿净收益/XCH</span>
      </div>
      <div className="line">
        <div className="box">
          <span className="value">{availablePower ? Utils.cutNumber(availablePower, 6) : '-'}</span>
          <span className="key">有效算力/T</span>
        </div>
        <div className="box">
          <span className="value">{waitpPower ? Utils.cutNumber(waitpPower, 6) : '-'}</span>
          <span className="key">待P盘算力/T</span>
        </div>
      </div>
    </div>
  );
}
