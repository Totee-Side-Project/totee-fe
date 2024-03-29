// import { PostRequestDto } from '@api/requestType';
import { ReactComponent as XIcon } from '@assets/svg/xicon.svg';
import { Editor } from '@components/common';
import { MentorModal } from '../MentorModal/MentorModal';
import './createMentorModal.module.scss';
import classes from './createMentorModal.module.scss';

interface IMentorPostViewModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  isCloseBtn?: boolean;
  // form: PostRequestDto;
  // onChangeByEditor: (content: any) => void;
}

export function CreateMentorModal({
  isOpen,
  setIsOpen,
}: // form,
// onChangeByEditor,
IMentorPostViewModalProps) {
  // Editor에서 필요로하는 values를 state로 선언
  // Editor에서 필요로하는 onChange함수 선언

  return (
    <MentorModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={classes.createMentorModal}>
        <div className={classes.headerBox}>
          <div className={classes.headerTitle}>글쓰기</div>
          <div className={classes.closeBtn} onClick={() => setIsOpen(!isOpen)}>
            <XIcon />
          </div>
        </div>
        <div className={classes.contentWrapper}>
          <div className={classes.profile}>
            <img className={classes.img} />
            <div className={classes.name}>모각코고인물</div>
          </div>
          <input
            className={classes.titleInput}
            placeholder="제목을 입력해주세요."
          />
          {/* <textarea className={classes.content} placeholder="에디터 추가" /> */}

          {/*<Editor /> */}
          <div className={classes.priceWrapper}>
            <div className={classes.priceBox}>1회 멘토링 비용</div>
            <div className={classes.priceInput}>선택안함</div>
          </div>
          <div className={classes.priceText}>
            ※ 해당 옵션은 토티 인증이 완료된 분들만 사용이 가능합니다.
          </div>
        </div>
        <div className={classes.bottomBox}>
          <div className={classes.btn}>등록하기</div>
        </div>
      </div>
    </MentorModal>
  );
}

export default CreateMentorModal;
