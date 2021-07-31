import React, { useState, useEffect } from 'react';
import { Button, Toast } from 'antd-mobile';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { CustomNav } from 'src/components';
import { useStore } from 'src/Provider';
import Utils from 'src/utils';
import Actions from 'src/actions';
import './Withdraw.scss';
const token = 'ETH';
async function fetchAsset(store) {
  const curToken = store.tokens.filter((i) => i.token === token)[0];
  const assetList = await Actions.getUserAssetList(curToken);
  const asset = Utils.calcAssetSummary(assetList);
  return asset[token];
}
export async function submitWithdraw({ address, amount, withdrawFee, token, location, history }) {
  try {
    await Actions.addressLimit({ address, token });
    await Actions.availableLimit('UserAsset', { total: amount, withdrawFee, token });
    history.replace('/auth', {
      authType: 'tradeAuth',
      from: location,
      withdrawParams: {
        address,
        amount,
        withdrawFee,
        token,
      },
    });
  } catch (e) {
    Toast.info(e.rawMessage || '异常：W21');
  }
}
export default function Withdraw() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const store = useStore();
  const [asset, setAsset] = useState({});
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    (async function () {
      if (_.isEmpty(store.tokens)) {
        return;
      }
      let asset = await fetchAsset(store);
      setAsset(asset || {});
    })();
  }, [store.tokens]);

  const { available = '-' } = asset;
  const { withdrawFee } = _.get(store, 'eth.ethConfig', {});

  return (
    <div className="withdraw-page">
      <CustomNav title="提币" />
      <div className="withdraw-container">
        <div className="title">
          <span>提币币种</span>
          <span>{token}</span>
        </div>
        <div className="title">
          <span>提币地址</span>
        </div>
        <div className="input-box">
          <input
            className="custom-input"
            placeholder="输入或长按粘贴地址"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div className="title">
          <span>提币数量</span>
        </div>
        <div className="input-box">
          <input
            type="number"
            className="custom-input"
            placeholder="请输入数量"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <div
            className="action-button"
            onClick={() => {
              setAmount(available || '');
            }}
          >
            全部
          </div>
        </div>
        <div className="available-tip">
          <span>{`可用: ${available || '-'}`}</span>
        </div>
        <div className="title">
          <span>手续费</span>
        </div>
        <div className="fee-box">
          <span>{withdrawFee || '-'}</span>
          <span>{token}</span>
        </div>
        <div className="tip">提币处理时间为每日9:00-23:00，请耐心等待</div>
        <Button
          type="primary"
          onClick={() => {
            const curToken = store.tokens.filter((i) => i.token === token)[0];
            submitWithdraw({
              address,
              amount,
              withdrawFee,
              token: curToken,
              location,
              history,
            });
          }}
        >
          提币
        </Button>
      </div>
    </div>
  );
}
