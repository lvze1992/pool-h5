import { NavBar, Icon } from 'antd-mobile';
import { useHistory } from 'react-router-dom';

export default function CustomNav(props) {
  const history = useHistory();
  const {
    onLeftClick = () => {
      history.goBack();
    },
    rightContent = null,
    title = null,
  } = props;
  return (
    <NavBar
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={() => {
        onLeftClick();
      }}
      rightContent={rightContent}
    >
      {title}
    </NavBar>
  );
}
