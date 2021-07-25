import React from 'react';
import { TabBar } from 'antd-mobile';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import './tab.scss';

const TabBarItem = TabBar.Item;
const tabConigs = {
  '/pool': {
    title: '矿场',
    icon: <i className="iconfont icon--wakuangjiankong1" />,
    selectedIcon: <i className="iconfont icon--wakuangjiankong1" />,
  },
  '/energy': {
    title: '算力',
    icon: <i className="iconfont icon-yunjisuan" />,
    selectedIcon: <i className="iconfont icon-yunjisuan" />,
  },
  '/wallet': {
    title: '钱包',
    icon: <i className="iconfont icon-qianbao4" />,
    selectedIcon: <i className="iconfont icon-qianbao4" />,
  },
  '/setting': {
    title: '我的',
    icon: <i className="iconfont icon-shigongrenyuan" />,
    selectedIcon: <i className="iconfont icon-shigongrenyuan" />,
  },
};
export default function Tab(props) {
  const location = useLocation();
  const history = useHistory();
  return (
    <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }} className="tab-bar">
      <TabBar unselectedTintColor="#9c9c9c" tintColor="#76d1f9" barTintColor="transparent">
        {props.children.map((route, index) => {
          const path = _.get(route, 'props.path');
          const tabConig = tabConigs[path];
          return (
            <TabBarItem
              key={index}
              title={tabConig.title}
              icon={tabConig.icon}
              selectedIcon={tabConig.selectedIcon}
              selected={location.pathname === path}
              onPress={() => {
                history.replace(path);
              }}
            >
              {route}
            </TabBarItem>
          );
        })}
      </TabBar>
    </div>
  );
}
