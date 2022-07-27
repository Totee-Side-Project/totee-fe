
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
      return '1개월미만';
    } else if (period == 'ShortTerm') {
      return '1~3개월';
    } else if (period == 'MidTerm') {
      return '3~6개월';
    } else if (period == 'LongTerm') {
      return '6개월이상';
    } else {
      return null;
    }
};