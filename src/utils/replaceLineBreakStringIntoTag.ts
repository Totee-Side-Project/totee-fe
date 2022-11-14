export const replaceLineBreakStringIntoTag = (text: string) => {
  const textList = text.split('\n\n');

  const result: string[] = [];

  textList.forEach((text) => {
    if (text === '') return;
    result.push(text.replace(/^\n*/g, '').replace(/\n+/g, '<br/>'));
  });
  return result;
};

export const replaceLineBreakTagIntoString = (text: string) => {
  return text
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '\n\n')
    .replace(/<br\/>/g, '\n');
};
