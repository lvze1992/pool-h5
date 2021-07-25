import _ from 'lodash';
import React from 'react';
import Utils from 'src/utils';
import { EmptyList } from 'src/components';
const ChiaColumns = [
  {
    title: '日期',
    value: 'date',
  },
  {
    title: '有效算力/T',
    value: 'availablePower',
    render: (v) => {
      return Utils.cutNumber(v, 6);
    },
  },
  {
    title: '当日收益/XCH',
    value: 'todayProfit',
    render: (v) => {
      return Utils.cutNumber(v, 6);
    },
  },
];
const EthColumns = [
  {
    title: '日期',
    value: 'date',
  },
  {
    title: '当日算力/M',
    value: 'availablePower',
    render: (v) => {
      return Utils.cutNumber(v, 6);
    },
  },
  {
    title: '当日收益/ETH',
    value: 'todayProfit',
    render: (v) => {
      return Utils.cutNumber(v, 6);
    },
  },
];
const ColumnsMap = {
  CHIA: ChiaColumns,
  ETH: EthColumns,
};
export default function History(props) {
  const { data, poolId } = props;
  return [
    <div className="history-list title" key="title">
      收益记录<span className="tip"></span>
    </div>,
    <div className="history-list row theader" key="theader">
      {ColumnsMap[poolId].map((item) => {
        const { value, title } = item;
        return <span key={value}>{title}</span>;
      })}
    </div>,
    <div className="history-list tbody" key="tbody">
      {data.map((dataItem, idx) => {
        return (
          <div className="row" key={idx}>
            {ColumnsMap[poolId].map((item) => {
              const { value, render } = item;
              return <span key={value}>{render ? render(dataItem[value]) : dataItem[value] || '-'}</span>;
            })}
          </div>
        );
      })}
      {_.isEmpty(data) ? <EmptyList /> : null}
    </div>,
  ];
}
