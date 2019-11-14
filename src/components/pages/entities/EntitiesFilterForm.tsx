import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Collapse, Divider, Icon, Input, InputNumber } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form/Form';
import React, { memo, useEffect } from 'react';
import { Translate } from 'react-localize-redux';

import { GET_ENTITIES_PAGINATED, SET_PAGINATE_ENTITIES_PARAMS } from '../../../graphql/entities';
import FormItem from '../../shared/forms/FormItem';

interface Props extends FormComponentProps {
  onReset: React.MouseEventHandler<HTMLElement>;
}

const EntitiesFormFilter: React.FunctionComponent<Props> = props => {
  const { form, onReset } = props;
  const client = useApolloClient();
  const [setPaginateEntitiesParams] = useMutation(SET_PAGINATE_ENTITIES_PARAMS);
  const defaultParams = { page: 1, pageSize: 5 } as any;

  const {
    data: dataLazyQuery = {} as any,
    refetch: refetchEntitiesPaginated
  } = useQuery(GET_ENTITIES_PAGINATED, {
    variables: { filter: defaultParams }
  });

  const {
    paginateEntitiesParams: { __typename, ...restParams } = {} as any
  } = dataLazyQuery;

  useEffect(() => {
    refetchEntitiesPaginated({ filter: restParams });
  }, [restParams, refetchEntitiesPaginated]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { page, pageSize, sort, order, ...rest } = restParams;
    const newParams = { ...defaultParams, ...rest, ...form.getFieldsValue() };
    refetchEntitiesPaginated({ filter: newParams });
    client.writeData({
      data: { paginateEntitiesParams: { ...newParams, __typename } }
    });
    setPaginateEntitiesParams({
      variables: { params: newParams }
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
