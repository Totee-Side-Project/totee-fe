import { Link, useLocation } from 'react-router-dom';

import { linkToUrl } from '@components/atoms/Search';
import classes from './index.module.scss';

interface Props {
  previewResult: string[];
  closePreview: () => void;
}

export const SearchPreview = ({ previewResult, closePreview }: Props) => {
  const { pathname } = useLocation();
  if (previewResult?.length) {
    return (
      <div className={classes.preview_wrapper}>
        <ul className={classes.preview_list}>
          {previewResult?.map((title, index) => (
            <li
              key={`search_${index}`}
              onClick={closePreview}
              className={classes.preview_item}
            >
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
