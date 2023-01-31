import { IMemberType } from 'types/member.types';
import { IPostsType } from 'types/posts.types';
import classes from './index.module.scss';
import MemberCard from './MemberCard';
import MentoringPostCard from './MentoringPostCard';
import StudyPostCard from './StudyPostCard';

interface ICardsProps {
  menu: '스터디' | '멘토링';
  postSectionTitle: string;
  posts: IPostsType;
  memberSectionTitle?: string;
  members?: IMemberType[];
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
  onClickMemberCard?: (member: IMemberType) => void;
}

const Cards = ({
  menu,
  postSectionTitle,
  posts,
  memberSectionTitle,
  members,
  setCurrentPostId,
  onClickMemberCard,
}: ICardsProps) => {
  return (
    <>
      <p className={classes.title}>{postSectionTitle}</p>
      {menu === '스터디' && (
        <StudyPostCard posts={posts} setCurrentPostId={setCurrentPostId} />
      )}
      {menu === '멘토링' && (
        <MentoringPostCard posts={posts} setCurrentPostId={setCurrentPostId} />
      )}
      <div className={classes.horizontal} />
      <p className={classes.title}>{memberSectionTitle}</p>
      <MemberCard members={members} onClickMemberCard={onClickMemberCard} />
    </>
  );
};

export default Cards;
