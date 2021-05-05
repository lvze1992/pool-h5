import React, { useState, useEffect } from 'react';
import { CustomNav } from 'src/components';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import Utils from 'src/utils';
import { Toast } from 'antd-mobile';
import Actions from 'src/actions';
import Summary from './Summary';
import Tool from './Tool';
import AssetPage from './AssetPage';
import './Wallet.scss';
const summary = {
  total: '--',
  unit: 'USDT',
};
async function fetchData() {
  try {
    const chiaUserProfitList = await Actions.getChiaUserProfitList();
    return chiaUserProfitList;
  } catch (e) {
    Toast.info(e.rawMessage || '异常：W29');
    return [];
  }
}
function calcAssets(list) {
  const uniqList = _.uniqBy(list, function (o) {
    return o.chiaUserBuy.objectId;
  });
  const totalProfit = uniqList.reduce((pre, cur) => {
    return Utils.calc(`${pre} + ${cur.totalProfit}`);
  }, 0);
  return [{ available: totalProfit, token: 'XCH' }];
}
export default function Wallet() {
  const history = useHistory();
  const [assets, setAsset] = useState([]);
  useEffect(() => {
    (async function () {
      const historyData = await fetchData();
      const assets = calcAssets(historyData);
      setAsset(assets);
    })();
  }, []);
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
