import AV from 'leancloud-storage';
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
      const query = new AV.Query('UserInfo');
      query.equalTo('phone', phone);
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
}
export default new Actions();
