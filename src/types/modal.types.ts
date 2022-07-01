export interface IModalPropsType{
    step: number;
    setStep: (e:number)=>void;
    values:{
        grade: string;
        nickname : string;
        position : string;
        profileImage : any;
    }
    setValues:(e:any)=>void;
}