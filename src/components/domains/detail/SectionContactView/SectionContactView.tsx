import { IPost } from '@api/post/types';
import classes from './sectionContactView.module.scss';

export const SectionContactView = ({ postData }: { postData: IPost }) => {
  return (
    <div className={classes.contact_view_wrap}>
      <p>
        진행지역{' : '}
        {!postData.detailedRegion ? '온라인으로 진행' : postData.detailedRegion}
      </p>
      <p>
        연락방식{' : '}
        <a
          href={postData.contactLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {postData.contactMethod}
        </a>
      </p>
    </div>
  );
};
