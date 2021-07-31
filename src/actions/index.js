import AV from 'leancloud-storage';
import Utils from 'src/utils';
import _ from 'lodash';
class Actions {
  constructor() {
    AV.init({
      appId: '8Is6HVIchUuDTxfh14PaY4Uf-gzGzoHsz',
      appKey: 'ttG2vveJsC4ffIFuTdpplmxn',
      serverURL: 'https://8is6hvic.lc-cn-n1-shared.com',
    });
    localStorage.setItem('debug', 'leancloud*');
    this.AV = AV;
  }
  /**
   * chia 每日算力
   */
  async getChiaConfig() {
    try {
      const query = new AV.Query('ChiaWork');
      query.descending('createdAt');
      const r = await query.first();
      return r ? r.toJSON() : {};
    } catch (e) {
      return {};
    }
  }
  /**
   * ETH 每日算力
   */
  async getEthConfig() {
    try {
      const query = new AV.Query('EthWork');
      query.descending('createdAt');
      const r = await query.first();
      return r ? r.toJSON() : {};
    } catch (e) {
      return {};
    }
  }
  async getTokens() {
    const query = new AV.Query('token');
    const data = await query.find();
    return data.map((i) => {
      return i.toJSON();
    });
  }
  async getPrice() {
    const query = new AV.Query('Price');
    query.include('token');
    const data = await query.find();
    const priceList = data
      .map((i) => {
        const {
          convert,
          convertToken,
          token: { token },
        } = i.toJSON();
        return {
          convert,
          convertToken,
          token,
        };
      })
      .reduce((pre, cur) => {
        const { convert, convertToken, token } = cur;
        pre[token] = `${convert} ${convertToken}`;
        return pre;
      }, {});
    return priceList;
  }
  /**
   * 用户
   */
  async queryUser(phone) {
    if (phone) {
      const user = new AV.Query('User');
      user.equalTo('mobilePhoneNumber', phone);
      const query = new AV.Query('UserInfo');
      query.matchesQuery('user', user);
      const userInfo = await query.first();
      return userInfo;
    } else {
      const query = new AV.Query('UserInfo');
      query.equalTo('user', AV.User.current());
      const userInfo = await query.first();
      return userInfo;
    }
  }
  async getUserInfo(phone) {
    try {
      const userInfo = await this.queryUser(phone);
      return userInfo ? userInfo.toJSON() : {};
    } catch (e) {
      return {};
    }
  }
  async setUserInfo(data) {
    let userInfo = await this.queryUser();
    if (_.isEmpty(userInfo)) {
      // 设置用户信息
      userInfo = new AV.Object('UserInfo');
      userInfo.set('user', AV.User.current());
      userInfo.set('phone', AV.User.current().get('mobilePhoneNumber'));
    }
    Object.keys(data).forEach((key) => {
      userInfo.set(key, data[key]);
    });
    return await userInfo.save();
  }
  async hasTradePwd() {
    const query = new AV.Query('UserInfo');
    query.equalTo('user', AV.User.current());
    query.matches('tradePwd', new RegExp('[a-z]', 'i'));
    const userInfo = await query.first();
    return userInfo;
  }
  async verifyTradePwd(tradePwd) {
    const phone = AV.User.current().get('mobilePhoneNumber');
    const tradePwdEncrypt = Utils.hashIt(tradePwd + phone);
    const query = new AV.Query('UserInfo');
    query.equalTo('user', AV.User.current());
    query.equalTo('tradePwd', tradePwdEncrypt);
    const userInfo = await query.first();
    return userInfo;
  }
  async modifyTradePwd(tradePwd) {
    const userInfo = await this.queryUser();
    const phone = userInfo.get('phone');
    userInfo.set('tradePwd', Utils.hashIt(tradePwd + phone));
    await userInfo.save();
  }
  /**
   * 收益记录
   */
  async getChiaUserProfitList() {
    const query = new AV.Query('ChiaUserProfitList');
    query.descending('date');
    query.equalTo('user', AV.User.current());
    const data = await query.find();
    return data.map((i) => {
      return i.toJSON();
    });
  }
  /**
   * 收益记录
   */
  async getEthUserProfitList() {
    const query = new AV.Query('EthUserProfitList');
    query.descending('date');
    query.equalTo('user', AV.User.current());
    const data = await query.find();
    return data.map((i) => {
      return i.toJSON();
    });
  }
  /**
   * 购买记录
   */
  async getChiaUserBuy() {
    const query = new AV.Query('ChiaUserBuy');
    query.descending('date');
    query.equalTo('user', AV.User.current());
    query.include('work');
    const data = await query.find();
    return data.map((i) => {
      return i.toJSON();
    });
  }
  /**
   * 购买记录
   */
  async getEthUserBuy() {
    const query = new AV.Query('EthUserBuy');
    query.include('work');
    query.descending('date');
    query.equalTo('user', AV.User.current());
    const data = await query.find();
    return data.map((i) => {
      const work = i.get('work');
      return { ...i.toJSON(), work: work ? work.toJSON() : null };
    });
  }
  /**
   * 获取用户资产
   */
  async getUserAssetList(token) {
    const query = new AV.Query('UserAsset');
    const query2 = new AV.Query('UserWithdraw');
    if (token) {
      query.equalTo('token', AV.Object.createWithoutData('token', token.objectId));
      query2.equalTo('token', AV.Object.createWithoutData('token', token.objectId));
    }
    query.equalTo('user', AV.User.current());
    query.include('token');
    query2.equalTo('user', AV.User.current());
    query2.equalTo('status', 'doing');
    query2.include('token');
    const data = await Promise.all([query.find(), query2.find()]);
    return [].concat(...data).map((i) => {
      return i.toJSON();
    });
  }
  /**
   * 获取用户提现记录
   */
  async getWithdrawHistory() {
    const query = new AV.Query('UserWithdraw');
    query.equalTo('user', AV.User.current());
    query.include('token');
    query.descending('createdAt');
    const data = await query.find();
    return data.map((i) => {
      return i.toJSON();
    });
  }
  /**
   * 提交提现申请
   */
  async submitWithdraw({ address, amount, withdrawFee, token }) {
    await this.addressLimit({ address, token });
    await this.availableLimit('UserAsset', { total: amount, withdrawFee, token });
    const query = new AV.Object('UserWithdraw');
    query.set('token', AV.Object.createWithoutData('token', token.objectId));
    query.set('user', AV.User.current());
    query.set('address', address);
    query.set('withdrawFee', withdrawFee);
    query.set('lock', Utils.formatAmount(amount, token.precision));
    return await query.save();
  }
  // 提现地址校验
  async addressLimit({ address, token }) {
    let reg;
    if (token.token === 'XCH') {
      reg = RegExp(/^xch[a-z0-9]{59}$/);
    } else if (token.token === 'ETH') {
      reg = RegExp(/^(0x)?[0-9a-fA-F]{40}$/);
    }
    if (!reg.test(address)) {
      // eslint-disable-next-line no-throw-literal
      throw { rawMessage: '提现地址不规范' };
    }
  }

  // 提现数量校验
  async availableLimit(table, limit) {
    const { total, withdrawFee, token } = limit;
    const assetList = await this.getUserAssetList(token);
    const asset = Utils.calcAssetSummary(assetList);
    const available = asset[token.token].available || 0;
    if (!total || _.isNaN(Number(total))) {
      // eslint-disable-next-line no-throw-literal
      throw { rawMessage: '请输入正确的提现数量' };
    } else if (+available < +total) {
      // eslint-disable-next-line no-throw-literal
      throw { rawMessage: '可用不足' };
    } else if (+total <= +withdrawFee) {
      // eslint-disable-next-line no-throw-literal
      throw { rawMessage: '提现数量不可低于手续费' };
    }
  }
}
export default new Actions();
