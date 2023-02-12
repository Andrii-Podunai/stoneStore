import './style.scss';
import {
  FacebookOutlined,
  InstagramOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
const { TextArea } = Input;

const Contacts = () => {
  const onFinish = () => {
    setTimeout(() => {
      message.success('Дякуємо за повідомлення, ми зв`яжемося з вами найближчим часом');
    }, 2000);
  };

  return (
    <>
      <div className="cover" style={{ backgroundImage: 'url(./img/recycle.jpg)' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="contacts-title">Контакти</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-6 py-5">
              <PhoneOutlined
                style={{ fontSize: '20px', color: 'green', transform: 'rotate(100deg)' }}
              />
              <p>
                <strong>Телефон: </strong>+38 (078) 667 776 887
              </p>
              <MailOutlined style={{ fontSize: '20px', color: 'green' }} />
              <p>
                <strong>E-mail: </strong>contact@vtormall.com
              </p>
              <EnvironmentOutlined style={{ fontSize: '20px', color: 'green' }} />
              <p>
                <strong>Адреса: </strong>проспект Павла Тичини, 1В, БЦ SilverBreeze
              </p>
              <CalendarOutlined style={{ fontSize: '20px', color: 'green' }} />
              <p>
                <strong>Години роботи: </strong> <br /> з понеділка по четвер з 8:00 до 16:00 <br />
                п'ятниця з 8:00 до 14:00
              </p>
              <p>
                <strong>Слідкуйте за нами в соціальних мережах: </strong>
              </p>
              <a href="https://www.facebook.com/VtorMall">
                <FacebookOutlined
                  style={{
                    fontSize: '35px',
                    color: '#3b5998',
                    marginLeft: '5px',
                    marginRight: '5px',
                  }}
                />
              </a>
              <a href="https://www.instagram.com/">
                <InstagramOutlined
                  style={{
                    fontSize: '35px',
                    color: '#E1306C',
                    marginLeft: '5px',
                    marginRight: '5px',
                  }}
                />
              </a>
            </div>
            <div className="col-md-12 col-lg-6 py-5">
              <Form
                name="basic"
                wrapperCol={{
                  span: 18,
                }}
                style={{
                  maxWidth: 500,
                }}
                onFinish={onFinish}
                autoComplete="off">
                <p className="text-form-info">
                  ви можете зв’язатися з нами за допомогою форми нижче.
                </p>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Будь ласка, введіть своє ім`я!',
                    },
                  ]}>
                  <Input placeholder="Ім'я" />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Будь ласка, введіть свою електронну адресу!',
                    },
                  ]}>
                  <Input placeholder="E-mail" />
                </Form.Item>

                <Form.Item
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: 'Будь ласка, введіть своє повідомлення!',
                    },
                  ]}>
                  <TextArea rows={4} placeholder="Текст повідомлення" />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 5,
                  }}>
                  <Button htmlType="submit">Відправити</Button>
                </Form.Item>
              </Form>
            </div>

            <iframe
              title="This is our address"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.6927636817313!2d30.590786115716377!3d50.42819567947236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c57dddb1d8c7%3A0xfe6af6ebce9a0dec!2z0L_RgNC-0YHQvy4g0J_QsNCy0LvQsCDQotGL0YfQuNC90YssIDHQkiwg0JrQuNC10LIsINCj0LrRgNCw0LjQvdCwLCAwMjAwMA!5e0!3m2!1sru!2spl!4v1676064413602!5m2!1sru!2spl"
              width="100%"
              height="400"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contacts;
