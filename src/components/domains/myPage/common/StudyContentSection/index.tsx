import { useUserActivity } from '@hooks/useUserActivity';
import { UseQueryResult } from 'react-query';
import classes from '../../contentSection/index.module.scss';
import StudyMemberCard from './StudyMemberCard';
import StudyPostCard from './StudyPostCard';

interface IStudyContentSectionProps {
  postSectionTitle: string;
  useGetPosts: any;
  memberSectionTitle?: string;
  useGetMembers?: any;
}

const StudyContentSection = ({
  postSectionTitle,
  useGetPosts,
  memberSectionTitle,
  useGetMembers,
}: IStudyContentSectionProps) => {
  const { posts, members, setCurrentPostId } = useUserActivity(
    useGetPosts,
    useGetMembers,
  );

  if (!posts) {
    return <>정보 없음</>;
  }

  return (
    <>
      <p className={classes.title}>{postSectionTitle}</p>
      <StudyPostCard posts={posts} setCurrentPostId={setCurrentPostId} />
      <div className={classes.horizontal} />
      <p className={classes.title}>{memberSectionTitle}</p>
      <StudyMemberCard members={members} />
    </>
  );
};

export default StudyContentSection;
