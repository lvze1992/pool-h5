import React, { useState, useEffect } from 'react';
import { CustomNav } from 'src/components';
import { useStore } from 'src/Provider';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import Utils from 'src/utils';
import { Toast } from 'antd-mobile';
import Actions from 'src/actions';
import Summary from './Summary';
import Tool from './Tool';
import AssetPage from './AssetPage';
import './Wallet.scss';
async function fetchData(price) {
  try {
    const assetList = await Actions.getUserAssetList();
    const asset = Utils.calcAssetSummary(assetList);
    const assetsList = Object.keys(asset).map((i) => {
      const { available, token } = asset[i];
      const priceConvert = parseFloat(price[token]);
      return {
        available,
        token,
        convert: priceConvert ? Utils.calc(`${available} * ${priceConvert}`) : '-',
      };
    });
    const total = assetsList.reduce((pre, { convert }) => {
      return _.isNaN(+convert) ? '-' : Utils.calc(`${convert} + ${pre}`);
    }, 0);
    return {
      assetsList,
      summary: {
        total,
        unit: 'USDT',
      },
    };
  } catch (e) {
    Toast.info(e.rawMessage || '异常：W29');
    return [];
  }
}
export default function Wallet() {
  const history = useHistory();
  const store = useStore();
  const [assets, setAsset] = useState([]);
  const [summary, setSummary] = useState({});
  useEffect(() => {
    (async function () {
      const { assetsList, summary } = await fetchData(store.price);
      setAsset(assetsList);
      setSummary(summary);
    })();
  }, [store.price]);

  return (
    <div className="wallet-wrapper">
      <CustomNav title="JL云矿" icon={null} />
      <Summary data={summary} />
      <Tool />
      <AssetPage data={assets} />
    </div>
  );
}
