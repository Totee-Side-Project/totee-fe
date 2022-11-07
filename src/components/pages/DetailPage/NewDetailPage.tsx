import { ChangeEvent, ReactNode, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Banner } from '@components/common';
import { Line } from '@components/atoms/Line/Line';
import { NewIcon } from '@components/atoms/Icon/NewIcon';
import JoinerCheck from '@components/common/join/JoinerCheck/JoinerCheck';
import { NewComments } from '@components/common/detail/Comment/NewComment';
// import { Input } from '@components/ui/Input/Input';
// import { Comment } from '@components/common';
import { useGetPostByPostId } from '@hooks/useGetQuery';
import { useCustomNavigate } from '@hooks/useCustomNavigate';
import { createMarkup } from '@utils/createMarkup';
import HeartIcon from '@assets/svg/common/heart.svg';
import SettingIcon from '@assets/svg/common/setting.svg';
import EyeIcon from '@assets/svg/common/eye.svg';
import MessageIcon from '@assets/svg/common/message-square.svg';
import LeftArrowHasBorderIcon from '@assets/svg/common/left_arrow_has_border.svg';
import classes from './newDetailPage.module.scss';
import {
  checkingDetailPeriod,
  handleSelectValues,
} from '@utils/handleSelectValue';
// import { Button } from '@components/atoms';
import { Button } from '@components/ui/Button/Button';
import { useAddComment } from '@hooks/useMutateQuery';
import { replaceLineBreakStringIntoTag } from '@utils/replaceLineBreakStringIntoTag';
import { validateData } from '@utils/validateData';

export interface ICommentDto {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  commentId: number;
  userSeq: number;
  profileImageUrl: string;
}
export interface IResponsePostDetail {
  postId: number;
  title: string;
  content: string;
  nickname: string;
  view: number;
  likeNum: number;
  commentNum: number;
  commentDTOList: ICommentDto[];
  imageUrl: string;
  createdAt: string;
  onlineOrOffline: string;
  period: string;
  status: string;
  positionList: string[];
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

type SectionHeaderProps = Pick<
  IResponsePostDetail,
  'title' | 'onlineOrOffline' | 'recruitNum' | 'status' | 'period'
>;

// interface SectionHeaderProps {
//   title: string;
//   categoryName: string;
//   onlineOrOffline: string;
//   recruitNum: number;
//   status: string;
// }

interface IchildrenReactNode {
  children: ReactNode;
}

export const NewDetailPage = () => {
  const { id } = useParams();

  // if (!id) return null;
  const { data: postData, status, refetch } = useGetPostByPostId(Number(id));
  const responseData: IResponsePostDetail = postData?.data.body.data;

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
        <main className={classes.study_detail_page_main}>
          <LeftSidebar />
          <NewDetailPageSection>
            <SectionHeader>
              <SectionTitle title={responseData.title} />
              <Line className={classes.detail_line} />
              <SectionCategory
                onlineOrOffline={responseData.onlineOrOffline}
                recruitNum={responseData.recruitNum}
                status={responseData.status}
                period={responseData.period}
              />
            </SectionHeader>
            <SectionContent content={responseData.content} />
            <SectionFooter>
              <LikeCommentViewCount
                likeNum={responseData.likeNum}
                commentNum={responseData.commentNum}
                view={responseData.view}
              />
              <Comments
                commentDTOList={responseData.commentDTOList}
                postId={responseData.postId}
              />
            </SectionFooter>
          </NewDetailPageSection>
          <RightSidebar />
        </main>
      </div>
    );
  }
  return null;
};

const SectionFooter = ({ children }: IchildrenReactNode) => {
  return <footer>{children}</footer>;
};

