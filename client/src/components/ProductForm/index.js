import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { Formik } from 'formik';
import schema from './validationSchema';
import { PatternFormat } from 'react-number-format';
import axios from 'axios';
import { SERVER_URL } from 'variables';
import convertNumber from './numberConverter';

const { TextArea } = Input;
const { Option } = Select;

function ProductForm({ initialValues, submit }) {
  const [fileList, setFileList] = useState(
    initialValues.images.map((el) => {
      return {
        response: [el],
        url: el.url,
      };
    })
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      validateOnChange={false}
      onSubmit={(value) => {
        if (typeof value.phoneNumber === 'string') {
          value.phoneNumber = convertNumber(value.phoneNumber);
        }
        submit(value);
      }}>
      {({ handleSubmit, touched, errors, getFieldProps, values, setFieldValue }) => (
        <Form
          className="ps-2 pe-2"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 8 }}
          onFinish={handleSubmit}
          layout="horizontal"
          size="large"
          autoComplete="off"
          style={{ marginTop: 20 }}>
          <Form.Item
            label="Вкажіть назву"
            htmlFor="title"
            help={touched.title && errors.title ? errors.title : ''}
            validateStatus={touched.title && errors.title ? 'error' : undefined}>
            <Input {...getFieldProps('title')} />
          </Form.Item>

          <Form.Item
            label="Опис"
            htmlFor="description"
            help={touched.description && errors.description ? errors.description : ''}
            validateStatus={touched.description && errors.description ? 'error' : undefined}>
            <TextArea showCount maxLength={1000} {...getFieldProps('description')} />
          </Form.Item>

          <Form.Item
            label="Фото"
            valuePropName="fileList"
            htmlFor="images"
            help={touched.images && errors.images ? errors.images : ''}
            validateStatus={touched.images && errors.images ? 'error' : undefined}>
            <Upload
              {...getFieldProps('images')}
              fileList={fileList}
              name="files[]"
              action={SERVER_URL + '/upload'}
              accept="image/*"
              listType="picture-card"
              multiple
              onChange={(info) => {
                if (info.file.status === 'removed') {
                  if (info.file.response[0]) {
                    axios.delete(`${SERVER_URL}/upload`, {
                      data: [info.file.response[0].key],
                    });
                    const filterArrays = values.images.filter(
                      ({ key }) => key !== info.file.response[0].key
                    );
                    setFieldValue('images', filterArrays);
                  }
                }
                if (info.file.status === 'done') {
                  setFieldValue('images', [...values.images, ...info.file.response]);
                } else if (info.file.status === 'error') {
                  message.error(`${info.file.key} file upload failed.`);
                }
                setFileList((prevFileList) => {
                  return info.fileList.map((file) => {
                    const mistake = prevFileList.find(
                      (prevFile) =>
                        prevFile.uid === file.uid &&
                        prevFile.status === 'done' &&
                        file.status === 'uploading'
                    );
                    if (mistake) {
                      return { ...file, status: 'done', response: mistake.response };
                    }
                    return file;
                  });
                });
              }}
              onPreview={async (file) => {
                let src = file.url;
                if (!src) {
                  src = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file.originFileObj);
                    reader.onload = () => resolve(reader.result);
                  });
                }
                const image = new Image();
                image.src = src;
                const imgWindow = window.open(src);
                imgWindow?.document.write(image.outerHTML);
              }}>
              {values.images.length < 12 && 'Завантажити'}
            </Upload>
          </Form.Item>

          <Form.Item
            label="Кількість товару"
            htmlFor="count"
            help={touched.count && errors.count ? errors.count : ''}
            validateStatus={touched.count && errors.count ? 'error' : undefined}>
            <Input type="number" min="0" {...getFieldProps('count')} style={{ width: 150 }} />
          </Form.Item>

          <Form.Item
            label="Ціна"
            htmlFor="price"
            help={touched.price && errors.price ? errors.price : ''}
            validateStatus={touched.price && errors.price ? 'error' : undefined}>
            <Input
              addonAfter={
                <Select
                  {...getFieldProps('currency')}
                  onChange={(value) => setFieldValue('currency', value)}>
                  <Option value="USD">$</Option>
                  <Option value="EUR">€</Option>
                  <Option value="UAH">₴</Option>
                </Select>
              }
              type="number"
              min="0"
              {...getFieldProps('price')}
              style={{ width: 150 }}
            />
          </Form.Item>

          <Form.Item
            label="Категорія"
            htmlFor="category"
            help={touched.category && errors.category ? errors.category : ''}
            validateStatus={touched.category && errors.category ? 'error' : undefined}>
            <Select
              {...getFieldProps('category')}
              onChange={(value) => setFieldValue('category', value)}>
              <Option disabled value="">
                Виберіть категорію
              </Option>
              <Option value="plastic">Пластик</Option>
              <Option value="metal">Метал</Option>
              <Option value="paper">Папір</Option>
              <Option value="glass">Скло</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Тип оголошення"
            htmlFor="type"
            help={touched.type && errors.type ? errors.type : ''}
            validateStatus={touched.type && errors.type ? 'error' : undefined}>
            <Select {...getFieldProps('type')} onChange={(value) => setFieldValue('type', value)}>
              <Option disabled value="">
                Виберіть тип оголошення
              </Option>
              <Option value="buy">Купити</Option>
              <Option value="sell">Продати</Option>
              <Option value="free">Безкоштовно</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Вкажіть своє ім'я"
            htmlFor="name"
            help={touched.name && errors.name ? errors.name : ''}
            validateStatus={touched.name && errors.name ? 'error' : undefined}>
            <Input {...getFieldProps('name')} />
          </Form.Item>

          <Form.Item
            label="Телефон"
            htmlFor="phoneNumber"
            help={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ''}
            validateStatus={touched.phoneNumber && errors.phoneNumber ? 'error' : undefined}>
            <PatternFormat
              type="tel"
              className={`form-control${touched.phone && errors.phone ? ' is-invalid' : ''}`}
              {...getFieldProps('phoneNumber')}
              format="+38 (###) ### ## ##"
              mask="_"
            />
          </Form.Item>

          <Form.Item
            label="Місцезнаходження"
            htmlFor="location"
            help={touched.location && errors.location ? errors.location : ''}
            validateStatus={touched.location && errors.location ? 'error' : undefined}>
            <Input {...getFieldProps('location')} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="text" htmlType="submit" style={{ border: '1px solid #d9d9d9' }}>
              Опублікувати
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
}

export default ProductForm;
