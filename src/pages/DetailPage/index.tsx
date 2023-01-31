import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import {
  CommentCountView,
  SectionCategory,
  SectionComments,
  SectionContactView,
  SectionContent,
  SectionTitle,
} from '@components/domains/detail';
import { Icon, Line } from '@components/atoms';
import JoinerCheck from '@components/common/join/JoinerCheck/JoinerCheck';
import { useGetPostByPostId } from '@hooks/query/useGetQuery';
import { useCustomNavigate } from '@hooks/useCustomNavigate';
import LeftArrowHasBorderIcon from '@assets/svg/common/left_arrow_has_border.svg';

import classes from './DetailPage.module.scss';
import { IResponsePostDetail } from '@api/post/types';

interface IchildrenReactNode {
  children: ReactNode;
}

const DetailPage = () => {
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
              <CommentCountView
                likeNum={responseData.likeNum}
                commentNum={responseData.commentNum}
                view={responseData.view}
              />
              <SectionComments
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

const LeftSidebar = () => {
  const { navigatePrevious } = useCustomNavigate();
  return (
    <aside className={classes.aside_left}>
      <Icon
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

const SectionHeader = ({ children }: IchildrenReactNode) => {
  return <header>{children}</header>;
};

const SectionFooter = ({ children }: IchildrenReactNode) => {
  return <footer>{children}</footer>;
};

const NewDetailPageSection = ({ children }: IchildrenReactNode) => {
  return <section className={classes.center_section}>{children}</section>;
};

const RightSidebar = () => {
  return (
    <aside className={classes.aside_right}>
      <JoinerCheck />
    </aside>
  );
};

export default DetailPage;
