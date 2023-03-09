import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Formik } from 'formik';
import schema from './userInfoSchema';
import { PatternFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import convertNumber from '../../../components/ProductForm/numberConverter';
import { useUserToken } from '../../../rest';
import useUserInformation from '../../../rest/useUserInformation';
import ModalComponent from '../../../components/Modal';
import Loader from '../../../components/Loader';

export default function UserInfo() {
  const [token] = useUserToken();
  const { userInfo, reFetchUserInfo } = useUserInformation();
  const navigate = useNavigate();

  const { picture } = userInfo;

  const [openModal, setOpenModal] = useState(false);
  const showModal = () => {
    setOpenModal(true);
  };
  const handleModalCancel = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };

  const initialValues = {
    ...userInfo,
  };
  const submit = ({ given_name, family_name, phoneNumber }) => {
    reFetchUserInfo('PATCH', token, {
      given_name: given_name,
      family_name: family_name,
      phoneNumber: phoneNumber,
      picture: picture,
    }).then(() => {
      showModal();
    });
  };
  return (
    <>
      {Object.keys(initialValues).length > 0 ? (
        <>
          <ModalComponent
            title="Ваші дані змінено!"
            handleOk={() => {
              reFetchUserInfo('GET', token).then(() => navigate('/profile'));
            }}
            open={openModal}
            handleCancel={(e) => handleModalCancel(e)}
          />
          <header className="container profile-header my-3">
            <LeftOutlined onClick={() => navigate(-1)} style={{ fontSize: '20px' }} />
            <div className="d-flex flex-column align-items-center text-center">
              <div className="d-flex align-items-center mt-3">
                <h4>Інформація про вас</h4>
              </div>
            </div>
          </header>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            validateOnChange={false}
            onSubmit={(value) => {
              value.phoneNumber = convertNumber(value.phoneNumber);
              submit(value);
            }}>
            {({ handleSubmit, touched, errors, getFieldProps }) => (
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
                  label="Ваше ім'я"
                  htmlFor="given_name"
                  help={touched.given_name && errors.given_name ? errors.given_name : ''}
                  validateStatus={touched.given_name && errors.given_name ? 'error' : undefined}
                  required={true}>
                  <Input
                    className={`form-control${
                      touched.given_name && errors.given_name ? ' is-invalid' : ''
                    }`}
                    {...getFieldProps('given_name')}
                  />
                </Form.Item>

                <Form.Item
                  label="Ваше прізвище"
                  htmlFor="family_name"
                  help={touched.family_name && errors.family_name ? errors.family_name : ''}>
                  <Input {...getFieldProps('family_name')} />
                </Form.Item>

                <Form.Item
                  label="Телефон"
                  htmlFor="phoneNumber"
                  required={true}
                  help={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ''}
                  validateStatus={touched.phoneNumber && errors.phoneNumber ? 'error' : undefined}>
                  <PatternFormat
                    type="tel"
                    className={`form-control${
                      touched.phoneNumber && errors.phoneNumber ? ' is-invalid' : ''
                    }`}
                    allowEmptyFormatting
                    format="+38 (###) ### ## ##"
                    mask="_"
                    {...getFieldProps('phoneNumber')}
                    onValueChange={(values) => {
                      return { ...(getFieldProps('phoneNumber').value = values.value) };
                    }}
                    value={initialValues.phoneNumber}
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                  <Button type="text" htmlType="submit" style={{ border: '1px solid #d9d9d9' }}>
                    Зберегти
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
