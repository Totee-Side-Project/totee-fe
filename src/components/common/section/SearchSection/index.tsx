import { Search, SearchResultGuideText } from '@components/atoms';
import classes from './index.module.scss';

export const SearchSection = () => {
  return (
    <section className={classes.searchSection}>
      <Search />
      <SearchResultGuideText />
    </section>
  );
};
