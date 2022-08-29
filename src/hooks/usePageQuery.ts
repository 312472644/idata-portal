import { IPagination, IQuery, IResultPageVO } from '@interface/index';
import { AxiosPromise } from 'axios';
import { reactive, ref } from 'vue';

/**
 *
 *
 * @return {*}
 */
const usePageQuery = <T>(api: (params: IQuery<any>) => AxiosPromise<IResultPageVO<any>>) => {
  const dataList = ref<T[]>([]);
  // 表格loading
  const loading = ref(false);
  // 分页对象
  const pageVO = reactive<IPagination>({
    pageNumber: 1,
    pageSize: 10,
    total: 0,
  });
  // 获取查询条件
  const getQueryParam = (condition: any): IQuery<any> => {
    const { pageSize, pageNumber } = pageVO;
    return {
      condition: condition,
      page: {
        pageNumber,
        pageSize,
      },
    };
  };
  // 获取列表数据
  const getDataList = (pageNumber?: number, condition?: any) => {
    loading.value = true;
    pageVO.pageNumber = pageNumber || pageVO.pageNumber;
    const params = getQueryParam(condition);
    api(params)
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
    pageVO.pageNumber = pageNumber;
    getDataList();
  };
  // 页码查询
  const sizeChange = (pageSize: number) => {
    pageVO.pageSize = pageSize;
    getDataList(1);
  };
  return { loading, pageVO, dataList, getDataList, currentChange, sizeChange };
};

export default usePageQuery;
