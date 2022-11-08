import type { ChangeEvent, MouseEvent } from 'react';
import { ReactNode, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Banner } from '@components/common';
import { Line } from '@components/atoms/Line/Line';
import { NewIcon } from '@components/atoms/Icon/NewIcon';
import JoinerCheck from '@components/common/join/JoinerCheck/JoinerCheck';
import { NewComments } from '@components/common/detail/Comment/NewComment';
import { Button } from '@components/ui/Button/Button';
import { useGetLikeofPost, useGetPostByPostId } from '@hooks/useGetQuery';
import { createMarkup } from '@utils/createMarkup';
import FullHeartIcon from '@assets/svg/common/full_heart.svg';
import HeartIcon from '@assets/svg/common/heart.svg';
import SettingIcon from '@assets/svg/common/setting.svg';
import EyeIcon from '@assets/svg/common/eye.svg';
import MessageIcon from '@assets/svg/common/message-square.svg';
import LeftArrowHasBorderIcon from '@assets/svg/common/left_arrow_has_border.svg';
import {
  useAddComment,
  useUpdateLike,
  useUpdatePostStatus,
} from '@hooks/useMutateQuery';
import { checkingDetailPeriod } from '@utils/handleSelectValue';
import { replaceLineBreakStringIntoTag } from '@utils/replaceLineBreakStringIntoTag';
import { validateData } from '@utils/validateData';
import classes from './newDetailPage.module.scss';
import { useRecoilValue } from 'recoil';
import { UserState } from '@store/index';
import { Select } from '@components/ui/Select/Select';
import { useDeletePost } from '@hooks/usePostQuery';
import { useCustomNavigate } from '@hooks/useCustomNavigate';
// =======
// import classes from './newDetailPage.module.scss';
// import {
//   checkingDetailPeriod,
//   handleSelectValues,
// } from '@utils/handleSelectValue';
// // import { Button } from '@components/atoms';
// import { Button } from '@components/ui/Button/Button';
// import { useAddComment } from '@hooks/useMutateQuery';
// import { replaceLineBreakStringIntoTag } from '@utils/replaceLineBreakStringIntoTag';
// import { validateData } from '@utils/validateData';
// >>>>>>> 594f340974b1321a8b2137ce2487f9c16f7cf43f

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
  | 'title'
  | 'onlineOrOffline'
  | 'recruitNum'
  | 'status'
  | 'period'
  | 'postId'
  | 'nickname'
>;

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
              <SectionTitle
                title={responseData.title}
                postId={responseData.postId}
                nickname={responseData.nickname}
              />
              <Line className={classes.detail_line} />
              <SectionCategory
                onlineOrOffline={responseData.onlineOrOffline}
                recruitNum={responseData.recruitNum}
                status={responseData.status}
                period={responseData.period}
                postId={responseData.postId}
                nickName={responseData.nickname}
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
                nickname={''}
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

const Comments = ({
  commentDTOList,
  postId,
  nickname,
}: Pick<IResponsePostDetail, 'commentDTOList' | 'postId' | 'nickname'>) => {
  return (
    <div className={classes.comment_wrap}>
      <div className={classes.comment_list_wrap}>
        <NewComments
          commentDTOList={commentDTOList}
          postId={postId}
          nickname={nickname}
        />
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

const SectionTitle = (
  props: Pick<SectionHeaderProps, 'title' | 'postId' | 'nickname'>,
) => {
  const { nickname: currentUserNickname } = useRecoilValue(UserState);
  const { data: isLikeData, status } = useGetLikeofPost(props.postId);
  const deletePostQuery = useDeletePost(props.postId);
  const updateLikeQuery = useUpdateLike(props.postId);

  const updateLikeOnClick = () => updateLikeQuery.mutateAsync(props.postId);
  const handleOnClickBySelect = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const target = e.target as HTMLLIElement;
    const { innerText } = target;

    if (innerText === '글 수정') return alert(innerText);
    deletePostQuery
      .mutateAsync()
      .then((res) => res.status === 200 && alert('삭제가 완료되었습니다.'));
  };

  // if (status === 'loading')
  //   return (
  //     <div className={classes.header_title_wrap + ' ' + classes.loading}>
  //       loading{' '}
  //     </div>
  //   );

  return (
    <div className={classes.header_title_wrap}>
      <div className={classes.title_left}>
        <h1 className={classes.title_left}>{props.title}</h1>
      </div>
      <div className={classes.title_right}>
        <NewIcon
          className={classes.like_icon}
          src={isLikeData?.data.body.data ? FullHeartIcon : HeartIcon}
          alt="heart_icon"
          onClick={updateLikeOnClick}
        />
        {props.nickname == currentUserNickname && (
          <Select
            trigger={<NewIcon src={SettingIcon} alt="setting_icon" />}
            style={{
              width: '110px',
              right: 0,
              fontSize: '16px',
              textAlign: 'center',
            }}
            onChange={handleOnClickBySelect}
            options={['글 수정', '글 삭제']}
          />
        )}
      </div>
    </div>
  );
};

interface SectionCategoryProps
  extends Pick<
    SectionHeaderProps,
    'recruitNum' | 'onlineOrOffline' | 'status' | 'period' | 'postId'
  > {
  nickName: string;
}

const SectionCategory = ({
  nickName,
  recruitNum,
  onlineOrOffline,
  status,
  period,
  postId,
}: SectionCategoryProps) => {
  const updatePostStatusQuery = useUpdatePostStatus(postId);
  const { nickname: currentUserNickname } = useRecoilValue(UserState);
  const changeStatusOnClickByButton = () => {
    updatePostStatusQuery.mutateAsync();
  };

  return (
    <div className={classes.category_wrap}>
      <div className={classes.flex_wrap + ' ' + classes.category_left}>
        <div className={classes.category_item}>{onlineOrOffline}</div>
        <div className={classes.category_item}>{recruitNum + '명'}</div>
        <div className={classes.category_item}>
          {checkingDetailPeriod(period)}
        </div>
      </div>
      <div className={classes.category_right}>
        {nickName === currentUserNickname ? (
          <div
            className={
              status === 'Y'
                ? [classes.status_button, classes.hover].join(' ')
                : [classes.status_button, classes.hover, classes.false].join(
                    ' ',
                  )
            }
            onClick={changeStatusOnClickByButton}
          >
            {status === 'Y' ? '모집중' : '모집완료'}
          </div>
        ) : (
          <div
            className={
              status === 'Y'
                ? classes.status_button
                : [classes.status_button, classes.false].join(' ')
            }
          >
            {status === 'Y' ? '모집중' : '모집완료'}
          </div>
        )}
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

const RightSidebar = () => {
  return (
    <aside className={classes.aside_right}>
      <JoinerCheck />
    </aside>
  );
};
