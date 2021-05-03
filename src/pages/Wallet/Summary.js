import React from 'react';
export default function Summary(props) {
  const { data } = props;
  const { total, unit } = data;
  return (
    <div className="summary-page">
      <div className="title">账户总资产</div>
      <div className="value">
        {total}
        <span className="unit">{unit}</span>
      </div>
    </div>
  );
}
