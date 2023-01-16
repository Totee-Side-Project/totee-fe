import MentoringPostCard from '@components/common/card/MentoringPostCard/MentoringPostCard';
import { MouseEventHandler } from 'react';
import { IMentoring } from 'types/api.types';
import classes from './RecommendMentoringCard.module.scss';

interface RecommendMentoringCardProps {
  mentoring: IMentoring;
  onClick?: MouseEventHandler;
}

function RecommendMentoringCard({
  onClick,
  mentoring,
}: RecommendMentoringCardProps) {
  return (
    <div className={classes.container}>
      <MentoringPostCard
        onClick={onClick}
        mentoringPost={{
          title: mentoring.title,
          description: mentoring.content,
          mentor: {
            career: mentoring.career,
            position: mentoring.field,
            profileImageUrl: mentoring.profileImageUrl,
            nickname: mentoring.nickname,
          },
        }}
      />
    </div>
  );
}

export default RecommendMentoringCard;
