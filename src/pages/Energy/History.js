import React from 'react';
const columns = [
  {
    title: '日期',
    value: 'time',
  },
  {
    title: '有效算力/T',
    value: 'avaPower',
  },
  {
    title: '当日收益/XCH',
    value: 'profit',
  },
];
export default function History(props) {
  const { data } = props;
  return [
    <div className="history-list title" key="title">
      收益记录<span className="tip">(仅显示最近15天记录)</span>
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
          <div className="row">
            {columns.map((item) => {
              const { value } = item;
              return <span key={value}>{dataItem[value] || '-'}</span>;
            })}
          </div>
        );
      })}
    </div>,
  ];
}
