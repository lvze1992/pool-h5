import React from 'react';
import Utils from 'src/utils';
const columns = [
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
export default function History(props) {
  const { data } = props;
  return [
    <div className="history-list title" key="title">
      收益记录<span className="tip"></span>
    </div>,
    <div className="history-list row theader" key="theader">
      {columns.map((item) => {
        const { value, title } = item;
        return <span key={value}>{title}</span>;
      })}
    </div>,
    <div className="history-list tbody" key="tbody">
      {data.map((dataItem, idx) => {
        return (
          <div className="row" key={idx}>
            {columns.map((item) => {
              const { value, render } = item;
              return <span key={value}>{render ? render(dataItem[value]) : dataItem[value] || '-'}</span>;
            })}
          </div>
        );
      })}
    </div>,
  ];
}
