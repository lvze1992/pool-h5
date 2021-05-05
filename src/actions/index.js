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
   * 购买记录
   */
  async getChiaUserBuy() {
    const query = new AV.Query('ChiaUserBuy');
    query.descending('date');
    query.equalTo('user', AV.User.current());
    const data = await query.find();
    return data.map((i) => {
      return i.toJSON();
    });
  }
}
export default new Actions();
