import React from 'react';
import { CustomNav } from 'src/components';
import { useHistory } from 'react-router-dom';
import Summary from './Summary';
import Tool from './Tool';
import AssetPage from './AssetPage';
import './Wallet.scss';
const summary = {
  total: '222',
  unit: 'USDT',
};
const assets = [
  {
    token: 'USDT',
    available: '23.3',
  },
  {
    token: 'XCH',
    available: '123.3',
  },
];
export default function Wallet() {
  const history = useHistory();
  return (
    <div className="wallet-wrapper">
      <CustomNav
        title="加零云矿"
        icon={null}
        rightContent={
          <i
            className="iconfont icon-shezhi"
            onClick={() => {
              history.push('/setting');
            }}
          />
        }
      />
      <Summary data={summary} />
      <Tool />
      <AssetPage data={assets} />
    </div>
  );
}
