import './ReviewCard.scss';

interface Props {
  type?: 'primary' | 'secondary';
}

export default function ReviewCard({ type = 'primary' }: Props) {
  return type === 'primary' ? (
    <div className="reviewCard_container primary">
      <div className="reviewCard_header">
        <div className="flex">
          <div className="profile_image"></div>
          <div className="nickname">닉네임</div>
          <div className="v_line"></div>
          <div className="role">수강생</div>
        </div>
        <div className="time">3일전</div>
      </div>
      <div className="h_line"></div>
      <div className="body">
        <div className="title">C++ 및 게임 프로그래밍 멘토</div>
        <div className="description">
          미국 뉴욕의 테크 회사에서 프로덕트 디자이너로 활동 중인 에릭입니다.
          UX, UI디자인, 유저 리서치 등등 다양한 경험과 분야와 지식을...
        </div>
      </div>
      {/* <div className="button"></div> */}
    </div>
  ) : (
    <div className="reviewCard_container secondary">
      <h1 className="title">C++ 및 게임 프로그래밍 멘토</h1>
      <div className="h_line"></div>
      <div className="description_wrapper">
        <div className="description">
          <span>분야</span>
          <span>개발/프로그래밍</span>
        </div>
        <div className="description">
          <span>경력</span>
          <span>3~5년차 현직자</span>
        </div>
        <div className="description">
          <span>경력</span>
          <span>3~5년차 현직자</span>
        </div>
      </div>
    </div>
  );
}
