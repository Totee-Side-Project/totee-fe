
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


export const checkingDetailPeriod = (period:string) => {
    if (period == 'VeryShortTerm') {
      return <span>1개월미만</span>;
    } else if (period == 'ShortTerm') {
      return <span>1~3개월</span>;
    } else if (period == 'MidTerm') {
      return <span>3~6개월</span>;
    } else if (period == 'LongTerm') {
      return <span>6개월이상</span>;
    } else {
      return null;
    }
};