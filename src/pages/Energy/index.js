import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import Actions from 'src/actions';
import Utils from 'src/utils';
import Summary from './Summary';
import History from './History';
import { CustomNav } from 'src/components';
import './Summary.scss';
function calcSummary(list) {
  const uniqList = _.uniqBy(list, function (o) {
    return o.chiaUserBuy.objectId;
  });
  const totalProfit = uniqList.reduce((pre, cur) => {
    return Utils.calc(`${pre} + ${cur.totalProfit}`);
  }, 0);
  const availablePower = uniqList.reduce((pre, cur) => {
    return Utils.calc(`${pre} + ${cur.availablePower}`);
  }, 0);
  const waitpPower = uniqList.reduce((pre, cur) => {
    return Utils.calc(`${pre} + ${cur.waitpPower}`);
  }, 0);
  return { totalProfit, availablePower, waitpPower };
}
async function fetchData() {
  try {
    const chiaUserProfitList = await Actions.getChiaUserProfitList();
    return chiaUserProfitList;
  } catch (e) {
    Toast.info(e.rawMessage || '异常：E31');
    return [];
  }
}
export default function Energy(props) {
  const history = useHistory();
  const [historyData, setHistoryData] = useState([]);
  const [summary, setSummary] = useState({});
  useEffect(() => {
    (async function () {
      const historyData = await fetchData();
      const summary = calcSummary(historyData);
      setHistoryData(historyData);
      setSummary(summary);
    })();
  }, []);
  return (
    <div className="energy-page">
      <CustomNav
        title="加零云矿"
        rightContent={
          <div
            className="action-button"
            onClick={() => {
              history.push('/history/buyPool');
            }}
          >
            购买记录
          </div>
        }
        icon={null}
      />
      <Summary data={summary} />
      <History data={historyData} />
    </div>
  );
}
