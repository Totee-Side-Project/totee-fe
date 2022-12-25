import { Icon } from '@components/atoms';
import { ToggleIconProps } from 'types/icon.types';
import DownIcon from '@assets/svg/toggle-icon.svg';
import classes from './toggleIcon.module.scss';

export function ToggleIcon({ imageUrl, onClick }: ToggleIconProps) {
  return (
    <span>
      <div className={classes.flex}>
        <Icon
          src={imageUrl}
          alt="user_profile_img"
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          onClick={onClick}
        />
        <Icon
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
