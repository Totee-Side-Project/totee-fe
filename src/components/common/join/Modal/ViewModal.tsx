import React, { useCallback } from 'react';
import { Button, Modal } from '@components/atoms';
import './joinerViewModal.scss';
import { IApplicantDetail, IGetApplicantResponse } from '@api/responseType';
import { usePostTeam } from '@hooks/useMutateQuery';
import { useParams } from 'react-router-dom';

interface IViewModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  applicant: IApplicantDetail;
}

export function ViewModal({ isOpen, setIsOpen, applicant }: IViewModalProps) {
  const { id } = useParams();
  const postTeamMutation = usePostTeam(id as string);

  const approveTeamOnClick = useCallback(
    () =>
      postTeamMutation
        .mutateAsync({
          accept: true,
          nickname: applicant.nickname,
        })
        .then((response) => {
          if (response.status === 200) {
            return alert('팀원 승인을 완료했어요.');
          }
          alert('팀원 승인이 실패했어요');
        }),
    [applicant.nickname],
  );
  const rejectTeamOnClick = useCallback(
    () =>
      postTeamMutation
        .mutateAsync({
          accept: false,
          nickname: applicant.nickname,
        })
        .then((response) => {
          if (response.status === 200) {
            return alert('팀원 거부를 완료했어요.');
          }
          alert('팀원 거부를 실패했어요');
        }),
    [applicant.nickname],
  );

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="ApplyModalWrapper">
          {/*<section className="ApplyModalWrapper">*/}
          <div className="ApplyTitle">지원자 보기</div>
          <div className="SubTitle">지원자의 승인여부를 결정해주세요.</div>
          <div>
            <div
              className="ApplyProfile"
              // style={{
              //   backgroundRepeat: 'no-repeat',
              //   backgroundSize: 'cover',
              // }}
            ></div>
            <div className="ApplyName">{applicant.nickname}</div>
            <div className="ApplyEmail">dlapdlf@gmail.com</div>
            {/* <div className="AppliMessage">{applicant.message}</div> */}
            <div className="ApplyMessage">
              본인에 대한 짧은 소개입니다. 본인에 대한 짧은 소개입니다. 본인에
              대한 짧은 소개입니다. 본인에 대한 짧은 소개입니다.본인에 대한 짧은
              소개입니다. 본인에 대한 짧은 소개입니다. 본인에 대한 짧은
              소개입니다. 본인에 대한 짧은 소개입니다.본인에 대한 짧은
              소개입니다. 본인에 대한 짧은 소개입니다. 본인에 대한 짧은
              소개입니다. 본인에 대한 짧은 소개입니다.
            </div>
            {/* <textarea
              className="ApplyIntro"
              placeholder="본인에 대한 짧은 소개입니다. 본인에 대한 짧은 소개입니다. 본인에 대한 짧은 소개입니다. 본인에 대한 짧은 소개입니다."
            /> */}
            <div className="BtnWrapper">
              <Button
                text="승인 거부"
                style={{
                  color: '#fff',
                  width: '210px',
                  backgroundColor: '#568A35',
                  margin: '30px auto 0 auto',
                }}
                onClick={rejectTeamOnClick}
              ></Button>
              <Button
                text="승인 허용"
                style={{
                  color: '#fff',
                  width: '210px',
                  backgroundColor: '#568A35',
                  margin: '30px auto 0 auto',
                }}
                onClick={approveTeamOnClick}
              ></Button>
            </div>
            {/*<a style={{ display: 'none' }}></a>*/}
            {/*<a style={{ display: 'none' }}></a>*/}
          </div>
          {/*</section>*/}
        </div>
      </Modal>
    </>
  );
}
