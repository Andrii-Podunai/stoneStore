import * as yup from 'yup';
import convertNumber from '../../../components/ProductForm/numberConverter';
yup.addMethod(yup.string, 'customMinNumber', function (...props) {
  const [prop, errorMessage] = props;
  return this.test('testCustomMin', errorMessage, function (value) {
    const { path, createError } = this;
    if (!value || convertNumber(value).length < prop) {
      return createError({
        path,
        message: errorMessage || `${path} must be at least ${prop} characters`,
      });
    }
    return true;
  });
});

const schema = yup.object().shape({
  given_name: yup
    .string()
    .min(3, 'Правильне ім`я?')
    .required('Ім`я відіграє важливу роль, не забудьте додати його'),
  phoneNumber: yup
    .string()
    .customMinNumber(12, 'Введіть корректний номер')
    .typeError('Введіть корректний номер')
    .required('Необхідно вказати номер телефону'),
});

export default schema;
