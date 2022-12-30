import { Search } from '@components/common/main/Search/Search';
import classes from './SearchSection.module.scss';

export const SearchSection = () => {
  return (
    <section className={classes.searchSection}>
      <Search />
    </section>
  );
};
