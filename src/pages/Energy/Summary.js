import React from 'react';
import Utils from 'src/utils';
import { Button } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
const UnitMap = {
  CHIA: [
    {
      key: 'totalProfit',
      label: '累计挖矿净收益/XCH',
    },
    {
      key: 'availablePower',
      label: '有效算力/T',
    },
    {
      key: 'waitpPower',
      label: '待P盘算力/T',
    },
  ],
  ETH: [
    {
      key: 'totalProfit',
      label: '累计挖矿净收益/ETH',
    },
    {
      key: 'availablePower',
      label: '总算力/M',
    },
    {
      key: 'perMProfit',
      label: '单M收益/ETH',
      render: (history) => {
        return (
          <Button
            type="primary"
            size="small"
            style={{
              fontSize: '12px',
              position: 'relative',
              top: '10px',
            }}
            onClick={() => {
              history.push('/wallet');
            }}
          >
            提取收益
          </Button>
        );
      },
    },
  ],
};
export default function Summary(props) {
  const { data, poolId } = props;
  const history = useHistory();
  const columns = UnitMap[poolId];
  return (
    <div className="summary-page">
      <div className="box">
        <span className="value bigger">{data[columns[0].key]}</span>
        <span className="key">{columns[0].label}</span>
      </div>
      <div className="line">
        <div className="box">
          <span className="value">{data[columns[1].key] ? Utils.cutNumber(data[columns[1].key], 6) : '-'}</span>
          <span className="key">{columns[1].label}</span>
        </div>
        {columns[2].render ? (
          columns[2].render(history)
        ) : (
          <div className="box">
            <span className="value">{data[columns[2].key] ? Utils.cutNumber(data[columns[2].key], 6) : '-'}</span>
            <span className="key">{columns[2].label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
