import { NewIcon } from '@components/atoms/Icon/NewIcon';
import { ToggleIconProps } from 'types/icon.types';
import classes from './toggleIcon.module.scss';
import DownIcon from '@assets/svg/toggle-icon.svg';
export function ToggleIcon({ imageUrl, onClick }: ToggleIconProps) {
  return (
    <span>
      <div className={classes.flex}>
        <NewIcon
          src={imageUrl}
          alt="user_profile_img"
          style={{ width: '60px', height: '60px', borderRadius: '50%' }}
          onClick={onClick}
        />
        <NewIcon
          src={DownIcon}
          className="DownIcon"
          alt="down_toggle_icon"
          width={20}
          height={20}
          onClick={onClick}
        />
      </div>
    </span>
  );
}
