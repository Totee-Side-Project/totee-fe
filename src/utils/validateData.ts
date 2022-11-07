// 값의 유무만을 통해 boolean을 return하는 함수

export const validateData = (data: string | number | object) => {
  if (typeof data === 'object') {
    Object.values(data).forEach((value) => {
      if (!value) return false;
    });
  }
  if (!data) return false;

  return true;
};
