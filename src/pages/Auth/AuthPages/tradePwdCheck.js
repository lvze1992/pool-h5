import React, { useEffect } from 'react';
import { Loading } from 'src/components';
import Actions from 'src/actions';
import { Toast } from 'antd-mobile';
async function tradePwdCheck({ next }) {
  try {
    const result = await Actions.hasTradePwd();
    next({ useCheck: result ? '1' : '0' });
  } catch (e) {
    Toast.info(e.rawMessage || '异常: TPC9');
  }
}
export default function TradePwdCheck(props) {
  const { next } = props;
  const { tradePwd } = props.authStatus;
  useEffect(() => {
    async function fetchData() {
      await tradePwdCheck({ next, tradePwd });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Loading label="安全校验中..." />
    </div>
  );
}
