type configureType = {
  speed: number; // 动画完成速度
  showSpinner: boolean; // 是否显示加载ico
  trickleSpeed: number; // 自动递增间隔
  minimum: number; // 初始化时的最小百分比
};

declare module 'nprogress' {
  const progress: {
    configure: (config: configureType) => void;
    start: () => void;
    done: () => void;
  };
  export default progress;
}
