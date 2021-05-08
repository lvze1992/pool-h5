import React, { useEffect } from 'react';
import { Toast } from 'antd-mobile';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import { Loading } from 'src/components';
import Actions from 'src/actions';
async function checkTradeAuth({ next, pre, tradePwd, location }) {
  try {
    const result = await Actions.verifyTradePwd(tradePwd);
    if (result) {
      /**
       * 最终操作
       */
      if (_.get(location, 'state.withdrawParams')) {
        await Actions.submitWithdraw(location.state.withdrawParams);
        Toast.info('提现申请提交成功');
      } else {
        Toast.info('验证通过');
      }
      next({ result: true });
    } else {
      // eslint-disable-next-line no-throw-literal
      throw {
        rawMessage: '交易密码错误',
      };
    }
  } catch (e) {
    Toast.info(e.rawMessage || '异常: TA11');
    pre();
  }
}
export default function TradeAuth(props) {
  const { next, pre } = props;
  const { tradePwd } = props.authStatus;
  const location = useLocation();
  useEffect(() => {
    async function fetchData() {
      await checkTradeAuth({ pre, next, tradePwd, location });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Loading label="交易安全校验中..." />
    </div>
  );
}
