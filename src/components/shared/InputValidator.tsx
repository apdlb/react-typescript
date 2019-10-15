import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { memo } from 'react';

import useValidators from '../../hooks/useValidators';

interface Props {
  form: WrappedFormUtils;
  field: string;
  label: string | number | React.ReactNode;
  initialValue?: any;
  validations?: string[];
  children: React.ReactNode;
}

const InputValidator: React.FunctionComponent<Props> = props => {
  const { form, field, label, initialValue, validations, children } = props;
  const validators = useValidators();
  const { getFieldDecorator } = form;

  return (
    <>
      {getFieldDecorator(field, {
        initialValue,
        rules: [
          {
            validator(rule: any, value: string, callback: Function) {
              if (validations) {
                for (const validation of validations) {
                  (validators as any)[validation](callback, value, label);
                }
              }
              callback();
            }
          }
        ]
      })(children)}
    </>
  );
};

export default memo(InputValidator);
