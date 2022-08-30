import { IPagination, IQuery, IResultPageVO } from '@interface/index';
import { AxiosPromise } from 'axios';
import { reactive, ref } from 'vue';

/**
 *
 *
 * @return {*}
 */
const usePageQuery = <T>(
  api: (params: IQuery<any>) => AxiosPromise<IResultPageVO<any>>,
  queryParam: { [prop: string]: any }
) => {
  const dataList = ref<T[]>([]);
  // 表格loading
  const loading = ref(false);
  // 查询条件
  const condition = reactive(queryParam);
  // 分页对象
  const pageVO = reactive<IPagination>({
    pageNumber: 1,
    pageSize: 10,
    total: 0,
  });
  // 获取查询条件
  const getQueryParam = (): IQuery<any> => {
    const { pageSize, pageNumber } = pageVO;
    return {
      condition,
      page: {
        pageNumber,
        pageSize,
      },
    };
  };
  // 获取列表数据
  const getDataList = (pageNumber?: number) => {
    loading.value = true;
    pageVO.pageNumber = pageNumber || pageVO.pageNumber;
    api(getQueryParam())
      .then(res => {
        const { data } = res.data;
        dataList.value = data.list;
        pageVO.total = data.total;
      })
      .finally(() => {
        loading.value = false;
      });
  };
  // 分页查询
  const currentChange = (pageNumber: number) => {
    console.log('pageNumber', pageNumber);
    pageVO.pageNumber = pageNumber;
    getDataList();
  };
  // 页码查询
  const sizeChange = (pageSize: number) => {
    pageVO.pageSize = pageSize;
    getDataList(1);
  };

  // 重置查询
  const resetQuery = () => {
    for (const prop in condition) {
      condition[prop] = '';
    }
    pageVO.pageNumber = 1;
    getDataList(1);
  };

  return { loading, pageVO, dataList, getDataList, currentChange, sizeChange, resetQuery };
};

export default usePageQuery;
