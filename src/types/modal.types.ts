

export interface IModalPropsType{
    step: number;
    setStep: (e:number)=>void;
    values:{
        nickname : string;
        position : string;
        profileImage : any;
    }
    setValues:(e:any)=>void;
    setIsOpenModal?:(e:boolean)=>void;
    onClickConfimButton?:()=>void;
}

