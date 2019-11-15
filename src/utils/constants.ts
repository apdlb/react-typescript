const CONSTANTS = {} as any;

CONSTANTS.GET = "GET";
CONSTANTS.POST = "POST";
CONSTANTS.PUT = "PUT";
CONSTANTS.PATCH = "PATCH";
CONSTANTS.DELETE = "DELETE";

CONSTANTS.LANGUAGE_EN = "en";
CONSTANTS.LANGUAGE_ES = "es";
CONSTANTS.AVAILABLE_LANGUAGES = [CONSTANTS.LANGUAGE_EN, CONSTANTS.LANGUAGE_ES];

CONSTANTS.ORDER_ASC = "asc";
CONSTANTS.ORDER_DESC = "desc";
CONSTANTS.ANTD_TABLE_ORDER_ASC = "ascend";
CONSTANTS.ANTD_TABLE_ORDER_DESC = "descend";
CONSTANTS.ORDER_ANTD_TABLE_ORDER_MAP = new Map([
  [CONSTANTS.ANTD_TABLE_ORDER_ASC, CONSTANTS.ORDER_ASC],
  [CONSTANTS.ANTD_TABLE_ORDER_DESC, CONSTANTS.ORDER_DESC]
]);

CONSTANTS.PAGE_1 = 1;
CONSTANTS.PAGE_SIZE_2 = 2;
CONSTANTS.PAGE_SIZE_5 = 5;
CONSTANTS.PAGE_SIZE_10 = 10;
CONSTANTS.PAGE_SIZE_20 = 20;

// ACTIONS
CONSTANTS.NOTHING_ACTION = "NOTHING_ACTION";

// AUTH
CONSTANTS.ACTION_CLEAN_AUTH = "ACTION_CLEAN_AUTH";
CONSTANTS.ACTION_LOGIN = "ACTION_LOGIN";

// ENTITIES
CONSTANTS.ACTION_CLEAN_ENTITIES = "ACTION_CLEAN_ENTITIES";
CONSTANTS.ACTION_LIST_ENTITIES = "ACTION_LIST_ENTITIES";
CONSTANTS.ACTION_SET_LIST_ENTITIES_PARAMS = "ACTION_SET_LIST_ENTITIES_PARAMS";
CONSTANTS.ACTION_GET_ENTITY = "ACTION_GET_ENTITY";

export default CONSTANTS;
