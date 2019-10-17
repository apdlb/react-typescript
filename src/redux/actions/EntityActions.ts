import _ from 'lodash';
import { createAction } from 'redux-actions';

import { apiFetch } from '../../services';
import { urlEntities } from '../../services/urls';
import CONSTANTS from '../../utils/constants';

const generateFilter = ({ mode = 'paginate', page = 1, pageSize = CONSTANTS.PAGE_SIZE_10, sort, order, ...filters }: any) => {
  let query = '';

  if (mode === 'paginate') {
    query = `${query}&page=${page}`;
    query = `${query}&pageSize=${pageSize}`;
  }

  if (sort && order) {
    query = `${query}&sort=${sort}`;
    query = `${query}&order=${CONSTANTS.ORDER_ANTD_TABLE_ORDER_MAP.get(order)}`;
  }

  if (!_.isEmpty(filters)) {
    for (const key of Object.keys(filters)) {
      if (filters[key]) {
        query = `${query}&${key}=${filters[key]}`;
      }
    }
  }

  return query ? `?${query}` : query;
};

export const cleanEntities = createAction(CONSTANTS.ACTION_CLEAN_ENTITIES, () => {});
export const listEntities = createAction(CONSTANTS.ACTION_LIST_ENTITIES, (filters = {}) =>
  apiFetch({ method: CONSTANTS.GET, url: urlEntities + generateFilter(filters) })
);
export const setListEntitiesParams = createAction(CONSTANTS.ACTION_SET_LIST_ENTITIES_PARAMS, (params: any) => params);
