import classes from './index.module.scss';
import { ReactComponent as XIcon } from '@assets/svg/xicon.svg';

const data = {
  title: '[3년차 개발자 출신] 개발자 취업 관련 상담',
  mentor: {
    name: '고인물',
  },
  content: `LLLLLLLLLLorem ipsum dolor sit amet consectetur adipisicing elit. Provident recusandae consectetur, odio excepturi nostrum fugit? Culpa eaque esse animi id magnam. Suscipit dolorum voluptate facilis? Ipsam laborum quis voluptas porro!
    `,
};

function MentoringPostDetailModal() {
  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h2>멘토링 소개</h2>
          <XIcon className={classes.close_icon} />
        </div>

        <div className={classes.body}>
          <h1>{data.title}</h1>
          <div className={classes.profile}>
            <img src="" alt="" />
            <span className={classes.profile_name}>{data.mentor.name}</span>
            <div className={classes.mentor_badge}>Totee</div>
          </div>
          <div className={classes.profile_details}>
            <div className={classes.profile_detail}>
              <span>직무</span>
              <span>SW 엔지니어</span>
            </div>
            <div className={classes.profile_detail}>
              <span>경력</span>
              <span>미들 (3-4년차)</span>
            </div>
          </div>
          <div className={classes.cost}>1회 멘토링 1시간 / 11,000원</div>
          <div className={classes.divider} />
          <div className={classes.content}>{data.content}</div>
        </div>

        <div className={classes.bottom_fixed}>
          <button>신청하기</button>
        </div>
      </div>
    </div>
  );
}

export default MentoringPostDetailModal;
