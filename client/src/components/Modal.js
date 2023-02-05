import { Button, Modal } from 'antd';

function ModalFavorites({ open = false, handleOk, handleCancel }) {
  return (
    <Modal
      Modal
      title="Ви справді хочете прибрати з обраних?"
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

export default ModalFavorites;
