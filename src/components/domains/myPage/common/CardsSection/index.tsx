import type { IMemberType } from '@api/team/types';
import { StudyPostsType } from '@api/post/types';
import { IMentoringPost, MentoringPostsType } from '@api/mentoring/types';
import MemberCardsSection from './MemberCardsSection';
import MentoringPostCardsSection from './MentoringPostCardsSection';
import StudyPostCardsSection from './StudyPostCardsSection';
import classes from './index.module.scss';

interface ICardsSectionProps {
  postSectionTitle: string;
  studyPosts?: StudyPostsType;
  mentoringPosts?: MentoringPostsType;
  memberSectionTitle?: string;
  members?: IMemberType[];
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
  onClickMemberCard?: (member: IMemberType) => void;
  onClickFavoriteMentoringPostCard?: (post: IMentoringPost) => void;
}

const CardsSection = ({
  postSectionTitle,
  studyPosts,
  mentoringPosts,
  memberSectionTitle,
  members,
  setCurrentPostId,
  onClickMemberCard,
  onClickFavoriteMentoringPostCard,
}: ICardsSectionProps) => {
  return (
    <>
      <p className={classes.title}>{postSectionTitle}</p>
      {studyPosts && (
        <StudyPostCardsSection
          postSectionTitle={postSectionTitle}
          studyPosts={studyPosts}
          setCurrentPostId={setCurrentPostId}
        />
      )}
      {mentoringPosts && (
        <MentoringPostCardsSection
          postSectionTitle={postSectionTitle}
          mentoringPosts={mentoringPosts}
          setCurrentPostId={setCurrentPostId}
          onClickFavoriteMentoringPostCard={onClickFavoriteMentoringPostCard}
        />
      )}
      <div className={classes.horizontal} />
      <p className={classes.title}>{memberSectionTitle}</p>
      <MemberCardsSection
        members={members}
        onClickMemberCard={onClickMemberCard}
      />
    </>
  );
};

export default CardsSection;
