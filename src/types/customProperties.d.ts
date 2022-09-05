export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    vLoading: (key: string) => boolean;
  }
}
