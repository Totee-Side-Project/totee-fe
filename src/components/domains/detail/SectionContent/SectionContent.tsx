import { Line } from '@components/atoms';
import { createMarkup } from '@utils/createMarkup';

import classes from './sectionContent.module.scss';

export const SectionContent = (props: { content: string }) => {
  return (
    <article className={classes.content_container}>
      <Line className={classes.detail_line} />
      <div
        className={classes.content_wrap}
        dangerouslySetInnerHTML={createMarkup(props.content)}
      />
      <Line className={classes.detail_line} />
    </article>
  );
};
