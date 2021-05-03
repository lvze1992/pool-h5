import React from 'react';
import _ from 'lodash';
import Util from 'src/utils';
import './withdraw.scss';

const title = '提币记录';
const statusMap = {
  done: '已完成',
  doing: '进行中',
};
const history = _.fill(new Array(200), {
  token: 'XCH',
  amount: '23.32',
  status: 'done',
  time: 12113123132,
});
function Comp() {
  return (
    <div className="scroll-list withdraw-history">
      {history.map((item, idx) => {
        const { token, amount, status, time } = item;
        return (
          <div key={idx} className="scroll-item">
            <div className="title">{token}</div>
            <div className="line">
              <div className="box">
                <span className="key">数量</span>
                <span className="value">{amount}</span>
              </div>
              <div className="box">
                <span className="key">状态</span>
                <span className="value">{statusMap[status] || '-'}</span>
              </div>
              <div className="box">
                <span className="key">时间</span>
                <span className="value">{Util.dateFormat(time)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export { Comp, title };
