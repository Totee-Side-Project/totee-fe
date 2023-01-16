import { Link, useLocation } from 'react-router-dom';

import { linkToUrl } from '@components/common/main/Search/Search';
import classes from './searchPreview.module.scss';

interface Props {
  previewResult: string[];
}

export const SearchPreview = ({ previewResult }: Props) => {
  const { pathname } = useLocation();
  if (previewResult?.length) {
    return (
      <div className={classes.preview_wrapper}>
        <ul className={classes.preview_list}>
          {previewResult?.map((title, index) => (
            <li key={`search_${index}`} className={classes.preview_item}>
              <Link
                className={classes.preview_list_link}
                to={linkToUrl(title, pathname)}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};
