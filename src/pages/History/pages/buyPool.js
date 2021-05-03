import React from 'react';
import _ from 'lodash';
import Util from 'src/utils';
import './buyPool.scss';

const title = '购买记录';
const history = _.fill(new Array(200), {
  name: 'Chia云算力',
  price: '80 USDT/1T',
  startTime: 12113123132,
  endTime: 12113123132,
});
function Comp() {
  return (
    <div className="scroll-list buyPool-history">
      {history.map((item, idx) => {
        const { name, price, startTime, endTime } = item;
        return (
          <div key={idx} className="scroll-item">
            <div className="title">
              <span>{name}</span>
              <span>{price}</span>
            </div>
            <div className="line">
              <span>生效时间</span>
              <span>{Util.dateFormat(startTime)}</span>
            </div>
            <div className="line">
              <span>到期时间</span>
              <span>{Util.dateFormat(endTime)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export { Comp, title };
