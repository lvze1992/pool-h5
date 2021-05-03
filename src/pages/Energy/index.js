import React from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import Summary from './Summary';
import History from './History';
import { CustomNav } from 'src/components';
import './Summary.scss';
const summary = {
  totalProfit: 333,
  avaPower: 23,
  waitPower: 12,
};
const historyData = _.fill(new Array(100), {
  time: '2323/3/4',
  avaPower: '23',
  profit: '1.2',
});
export default function Energy(props) {
  const history = useHistory();
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
