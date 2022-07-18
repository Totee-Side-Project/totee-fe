import ScrollTopBtn from '../../../assets/scrolltopBtn.svg';
import classes from './scrolltopButton.module.scss';

export function ScrollTopButton() {
  const handleScroll = (e) => {
    if (!window.scrollY) return;

    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div>
      <div onClick={handleScroll} className={classes.ScrollTopBtn}>
        <img src={ScrollTopBtn} alt="페이지상단으로" />
      </div>
    </div>
  );
}
