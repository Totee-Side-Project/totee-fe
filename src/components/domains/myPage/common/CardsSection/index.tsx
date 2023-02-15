import type { IMentoringMemberType, IStudyMemberType } from '@api/team/types';
import { StudyPostsType } from '@api/post/types';
import { IMentoringPost, MentoringPostsType } from '@api/mentoring/types';
import MemberCardsSection from './MemberCardsSection';
import MentoringPostCardsSection from './MentoringPostCardsSection';
import StudyPostCardsSection from './StudyPostCardsSection';
import classes from './index.module.scss';
import { useEffect, useState } from 'react';
import { useMobileView } from '@hooks/useMobileView';

interface ICardsSectionProps {
  postSectionTitle: string;
  studyPosts?: StudyPostsType;
  mentoringPosts?: MentoringPostsType;
  memberSectionTitle?: string;
  members?: IStudyMemberType[] | IMentoringMemberType[];
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
  onClickStudyMemberCard?: (member: IStudyMemberType) => void;
  onClickMentoringMemberCard?: (member: IMentoringMemberType) => void;
  onClickFavoriteMentoringPostCard?: (post: IMentoringPost) => void;
}

const CardsSection = ({
  postSectionTitle,
  studyPosts,
  mentoringPosts,
  memberSectionTitle,
  members,
  setCurrentPostId,
  onClickStudyMemberCard,
  onClickMentoringMemberCard,
  onClickFavoriteMentoringPostCard,
}: ICardsSectionProps) => {
  const isCurrentIPadWidth = useMobileView(425);
  const isCurrentMobileWidth = useMobileView(991);
  const [cardUnit, setCardUnit] = useState(4);

  useEffect(() => {
    if (isCurrentIPadWidth) {
      setCardUnit(2);
      return;
    }
    if (isCurrentMobileWidth) {
      setCardUnit(3);
      return;
    }
    setCardUnit(4);
  }, [isCurrentIPadWidth, isCurrentMobileWidth]);

  return (
    <>
      <p className={classes.title}>{postSectionTitle}</p>
      <div className={classes.postSection}>
        {studyPosts && (
          <StudyPostCardsSection
            postSectionTitle={postSectionTitle}
            studyPosts={studyPosts}
            setCurrentPostId={setCurrentPostId}
            cardUnit={cardUnit}
          />
        )}
        {mentoringPosts && (
          <MentoringPostCardsSection
            postSectionTitle={postSectionTitle}
            mentoringPosts={mentoringPosts}
            setCurrentPostId={setCurrentPostId}
            onClickFavoriteMentoringPostCard={onClickFavoriteMentoringPostCard}
            cardUnit={cardUnit}
          />
        )}
      </div>
      <div className={classes.horizontal} />
      <p className={classes.title}>{memberSectionTitle}</p>
      <MemberCardsSection
        members={members}
        onClickStudyMemberCard={onClickStudyMemberCard}
        onClickMentoringMemberCard={onClickMentoringMemberCard}
        cardUnit={cardUnit}
      />
    </>
  );
};

export default CardsSection;
