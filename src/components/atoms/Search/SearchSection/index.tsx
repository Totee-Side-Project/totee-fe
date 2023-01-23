import { Search, SearchResultGuideText } from '@components/atoms';
import classNames from 'classnames';
import classes from './index.module.scss';

interface IProps {
  resultGuidText?: 'on' | 'off';
}

export const SearchSection = ({ resultGuidText = 'off' }: IProps) => {
  const searchSectionClassName = classNames([
    classes.searchSection,
    resultGuidText === 'off' && classes.offMode,
  ]);

  return (
    <section className={searchSectionClassName}>
      <Search />
      {resultGuidText === 'on' && <SearchResultGuideText />}
    </section>
  );
};
