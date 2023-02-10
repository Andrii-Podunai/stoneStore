import { Button, Modal } from 'antd';

function ModalComponent({ open = false, title, handleOk, handleCancel }) {
  return (
    <Modal
      Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Скасувати
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Так
        </Button>,
      ]}
    />
  );
}

export default ModalComponent;
