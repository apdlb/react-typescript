import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Collapse, Divider, Icon, Input, InputNumber } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form/Form';
import _ from 'lodash';
import React, { memo } from 'react';
import { Translate } from 'react-localize-redux';

import {
  ENTITIES_PAGINATED,
  GET_ENTITIES_PAGINATED,
  PAGINATE_ENTITIES_PARAMS,
  SET_ENTITIES_PAGINATED,
  SET_PAGINATE_ENTITIES_PARAMS
} from '../../../graphql/entities';
import CONSTANTS from '../../../utils/constants';
import FormItem from '../../shared/forms/FormItem';

interface Props extends FormComponentProps {
  onReset: React.MouseEventHandler<HTMLElement>;
}

const EntitiesFormFilter: React.FunctionComponent<Props> = props => {
  const { form, onReset } = props;

  const [setEntitiesPaginated] = useMutation(SET_ENTITIES_PAGINATED, {
    update: (cache, res) => {
      const data = cache.readQuery({
        query: ENTITIES_PAGINATED
      }) as any;

      const dataClone = {
        ...data,
        entitiesPaginated: {
          ...res?.data?.setEntitiesPaginated
        }
      };

      cache.writeQuery({
        query: ENTITIES_PAGINATED,
        data: dataClone
      });
    }
  });

  const [getEntitiesPaginated] = useLazyQuery(GET_ENTITIES_PAGINATED, {
    onCompleted: data => {
      setEntitiesPaginated({
        variables: {
          entitiesPaginated: data?.getEntitiesPaginated
        }
      });
    }
  });

  const [setPaginateEntitiesParams] = useMutation(
    SET_PAGINATE_ENTITIES_PARAMS,
    {
      update: (cache, res) => {
        const data = cache.readQuery({
          query: PAGINATE_ENTITIES_PARAMS
        }) as any;

        const dataClone = {
          ...data,
          paginateEntitiesParams: {
            ...res?.data?.setPaginateEntitiesParams
          }
        };

        cache.writeQuery({
          query: PAGINATE_ENTITIES_PARAMS,
          data: dataClone
        });
      }
    }
  );

  // Get params of pagination from cache
  const { data: dataPaginateEntitiesParamsCached } = useQuery(
    PAGINATE_ENTITIES_PARAMS
  );

  const {
    paginateEntitiesParams: { __typename, ...restParams } = {} as any
  } = dataPaginateEntitiesParamsCached;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { page, pageSize, ...rest } = restParams;
    const params = {
      page: CONSTANTS.PAGE_1,
      pageSize: CONSTANTS.PAGE_SIZE_2,
      ...rest,
      ..._.pickBy(form.getFieldsValue(), _.identity)
    };

    getEntitiesPaginated({
      variables: { filter: params }
    });
    setPaginateEntitiesParams({
      variables: { params }
    });
  };

  return (
    <Translate>
      {({ translate }) => {
        return (
          <>
            <Collapse bordered={false}>
              <Collapse.Panel
                key="filter"
                header={
                  <>
                    <Divider orientation="left">
                      <Icon
                        type="filter"
                        style={{ marginRight: "10px" }}
                      ></Icon>
                      {translate("generic.labels.filters")}
                    </Divider>
                  </>
                }
              >
                <Form
                  className="grid-entities-filter-form"
                  onSubmit={onSubmit}
                  layout="vertical"
                >
                  <div className="grid-entities-filter-form-inputs">
                    <FormItem
                      form={form}
                      className="grid-entities-filter-form-input-field1"
                      field="field1"
                      label={translate("entities.labels.field1")}
                    >
                      <Input
                        placeholder={`${translate("entities.labels.field1")}`}
                      />
                    </FormItem>

                    <FormItem
                      form={form}
                      className="grid-entities-filter-form-input-field2"
                      field="field2"
                      label={translate("entities.labels.field2")}
                      rules={[
                        {
                          type: "number",
                          message: translate("validations.number", {
                            input: translate("entities.labels.field2")
                          })
                        }
                      ]}
                    >
                      <InputNumber
                        placeholder={`${translate("entities.labels.field2")}`}
                      />
                    </FormItem>
                  </div>
                  <div className="grid-entities-filter-form-buttons">
                    <Form.Item>
                      <Button htmlType="submit" type="primary">
                        {translate("generic.labels.filter")}
                      </Button>
                      <Button type="link" onClick={onReset}>
                        {translate("generic.labels.reset")}
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </Collapse.Panel>
            </Collapse>
            <Divider />
          </>
        );
      }}
    </Translate>
  );
};

const WrappedEntitiesFormFilter = Form.create<Props>({
  name: "entitiesFormFilter"
})(EntitiesFormFilter);

export default memo(WrappedEntitiesFormFilter);
