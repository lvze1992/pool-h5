import './Info.scss';

const data = [
  [
    { label: '软件服务费率(包含机房管理费)', value: '20%' },
    { label: '算力生效', value: 'T+5日生效' },
    { label: '收益发放', value: '算力生效后T+1' },
    { label: 'P满盘周期', value: '30天' },
    { label: '算力有效期', value: '540天' },
  ],
  [
    {
      label: '什么是Chia？',
      value:
        'Chia由BitTorrent的发明者Bram Cohen于2017年8月注创立，旨在开发一个改进的区块链和智能交易平台。\nChia将成为第一个企业级数字货币。Chia使用的是比特币以来第一个新的中本共识算法。它被称为 "空间和时间证明"（Proof of Space and Time），Chialisp是Chia新推出的智能交易编程语言，功能强大、易于审核、安全。目前可供参考的智能交易有：原子交换、授权收款人、可恢复钱包、多重签名钱包和限价钱包。',
    },
  ],
];
export default function Info() {
  return [
    <div className="info-box">
      {data[0].map((item, idx) => {
        const { label, value } = item;
        return (
          <li key={idx} className="line">
            <span className="key">{label}</span>
            <span className="value">{value}</span>
          </li>
        );
      })}
    </div>,
    <div className="info-box">
      {data[1].map((item, idx) => {
        const { label, value } = item;
        return (
          <li key={idx} className="block">
            <span className="key">{label}</span>
            <span className="value">{value}</span>
          </li>
        );
      })}
    </div>,
  ];
}
