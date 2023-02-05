import { useLogout } from '@hooks/useLogout';
import { UserState } from '@store/user';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import classes from './userDropDown.module.scss';

interface HeaderDropDownProps {
  isOpen: boolean;
  close: () => void;
}
export const HeaderDropDown = ({ isOpen, close }: HeaderDropDownProps) => {
  const user = useRecoilValue(UserState);
  const navigate = useNavigate();
  const handleLogount = useLogout();
  const options: [string, () => void][] =
    user.roleType === 'admin'
      ? [
          ['관리자 페이지', () => navigate('admin')],
          ['로그아웃', () => handleLogount()],
        ]
      : [
          [
            '내 정보 수정',
            () => {
              navigate('mypage');
              close();
            },
          ],
          ['로그아웃', () => handleLogount()],
        ];

  return isOpen && user ? (
    <div className={classes.dropDownContainer}>
      <div className={classes.dropDownWrap}>
        <div className={classes.dropDownSection}>
          <div className={classes.dropDownTitle}>
            <h1>{user.nickname}</h1>
          </div>
          <div className={classes.dropDownSubTitle}>
            <p>{user.roleType}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div className={classes.dropDownOptions}>
          <ul>
            {options.map(([text, onClick]) => (
              <li key={text} onClick={onClick}>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : null;
};
