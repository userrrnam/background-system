import { Space } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import moment from 'moment';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  if (!initialState || !initialState.settings) {
    return null;
  }
  const { currentUser } = initialState;
  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <div className={`${styles.lastIime}`}>
        上次登录时间: {moment(currentUser?.loginTime).format('lll')}
      </div>
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
