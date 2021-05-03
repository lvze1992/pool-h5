import { NavBar, Icon } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import './Nav.less';

export default function CustomNav(props) {
  const history = useHistory();
  const {
    icon = <Icon type="left" />,
    onLeftClick = () => {
      history.goBack();
    },
    rightContent = null,
    title = null,
  } = props;
  return (
    <NavBar
      mode="light"
      icon={icon}
      onLeftClick={() => {
        onLeftClick();
      }}
      rightContent={rightContent}
    >
      {title}
    </NavBar>
  );
}
