import { reactive, computed } from 'vue';
import { useStore, createNamespacedHelpers } from 'vuex';

/**
 * vuex mapState 转化成可相应对象
 *
 * @param {string} moduleName 命名空间
 * @param {string[]} [mapper=[]]
 */
const useState = (moduleName: string, mapper: string[] = []) => {
  const store = useStore();
  const storeMap = createNamespacedHelpers(moduleName).mapState(mapper);
  const stateMap: any = reactive({});
  Object.keys(storeMap).forEach(key => {
    stateMap[key] = computed(() => store.state[moduleName][key]);
  });
  return stateMap;
};

export default useState;
