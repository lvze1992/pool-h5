import './Info.scss';

const data = [
  [
    { label: '软件服务费率(包含机房管理费)', value: '15%' },
    { label: '算力生效', value: 'T+7日生效' },
    { label: '收益发放', value: '算力生效后T+1' },
    { label: '矿机型号', value: 'Nvidia 3060Ti' },
    { label: '矿机算力', value: '480M' },
    { label: '矿机功耗', value: '698W' },
    { label: '电价', value: '0.1087$/KWH' },
    { label: '算力有效期', value: '720天' },
  ],
  [
    {
      label: '1、挖矿收益如何计算？',
      value: (
        <span>
          * 净收益=（产出-软件服务费-电费）*算力数
          <br />
          * 软件服务费=净收益*软件服务费率*算力数
          <br />
          * 电费=电价*矿机功耗*24小时*算力数
          <br />
          每天收益将按照矿池实际收益进行计算，并根据持有的算力份额进行分配。
        </span>
      ),
    },
    {
      label: '2、以太坊转POS后，云算力如何运行？',
      value: '以太坊转POS之后，平台将测算其他项目的挖矿收益，帮助用户切换其他项目进行挖矿，直至服务期满。',
    },
    {
      label: '3、风险提示',
      value: (
        <span>
          (1) ETH的EIP1559实施后，矿工手续费会减少，相应日产出会下降，具体请已实际为准；
          <br />
          (2) 电价可能由于国家政策及电力成本的变化而波动，JL云矿将保留调整电费的权利。
        </span>
      ),
    },
  ],
];
export default function Info() {
  return [
    <div className="info-box" key="info1">
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
    <h4>常见问题</h4>,
    <div className="info-box" key="info2">
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
