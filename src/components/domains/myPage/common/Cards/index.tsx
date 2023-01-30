import { IMemberType } from 'types/member.types';
import { IPostsType } from 'types/posts.types';
import classes from './index.module.scss';
import MemberCard from './MemberCard';
import StudyPostCard from './StudyPostCard';

interface ICardsProps {
  postSectionTitle: string;
  posts: IPostsType;
  memberSectionTitle?: string;
  members?: IMemberType[];
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
  onClickMemberCard?: (member: IMemberType) => void;
}

const Cards = ({
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
      <StudyPostCard posts={posts} setCurrentPostId={setCurrentPostId} />
      <div className={classes.horizontal} />
      <p className={classes.title}>{memberSectionTitle}</p>
      <MemberCard members={members} onClickMemberCard={onClickMemberCard} />
    </>
  );
};

export default Cards;
