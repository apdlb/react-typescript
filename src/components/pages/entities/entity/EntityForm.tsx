import { Button, Checkbox, Input } from 'antd';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { memo } from 'react';
import { Translate } from 'react-localize-redux';

import { formHasErrors } from '../../../../utils/helpers';
import FormItem from '../../../shared/forms/FormItem';

interface Props {
  form: WrappedFormUtils;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}

const EntityForm: React.FunctionComponent<Props> = props => {
  const { form, onSubmit } = props;
  const { getFieldsError } = form;

  return (
    <Translate>
      {({ translate }) => {
        return (
          <>
            <Form className="grid-entity-form" onSubmit={onSubmit} layout="vertical">
              <div className="grid-entity-form-inputs">
                <FormItem
                  form={form}
                  className="grid-entity-form-input-field1"
                  field="field1"
                  label={translate('entities.labels.field1')}
                  validations={['required']}
                >
                  <Input placeholder={`${translate('entities.labels.field1')}`} />
                </FormItem>

                <FormItem form={form} className="grid-entity-form-input-field2" field="field2" label={translate('entities.labels.field2')}>
                  <Input placeholder={`${translate('entities.labels.field2')}`} />
                </FormItem>

                <FormItem
                  form={form}
                  className="grid-entity-form-input-field3 form-item-checkbox"
                  field="field3"
                  valuePropName="checked"
                  label={translate('entities.labels.field3')}
                >
                  <Checkbox />
                </FormItem>
              </div>
              <div className="grid-entity-form-buttons">
                <Form.Item>
                  <Button htmlType="submit" type="primary" disabled={formHasErrors(getFieldsError())}>
                    {translate('generic.labels.save')}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </>
        );
      }}
    </Translate>
  );
};

export default memo(EntityForm);
