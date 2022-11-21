// 값의 유무만을 통해 boolean을 return하는 함수

export const validateData = (data: string | number | object) => {
  if (typeof data === 'object') {
    const ObjectValues = Object.values(data);

    for (let value of ObjectValues) {
      if (typeof value === 'object' && !value.join('')) return false;
      if (!value) return false;
    }
  }
  if (!data) return false;

  return true;
};

export const validateFormData = (formData: FormData) => {
  for (const [key, value] of formData) {
    if (!value) return false;
  }
  return true;
};
