import React from 'react';
import { useHistory } from 'react-router-dom';
import { Toast } from 'antd-mobile';
export default function Tool(props) {
  const history = useHistory();
  return (
    <div className="tool-page">
      <div
        className="tool-item"
        onClick={() => {
          Toast.info('敬请期待');
        }}
      >
        <div className="icon">
          <i className="iconfont icon-chongzhi" />
        </div>
        <div className="title">
          <span>充币</span>
        </div>
      </div>
      <div
        className="tool-item"
        onClick={() => {
          history.push('/withdraw');
        }}
      >
        <div className="icon">
          <i className="iconfont icon-tixian" />
        </div>
        <div className="title">
          <span>提币</span>
        </div>
      </div>
      <div
        className="tool-item"
        onClick={() => {
          history.push('/history/withdraw');
        }}
      >
        <div className="icon">
          <i className="iconfont icon-jilu" />
        </div>
        <div className="title">
          <span>记录</span>
        </div>
      </div>
    </div>
  );
}
