import dayjs from 'dayjs';

export function handleTime(date: string) {
  // 초 (밀리초)
  const seconds = 1;
  // 분
  const minute = seconds * 60;
  // 시
  const hour = minute * 60;
  // 일
  const day = hour * 24;

  let today = new Date();
  let writeDate = new Date(date);

  let elapsedTime = Math.trunc((today.getTime() - writeDate.getTime()) / 1000);
  let elapsedText = '';
  if (elapsedTime < seconds) {
    elapsedText = '방금 전';
  } else if (elapsedTime < minute) {
    elapsedText = elapsedTime + '초 전';
  } else if (elapsedTime < hour) {
    elapsedText = Math.trunc(elapsedTime / minute) + '분 전';
  } else if (elapsedTime < day) {
    elapsedText = Math.trunc(elapsedTime / hour) + '시간 전';
  } else if (elapsedTime < day * 15) {
    elapsedText = Math.trunc(elapsedTime / day) + '일 전';
  } else {
    elapsedText = dayjs(date).format('YY.MM.DD');
  }

  return elapsedText;
}
