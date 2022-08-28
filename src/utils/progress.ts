import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  speed: 1500,
  showSpinner: false,
  trickleSpeed: 150,
  minimum: 0.1,
});

const progress = {
  start: NProgress.start,
  done: NProgress.done,
};

export default progress;
