export interface IIconProps{
    imageUrl : string;
    style:{
        width:string;
        height:string;
    }
    onClick:()=>void;
}

export interface ToggleIconProps extends IIconProps{
    userInfo:{
        nickname:string;
        email:string;
    }
    handleLogout:()=>void;
    isShowToggle:boolean;
}
