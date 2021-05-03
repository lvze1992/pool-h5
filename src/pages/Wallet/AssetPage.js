import React from 'react';
export default function AssetPage(props) {
  const { data } = props;
  return (
    <div className="asset-page">
      {data.map((item, idx) => {
        const { token, available } = item;
        return (
          <div className="asset-item">
            <div className="token">{token}</div>
            <div className="header">
              <span>可用</span>
              <span>折合</span>
            </div>
            <div className="value">
              <span>{available}</span>
              <span>-</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
