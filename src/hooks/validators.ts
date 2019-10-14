import { getTranslate } from 'react-localize-redux';
import { useStore } from 'react-redux';

const useValidators = () => {
  const store = useStore();
  const props = store.getState();
  const translate = getTranslate(props.localize);

  const required = (callback: Function, value: string, label?: string | number | React.ReactNode) => {
    if (!value) {
      callback(translate('validations.required', { input: label }));
    }
  };

  return {
    required
  };
};

export default useValidators;