// interface CommentsProps {
//   commentDTOList: ICommentDto[];
//   postId: number;
//   // children: ReactNode;
// }
const Comments = ({
  commentDTOList,
  postId,
}: Pick<IResponsePostDetail, 'commentDTOList' | 'postId'>) => {
  // CommentsProps) => {
  // const [commentValue, setCommentValue] = useState('');
  // const addCommentMutate = useAddComment(postId);

  // const onChangeCommentValueByTextarea = (
  //   e: ChangeEvent<HTMLTextAreaElement>,
  // ) => setCommentValue(e.target.value);

  // const onSubmitCommentValueByButton = () => {
  //   if (!validateData(commentValue)) return;
  //   const textList = replaceLineBreakStringIntoTag(commentValue);
  //   const content = textList.map((text) => `<p>${text}</p>`).join('');

  //   addCommentMutate.mutateAsync({
  //     postId,
  //     content,
  //   });
  // .then((response) => console.log(response.data.header));
  return (
    <div className={classes.comment_wrap}>
      <div className={classes.comment_list_wrap}>
        <NewComments commentDTOList={commentDTOList} postId={postId} />
        {/* {commentDTOList &&
          commentDTOList.map((comment: any) => (
            <Comment
              postId={parseInt(id as string)}
              comment={comment}
              key={`comment-${comment.commentId}`}
            ></Comment>
          ))} */}
      </div>
      <CommentSubmitArea postId={postId} />
    </div>
  );
};

const CommentSubmitArea = ({ postId }: { postId: number }) => {
  const [value, setValue] = useState('');
  const addCommentMutate = useAddComment(postId);

  const onChangeCommentValueByTextarea = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => setValue(e.target.value);

  const onSubmitCommentValueByButton = () => {
    if (!validateData(value)) return;
    const textList = replaceLineBreakStringIntoTag(value);
    const content = textList.map((text) => `<p>${text}</p>`).join('');

    addCommentMutate
      .mutateAsync({
        postId,
        content,
      })
      .then((response) => response.status === 200 && setValue(''));
  };

  return (
    <>
      <textarea
        className={classes.comment_textarea}
        placeholder="댓글을 입력해주세요"
        value={value}
        onChange={onChangeCommentValueByTextarea}
      />
      <div className={classes.comment_button_wrap}>
        <Button text={'댓글 등록'} onClick={onSubmitCommentValueByButton} />
      </div>
    </>
  );
};

const LikeCommentViewCount = (
  props: Pick<IResponsePostDetail, 'likeNum' | 'commentNum' | 'view'>,
) => {
  const footerItems = {
    like: [HeartIcon, props.likeNum],
    comment: [MessageIcon, props.commentNum],
    view: [EyeIcon, props.view],
  };

  const createFooterItems = () => {
    return Object.entries(footerItems).map(([key, [src, value]], index) => (
      <div key={key + index} className={classes.footer_item_wrap}>
        <NewIcon src={src as string} alt={`${key}_icon`} onClick={() => {}} />
        {value}
      </div>
    ));
  };

  return (
    <div className={classes.footer_item_list_wrap}>{createFooterItems()}</div>
  );
};

const NewDetailPageSection = ({ children }: IchildrenReactNode) => {
  return <section className={classes.center_section}>{children}</section>;
};

const SectionHeader = ({ children }: IchildrenReactNode) => {
  return <header>{children}</header>;
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
  // categoryName,
  recruitNum,
  onlineOrOffline,
  status,
  period,
}: Pick<
  SectionHeaderProps,
  'recruitNum' | 'onlineOrOffline' | 'status' | 'period'
>) => {
  return (
    <div className={classes.category_wrap}>
      <div className={classes.flex_wrap + ' ' + classes.category_left}>
        <div className={classes.category_button}>{onlineOrOffline}</div>
        <div className={classes.category_button}>{recruitNum + '명'}</div>
        <div className={classes.category_button}>
          {checkingDetailPeriod(period)}
        </div>
      </div>
      <div className={classes.category_right}>
        <div
          className={
            status === 'Y'
              ? classes.status_button
              : classes.status_button + ' ' + classes.false
          }
        >
          {status === 'Y' ? '모집중' : '모집완료'}
        </div>
      </div>
    </div>
  );
};

const SectionContent = (props: { content: string }) => {
  return (
    <article className={classes.content_container}>
      <Line className={classes.detail_line} />
      <div
        className={classes.content_wrap}
        dangerouslySetInnerHTML={createMarkup(props.content)}
      />
      <Line className={classes.detail_line} />
    </article>
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

// interface RightSidebarProps {}

const RightSidebar = () => {
  return (
    <aside className={classes.aside_right}>
      <JoinerCheck />
    </aside>
  );
};

// const DetailPostCategory = ({ detailData }: { detailData: IResponsePostDetail }) => {
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
