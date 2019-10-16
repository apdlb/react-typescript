import { createAction } from 'redux-actions';

import { apiFetch } from '../../services';
import { urlEntities } from '../../services/urls';
import CONSTANTS from '../../utils/constants';

const generateFilter = ({ mode = 'paginate', page, pageSize, sort, order, ...filters }: any) => {
  let query = '';

  if (mode === 'paginate') {
    if (page && pageSize) {
      query = `${query}&page=${page}`;
      query = `${query}&pageSize=${pageSize}`;
    }
  }

  if (sort && order) {
    query = `${query}&sort=${sort}`;
    query = `${query}&order=${CONSTANTS.ORDER_ANTD_TABLE_ORDER_MAP.get(order)}`;
  }

  return query ? `?${query}` : query;
};

export const cleanEntities = createAction(CONSTANTS.ACTION_CLEAN_ENTITIES, () => {});
export const listEntities = createAction(CONSTANTS.ACTION_LIST_ENTITIES, (filters = {}) =>
  apiFetch({ method: CONSTANTS.GET, url: urlEntities + generateFilter(filters) })
);
