import { animateScroll } from 'react-scroll';

export const scrollToBottom = (id: string) => {
  console.log('scrollToBottom');

  animateScroll.scrollToBottom({ containerId: id, duration: 0 });
};

export const scrollToBottomAnimated = (id: string) => {
  console.log('scrollToBottomAnimated');

  animateScroll.scrollToBottom({ containerId: id, duration: 250 });
};
