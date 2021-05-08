import React, { useEffect } from 'react';
import { Toast } from 'antd-mobile';
import Actions from 'src/actions';
import { useStore } from 'src/Provider';
import { Loading } from 'src/components';
async function modifyTradePwd({ pre, next, tradePwd, authType, store }) {
  try {
    await Actions.modifyTradePwd(tradePwd);
    store.setHasTradePwd(true);
    if (authType === 'tradeAuth') {
      next({});
    } else {
      Toast.info('交易密码修改成功');
      next({ result: true });
    }
  } catch (e) {
    pre();
    Toast.info(e.rawMessage || '异常: MTP9');
  }
}
export default function ModifyTradePwd(props) {
  const { pre, next, authType } = props;
  const { tradePwd } = props.authStatus;
  const store = useStore();
  useEffect(() => {
    async function fetchData() {
      await modifyTradePwd({
        pre,
        next,
        tradePwd,
        authType,
        store,
      });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Loading label="修改交易密码：安全校验中..." />
    </div>
  );
}
