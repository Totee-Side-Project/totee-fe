import type { ChangeEvent, MouseEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
import { useUpdateLike, useUpdatePostStatus } from '@hooks/useMutateQuery';
import { checkingDetailPeriod } from '@utils/handleSelectValue';
import { replaceLineBreakTagIntoString } from '@utils/replaceLineBreakStringIntoTag';

import { UserState } from '@store/index';
import { Select } from '@components/ui/Select/Select';
import { useDeletePost } from '@hooks/usePostQuery';
import { useCustomNavigate } from '@hooks/useCustomNavigate';
import {
  SubmitCommentButton,
  SubmitModifyButton,
  SubmitReplyButton,
} from '@components/common/detail/Button/Button';
import classes from './newDetailPage.module.scss';

interface ICommentDto {
  nickname: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  profileImageUrl: string;
}

export interface IPostCommentDto extends ICommentDto {
  commentId: number;
  replyList: IReplyDto[];
}
export interface IReplyDto extends ICommentDto {
  commentId(commentId: any): unknown;
  replyId: number;
}

export interface IResponsePostDetail {
  postId: number;
  title: string;
  content: string;
  nickname: string;
  view: number;
  likeNum: number;
  commentNum: number;
  commentDTOList: IPostCommentDto[];
  imageUrl: string;
  createdAt: string;
  onlineOrOffline: string;
  period: string;
  status: string;
  positionList: string[];
  skillList: string[];
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
  const { data: postData, status, refetch } = useGetPostByPostId(Number(id));

  // Render Loading Component
  if (status === 'loading')
    return (
      <div>
        <main className={classes.study_detail_page_main}>
          <LeftSidebar />
          <NewDetailPageSection>
            <SectionHeader>
              <h1 className={classes.title_left}>
                <Skeleton height={30} />
              </h1>
            </SectionHeader>
            <article className={classes.content_container}>
              <Line className={classes.detail_line} />
              <div className={classes.content_wrap}>
                <Skeleton count={3} height={20} />
              </div>
              <Line className={classes.detail_line} />
            </article>
          </NewDetailPageSection>
          <RightSidebar />
        </main>
      </div>
    );
  if (status === 'success') {
    const responseData: IResponsePostDetail = postData?.data.body.data;
    return (
      <div>
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
              <SectionContactView postData={postData.data.body.data} />
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

const Comments = ({
  commentDTOList,
  postId,
}: Pick<IResponsePostDetail, 'commentDTOList' | 'postId'>) => {
  return (
    <div className={classes.comment_wrap}>
      <div className={classes.comment_list_wrap}>
        <NewComments commentDTOList={commentDTOList} postId={postId} />
      </div>
      <CommentSubmitArea postId={postId} type={'comment'} />
    </div>
  );
};

export const CommentSubmitArea = ({
  postId,
  comment,
  reply,
  type,
  isModify = false,
  isReply,
  toggleParentBoolean,
}: {
  postId: number;
  comment?: IPostCommentDto;
  reply?: IReplyDto;
  type: 'comment' | 'reply';
  isModify?: boolean;
  isReply?: boolean;
  toggleParentBoolean?: () => void;
}) => {
  const [formData, setFormData] = useState('');
  useEffect(() => {
    if (comment?.content && isModify) {
      const newValue = replaceLineBreakTagIntoString(comment.content);
      setFormData(newValue);
    }
    if (reply?.content && isModify) {
      const newValue = replaceLineBreakTagIntoString(reply.content);
      setFormData(newValue);
    }
  }, [comment?.content, isModify]);

  const onChangeCommentValueByTextrea = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setFormData(e.target.value);
  const onClickCancleButton = () =>
    toggleParentBoolean && toggleParentBoolean();

  return (
    <>
      <textarea
        className={classes.comment_textarea}
        placeholder={
          isModify
            ? ''
            : type === 'reply'
            ? '답글을 입력해주세요'
            : '댓글을 입력해주세요'
        }
        value={formData}
        onChange={onChangeCommentValueByTextrea}
      />
      <div className={classes.comment_button_wrap}>
        {isModify || isReply ? (
          <Button
            className={classes.cancle_button}
            text={'취소'}
            onClick={onClickCancleButton}
          />
        ) : null}
        {type === 'comment' && !isModify ? (
          <SubmitCommentButton
            formData={formData}
            postId={postId}
            clearParentFormData={() => setFormData('')}
          />
        ) : isModify ? (
          <SubmitModifyButton
            formData={formData}
            postId={postId}
            replyId={reply ? reply?.replyId : undefined}
            comment={comment as IPostCommentDto}
            toggleParentBoolean={toggleParentBoolean}
            clearParentFormData={() => setFormData('')}
          />
        ) : (
          <SubmitReplyButton
            postId={postId}
            formData={formData}
            comment={comment as IPostCommentDto}
            toggleParentBoolean={toggleParentBoolean}
            clearParentFormData={() => setFormData('')}
          />
        )}
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
  const navigate = useNavigate();

  const updateLikeOnClick = () => updateLikeQuery.mutateAsync(props.postId);
  const handleOnClickBySelect = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const target = e.target as HTMLLIElement;
    const { innerText } = target;

    if (innerText === '글 수정') {
      navigate('/setupstudy');
      navigate(`/edit/${props.postId}`);
      return;
    }
    deletePostQuery.mutateAsync().then(
      (res) =>
        res.status === 200 &&
        Swal.fire({
          title: '게시물 삭제',
          text: '게시물 삭제가 완료되었습니다.',
          timer: 2000,
        })
          .then(() => navigate(-1))
          .catch((err) => err),
    );
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

const SectionContactView = ({
  postData,
}: {
  postData: IResponsePostDetail;
}) => {
  return (
    <div className={classes.contact_view_wrap}>
      {/* <div style={{ margin: '30px 5%', textAlign: 'left' }}> */}
      <p>
        진행지역{' : '}
        {!postData.detailedRegion ? '온라인으로 진행' : postData.detailedRegion}
      </p>
      <p>
        연락방식{' : '}
        <a
          href={postData.contactLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {postData.contactMethod}
        </a>
      </p>
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
