import React, { useState, useEffect } from 'react';
import Actions from 'src/actions';
import { Toast } from 'antd-mobile';
import Util from 'src/utils';
import './withdraw.scss';

const title = '提币记录';
const statusMap = {
  done: '已完成',
  doing: '进行中',
  default: '进行中',
};
async function fetchData() {
  try {
    const chiaUserBuy = await Actions.getWithdrawHistory();
    return chiaUserBuy;
  } catch (e) {
    Toast.info(e.rawMessage || '异常：W20');
    return [];
  }
}
function Comp() {
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    (async function () {
      const historyData = await fetchData();
      console.log('historyData', historyData);
      setHistoryData(historyData);
    })();
  }, []);
  console.log('historyData', historyData);

  return (
    <div className="scroll-list withdraw-history">
      {historyData.map((item, idx) => {
        const { lock, withdrawFee, token, status, createdAt } = item;
        const { precision, token: tokenName } = token;
        return (
          <div key={idx} className="scroll-item">
            <div className="title">{tokenName}</div>
            <div className="line">
              <div className="box">
                <span className="key">数量</span>
                <span className="value">{Util.calc(`${lock} / 10 ^ ${precision} - ${withdrawFee}`)}</span>
              </div>
              <div className="box">
                <span className="key">状态</span>
                <span className="value">{statusMap[status] || '-'}</span>
              </div>
              <div className="box">
                <span className="key">时间</span>
                <span className="value">{Util.dateFormat(createdAt)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export { Comp, title };
