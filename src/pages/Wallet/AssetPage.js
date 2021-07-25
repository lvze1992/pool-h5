import React from 'react';
import _ from 'lodash';
export default function AssetPage(props) {
  let { data } = props;
  if (_.isEmpty(data)) {
    data = [
      {
        token: 'ETH',
        convert: '0',
        available: '0',
      },
      {
        token: 'XCH',
        convert: '0',
        available: '0',
      },
      {
        token: 'PHA',
        convert: '0',
        available: '0',
      },
    ];
  }
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
