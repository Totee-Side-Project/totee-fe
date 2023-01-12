import { MouseEventHandler } from 'react';
import classes from './MentoringPostCard.module.scss';

interface Props {
  mentoringPost: {
    title: string;
    description: string;
    mentoringCycle: string;
    mentor: {
      career: string;
      position: string;
      profileImageUrl: string;
      nickname: string;
    };
  };
  onClick?: MouseEventHandler;
}

interface SummaryLabelProps {
  title: string;
  content: string;
}

function SummaryLabel({ title, content }: SummaryLabelProps) {
  return (
    <div className={classes.summary_item}>
      <span>{title}</span>
      <span>{content}</span>
    </div>
  );
}

function MentoringPostCard({ mentoringPost, onClick }: Props) {
  const { title, description, mentoringCycle, mentor } = mentoringPost;

  return (
    <article className={classes.container} onClick={onClick}>
      <div>
        <h1 className={classes.title}>{title}</h1>
        <div className={classes.summary_wrapper}>
          <SummaryLabel title="분야" content="개발 / 프로그래밍" />
          <SummaryLabel title="경력" content="3 ~ 5년차 현직자" />
        </div>
      </div>
      <div className={classes.divider}></div>
      <div className={classes.description}>{description}</div>
      <div className={classes.footer}>
        <div className={classes.profile}>
          <img src="" alt="" />
          <span className={classes.nickname}>{mentor.nickname}</span>
        </div>
        <div className={classes.vertical_divider} />
        <span className={classes.mentoring_cycle}>{mentoringCycle}</span>
      </div>
    </article>
  );
}

export default MentoringPostCard;
