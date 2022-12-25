export interface IIconProps {
  imageUrl: string;
  style: {
    width: string;
    height: string;
  };
  onClick: () => void;
}

export interface ToggleIconProps extends IIconProps {}

export interface AlarmIconProps {
  imageUrl: string;
  onClick: () => void;
  isShowAlarm: boolean;
  setIsShowAlarm: (e: boolean) => void;
}
