
export const handleSelectValues=(variable:string)=>{
    const SeletValueNames:any={
        '모집구분':'categoryName',
        '모집인원':'recruitNum',
        '진행방식':'onlineOrOffline',
        '진행기간':'period',
        '연락방식':'contactMethod'
    } as {
        [key: string]:string;
    }
    return SeletValueNames[variable];
}
