import classes from './searchPreview.module.scss';

interface Props {
  previewResult: string[];
  onClick: (resultText: string) => void;
}

export const SearchPreview = ({ previewResult, onClick }: Props) => {
  return (
    <div className={classes.preview_wrapper}>
      <ul className={classes.preview_list}>
        {previewResult?.map((result: any, idx: number) => (
          <li
            key={`preview-${idx}`}
            className={classes.preview_item}
            onClick={() => onClick(result)}
          >
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
};
