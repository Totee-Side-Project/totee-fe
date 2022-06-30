export const modalAnimation = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  end: {
    opacity: 0,
    y: 50,
    scale: 0.5,
    transition: {
      duration: 0.3,
    },
  },
};
export const backgroundAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  end: {
    opacity: 0,
  },
};
