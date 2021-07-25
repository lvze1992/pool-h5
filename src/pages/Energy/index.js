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
function calcMergeDay(historyData) {
  const merged = historyData.reduce((pre, { date, availablePower, todayProfit }) => {
    if (pre[date]) {
      const { availablePower: _availablePower, todayProfit: _todayProfit } = pre[date];
      pre[date] = { date, availablePower: Utils.calc(`${availablePower} + ${_availablePower}`), todayProfit: Utils.calc(`${todayProfit} + ${_todayProfit}`) };
    } else {
      pre[date] = { date, availablePower, todayProfit };
    }
    return pre;
  }, {});
  return _.orderBy(
    Object.keys(merged).map((i) => merged[i]),
    ['date'],
    ['desc'],
  );
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
  const poolId = _.get(props, 'match.params.id');

  const [historyData, setHistoryData] = useState([]);
  const [summary, setSummary] = useState({});
  useEffect(() => {
    (async function () {
      const historyData = await fetchData();
      const summary = calcSummary(historyData);
      const historyList = calcMergeDay(historyData);
      setHistoryData(historyList);
      setSummary(summary);
    })();
  }, []);
  return (
    <div className="energy-page">
      <CustomNav
        title="JL云矿"
        rightContent={
          <div
            className="action-button"
            onClick={() => {
              history.push(`/history/buyPool/${poolId}`);
            }}
          >
            购买记录
          </div>
        }
      />
      <Summary data={summary} poolId={poolId} />
      <History data={historyData} poolId={poolId} />
    </div>
  );
}
