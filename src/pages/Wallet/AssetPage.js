import React from 'react';
export default function AssetPage(props) {
  const { data } = props;
  return (
    <div className="asset-page">
      {data.map((item, idx) => {
        const { convert, available, token } = item;
        return (
          <div className="asset-item" key={idx}>
            <div className="token">{token}</div>
            <div className="header">
              <span>可用</span>
              <span>折合(USDT)</span>
            </div>
            <div className="value">
              <span>{available}</span>
              <span>{convert}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
