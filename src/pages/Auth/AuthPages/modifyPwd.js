import React, { useEffect } from 'react';
import { Toast } from 'antd-mobile';
import Actions from 'src/actions';
import { Loading } from 'src/components';
async function modifyPwd({ pre, next, newPwd }) {
  try {
    const user = Actions.AV.User.current();
    user.setPassword(newPwd);
    await user.save();
    Toast.info('登录密码修改成功');
    next({ result: true });
  } catch (e) {
    Toast.info(e.rawMessage || '异常: MP8');
    pre();
  }
}
export default function ModifyPwd(props) {
  const { next, pre } = props;
  const { newPwd } = props.authStatus;
  useEffect(() => {
    async function fetchData() {
      await modifyPwd({ pre, next, newPwd });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Loading label="修改登录密码：安全校验中..." />
    </div>
  );
}
