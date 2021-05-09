import * as mathjs from 'mathjs';
import _ from 'lodash';
const config = {
  number: 'BigNumber',
  precision: 20,
};
const math = mathjs.create(mathjs.all, config);
export function calc(str) {
  try {
    return math.evaluate(str) + '';
  } catch (e) {
    return str || '异常: M08';
  }
}
export function formatAmount(value, precision) {
  const amount = calc(`${value} * 10 ^ ${precision}`).split('.')[0];
  if (_.isNumber(+amount) && amount) {
    return +amount;
  } else {
    // eslint-disable-next-line no-throw-literal
    throw { rawMessage: 'not number!' };
  }
}
export function parseAmount(value, precision) {
  const amount = calc(`${value} / 10 ^ ${precision}`);
  return +amount;
}
export function cutNumber(value, precision) {
  const number = (formatAmount(value, precision) + '').split('.')[0];
  return parseAmount(number, precision);
}
export function fixed(number, precision) {
  return number ? (+number).toFixed(6) : '-';
}
export function calcAssetSummary(assetList) {
  return assetList.reduce((pre, cur) => {
    const { total = 0, lock = 0, token: tokenObj } = cur;
    const { token, precision } = tokenObj;
    const preTotal = pre[token] ? pre[token].total : 0;
    const curTotal = calc(`${total} / 10 ^ ${precision} + ${preTotal}`);
    const preLock = pre[token] ? pre[token].lock : 0;
    const curLock = calc(`${lock} / 10 ^ ${precision} + ${preLock}`);
    return {
      ...pre,
      [token]: {
        total: curTotal,
        lock: curLock,
        available: calc(`${curTotal} - ${curLock}`),
        token,
      },
    };
  }, {});
}
