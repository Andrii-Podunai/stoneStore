import * as yup from 'yup';
import convertNumber from './numberConverter';

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
  name: yup
    .string()
    .min(3, 'Правильне ім`я?')
    .required('Ім`я відіграє важливу роль, не забудьте додати його'),
  title: yup
    .string()
    .min(7, 'У заголовку має бути не менше 7 символів')
    .required('Заголовок відіграє важливу роль, не забудьте додати його'),
  description: yup
    .string()
    .min(15, 'Опис повинен бути не коротшим за 15 знаків')
    .required('Опис відіграє важливу роль, не забудьте додати його'),
  phoneNumber: yup
    .string()
    .typeError('Введіть корректний номер')
    .customMinNumber(12, 'Введіть корректний номер')
    .required('Необхідно вказати номер телефону'),
  images: yup.array().min(1, 'Це поле є обов`язковим для заповнення'),
  price: yup
    .number('Неправильно вказана ціна. Відредагуйте поле')
    .required('Необхідно вказати ціну')
    .min(0, 'Ціна має бути позитивнивним числом'),
  count: yup
    .number('Неправильно вказана кількість товару. Відредагуйте поле')
    .required('Необхідно вказати кількість товару')
    .positive('Кількість має бути позитивнивним числом'),
  category: yup.string().required('Це поле є обов`язковим для заповнення'),
  type: yup.string().required('Це поле є обов`язковим для заповнення'),
  location: yup.string().required('Необхідно вказати місцезнаходження'),
});

export default schema;
