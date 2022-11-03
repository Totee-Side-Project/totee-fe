import { Banner, Categories } from '@components/common';
import { useGetPostByPostId } from '@hooks/useGetQuery';
import { ReactNode, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeartIcon from '@assets/svg/common/heart.svg';
import SettingIcon from '@assets/svg/common/setting.svg';
import EyeIcon from '@assets/svg/common/eye.svg';
import LeftArrowHasBorderIcon from '@assets/svg/common/left_arrow_has_border.svg';

import classes from './newDetailPage.module.scss';
import { useCustomNavigate } from '@hooks/useCustomNavigate';
import { Line } from '@components/atoms/Line/Line';
import { NewIcon } from '@components/atoms/Icon/NewIcon';

interface IResponseDto {
  postId: number;
  title: string;
  content: string;
  nickname: string;
  view: number;
  likeNum: number;
  commentNum: number;
  commentDTOList: [];
  imageUrl: string;
  createdAt: string;
  onlineOrOffline: string;
  period: string;
  status: string;
  positionList: [];
  skillList: {
    [key: string]: string;
  };
  recruitNum: number;
  contactMethod: string;
  contactLink: string;
  region: string;
  detailedRegion: string;
  categoryName: string;
  authorPosition: string;
}

interface SectionHeaderProps {
  title: string;
  categoryName: string;
  onlineOrOffline: string;
  recruitNum: number;
  status: string;
}

interface IchildrenReactNode {
  children: ReactNode;
}

export const NewDetailPage = () => {
  // const navigate = useNavigate();
  const { id } = useParams();

  if (!id) return;
  const { data: postData, status, refetch } = useGetPostByPostId(Number(id));
  const responseData: IResponseDto = postData?.data.body.data;

  // const [responseData, setResponseData] = useState(null);

  // useEffect(() => {
  //   if (!postData) return;
  //   setResponseData({ ...postData?.data.body.data });
  // }, [postData]);

  // Render Loading Component
  if (status === 'loading') return <div>loading...</div>;

  /*
  게시물 좋아요 관련 로직

  토글관련 로직
  로그인 유무 로직

  게시물 데이터가 존재할 경우 상태가 200 이라면 setState해준다?

  좋아요 관련 useEffect 서버의 상태와 클라이언트 상태를 동기화시켜주는 부분?

  뒤로가기 클릭시 루트로 보내주는 부분
  좋아요 관련 함수
  로그인이 안되어 있다면 로그인 모달으 열어주는 부분

  로그인이 안되어 있을 떄 공통적으로 거쳐야하는 컨테이터적인 함수를 생성한다면?
  공통적으로 모달을 오픈시켜줄 수 있지 않을까?
  */

  if (status === 'success' && responseData) {
    return (
      <div>
        <Banner />
        <main
          className={classes.study_detail_page_main}
          // style={{ margin: '100px 0', width: '100%' }}
        >
          <LeftSidebar />
          <NewDetailPageSection>
            <SectionHeader>
              <SectionTitle title={responseData.title} />
              <Line className={classes.detail_line} />
              <SectionCategory
                categoryName={responseData.categoryName}
                onlineOrOffline={responseData.onlineOrOffline}
                recruitNum={responseData.recruitNum}
                status={responseData.status}
              />
            </SectionHeader>
            <SectionContent content={responseData.content} />
            <Bottom>
              <LikeCommentViewCount />
              <Comment />
            </Bottom>
          </NewDetailPageSection>
          <RightSidebar />
        </main>
      </div>
    );
  }
};

const Bottom = ({ children }: IchildrenReactNode) => {
  return <>{children}</>;
};

const Comment = () => {
  return <div>comment</div>;
};

const LikeCommentViewCount = () => {
  return <div>line, comment, view count</div>;
};

const NewDetailPageSection = ({ children }: IchildrenReactNode) => {
  return <section className={classes.center_section}>{children}</section>;
};

const SectionHeader = ({ children }: IchildrenReactNode) => {
  return <>{children}</>;
};

const SectionTitle = (props: Pick<SectionHeaderProps, 'title'>) => {
  return (
    <div className={classes.header_title_wrap}>
      <div className={classes.title_left}>
        <h1 className={classes.title_left}>{props.title}</h1>
      </div>
      <div className={classes.title_right}>
        <NewIcon src={HeartIcon} alt="heart_icon" onClick={() => {}} />
        <NewIcon src={SettingIcon} alt="setting_icon" onClick={() => {}} />
      </div>
    </div>
  );
};

const SectionCategory = ({
  categoryName,
  recruitNum,
  onlineOrOffline,
  status,
}: Pick<
  SectionHeaderProps,
  'categoryName' | 'recruitNum' | 'onlineOrOffline' | 'status'
>) => {
  return (
    <div className={classes.category_wrap}>
      <div className={classes.flex_wrap + ' ' + classes.category_left}>
        <div className={classes.category_button}>{categoryName}</div>
        <div className={classes.category_button}>{onlineOrOffline}</div>
        <div className={classes.category_button}>{recruitNum + '명'}</div>
        <div className={classes.category_button}>{status}</div>
      </div>
      <div className={classes.category_right}>
        <div className={classes.status_button}>모집중</div>
      </div>
    </div>
  );
};

interface SectionContentProps {
  content: string;
}
const SectionContent = (props: SectionContentProps) => {
  return (
    <div>
      <div>{props.content}</div>
      <Line className={classes.detail_line} />
    </div>
  );
};

interface LeftSidebarProps {}
const LeftSidebar = () => {
  const { navigatePrevious } = useCustomNavigate();
  return (
    <aside className={classes.aside_left}>
      <NewIcon
        style={{
          width: '48px',
          height: '48px',
        }}
        src={LeftArrowHasBorderIcon}
        alt="left_arrow_has_border_icon"
        onClick={navigatePrevious}
      />
    </aside>
  );
};

interface RightSidebarProps {}
const RightSidebar = () => {
  return <aside className={classes.aside_right}>right</aside>;
};

// const DetailPostCategory = ({ detailData }: { detailData: IResponseDto }) => {
//   return (
//     <div className="summary_category_wrapper">
//       <div className="summary_category_left">
//         <div className="summary_category_name">{detailData.categoryName}</div>
//         <div className="summary_category_name">
//           {detailData.onlineOrOffline}
//         </div>
//         <div className="summary_category_name">{detailData.recruitNum}</div>
//         <div className="summary_category_name">
//           {detailData.period ? checkingDetailPeriod(detailData.period) : null}
//         </div>
//       </div>
//       <div className="summary_category_right">
//         {/* {detailData.status == 'Y' ? (
//           <div
//             className={`summary_category_status_true ${
//               detailData.nickname == LoginLabel.nickname ? 'hover' : ''
//             }`}
//             onClick={handlerStatusClick}
//           >
//             <span>모집중</span>
//           </div>
//         ) : (
//           <div
//             className={`summary_category_status_false  ${
//               detailData.nickname == LoginLabel.nickname ? 'hover' : ''
//             }`}
//             onClick={handlerStatusClick}
//           >
//             <span>모집완료</span>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };
