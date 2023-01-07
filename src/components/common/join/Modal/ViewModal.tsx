import { useCallback } from 'react';
import { Button, Modal } from '@components/atoms';
import { IApplicantDetail } from 'types/api.types';
import { usePostTeam } from '@hooks/query/useMutateQuery';
import { useParams } from 'react-router-dom';
import './joinerViewModal.scss';
import Swal from 'sweetalert2';

interface IViewModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  applicant: IApplicantDetail;
}

export function ViewModal({ isOpen, setIsOpen, applicant }: IViewModalProps) {
  const { id } = useParams();
  const postTeamMutation = usePostTeam(Number(id));
  const approveTeamOnClick = useCallback(() => {
    postTeamMutation
      .mutateAsync({
        accept: true,
        nickname: applicant.nickname,
      })
      .then((response) => {
        if (response.status === 200) {
          return Swal.fire({
            title: '승인 완료',
            text: '마이페이지에서 확인하세요',
            icon: 'success',
            confirmButtonText: '확인',
            timer: 3000,
          });
        }
        return Swal.fire({
          title: '승인 실패',
          text: '재시도 해주세요',
          icon: 'error',
          confirmButtonText: '확인',
        });
      });
  }, [applicant.nickname]);

  const rejectTeamOnClick = useCallback(
    () =>
      postTeamMutation
        .mutateAsync({
          accept: false,
          nickname: applicant.nickname,
        })
        .then((response) => {
          if (response.status === 200) {
            return Swal.fire({
              title: '팀원 거부 완료',
              text: '',
              icon: 'success',
              confirmButtonText: '확인',
              timer: 2000,
            });
          }
          return Swal.fire({
            title: '팀원 거부 실패',
            text: '다시 한번 시도해주세요',
            icon: 'error',
            confirmButtonText: '확인',
            timer: 2000,
          });
        }),
    [applicant.nickname],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="ApplyModalWrapper">
        <div className="ApplyTitle">지원자 보기</div>
        <div className="SubTitle">지원자의 승인여부를 결정해주세요.</div>
        <div>
          <div className="ApplyProfile">
            <img src={applicant.profileImg} alt="applicant_profile_img" />
          </div>
          <div className="ApplyName">{applicant.nickname}</div>
          <div className="ApplyEmail">{applicant.email}</div>
          <div className="ApplyMessage">{applicant.message}</div>
          <div className="BtnWrapper">
            <Button
              center="승인 거부"
              style={{
                color: '#fff',
                width: '210px',
                backgroundColor: '#568A35',
                margin: '30px auto 0 auto',
              }}
              onClick={rejectTeamOnClick}
            ></Button>
            <Button
              center="승인 허용"
              style={{
                color: '#fff',
                width: '210px',
                backgroundColor: '#568A35',
                margin: '30px auto 0 auto',
              }}
              onClick={approveTeamOnClick}
            ></Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
