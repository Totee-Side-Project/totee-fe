import UserProfile from '../common/UserProfile';
import { IDefaultFocusMenuType } from '../myPageMenu';
import classes from './index.module.scss';

interface IContentSectionProps {
  focusedMenu: IDefaultFocusMenuType;
}

const ContentSection = ({ focusedMenu }: IContentSectionProps) => {
  return (
    <section className={classes.contentSection}>
      <UserProfile />
      <section className={classes.focusedMenuSection}>
        {focusedMenu.component}
      </section>
    </section>
  );
};

export default ContentSection;
