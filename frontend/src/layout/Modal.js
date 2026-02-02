import React, { useState } from 'react';
import { Button, ConfigProvider, Modal, Space, Col, Select } from 'antd';
import { createStyles, useTheme } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
  'my-modal-body': {
    background: token.blue1,
    padding: token.paddingXL,
    minHeight: '150px',
  },
  'my-modal-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },
  'my-modal-header': {
    borderBottom: `1px dotted ${token.colorPrimary}`,
  },
  'my-modal-footer': {
    color: token.colorPrimary,
  },
  'my-modal-content': {
    border: '1px solid #333',
    padding: token.paddingLG,
  },
}));

const ModalDesign = () => {
  const [isModalOpen, setIsModalOpen] = useState([false, false, false]);
  const { styles } = useStyle();
  const token = useTheme();
  const [selectedUnderwriter, setSelectedUnderwriter] = useState(null);

  const toggleModal = (idx, target) => {
    setIsModalOpen((p) => {
      const updatedState = [...p];
      updatedState[idx] = target;
      return updatedState;
    });
  };

  const classNames = {
    body: styles['my-modal-body'],
    mask: styles['my-modal-mask'],
    header: styles['my-modal-header'],
    content: styles['my-modal-content'],
  };

  const modalStyles = {
    header: {
      borderLeft: `5px solid ${token.colorPrimary}`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    body: {
      boxShadow: 'inset 0 0 5px #999',
      borderRadius: 5,
      padding: '10px',
      minHeight: '40px',
    },
    mask: {
      backdropFilter: 'blur(10px)',
    },
    footer: {
      borderTop: '1px solid #333',
      paddingTop: '20px',
    },
    content: {
      boxShadow: '0 0 30px #999',
    },
  };

  const renderFooter = (modalIdx) => (
    <Space>
      {modalIdx === 2 ? ( // For Referral modal only
        <Button type="primary" onClick={() => toggleModal(modalIdx, false)}>
          OK
        </Button>
      ) : (
        <>
          <Button type="primary" onClick={() => toggleModal(modalIdx, false)}>
            Yes
          </Button>
          <Button onClick={() => toggleModal(modalIdx, false)}>No</Button>
        </>
      )}
    </Space>
  );

  const actions = [
    { label: "Approve", color: "#2c66d1", index: 0, message: "Do you want to approve the application?" },
    { label: "Decline", color: "#2c66d1", index: 1, message: "Do you want to reject the application?" },
    { label: "Referral", color: "#2c66d1", index: 2, message: "Select which Underwriter you want to refer" },
  ];

  return (
    <>
      <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
        {actions.map(({ label, color, index }) => (
          <Button
            key={label}
            type="primary"
            style={{
              padding: "25px 75px",
              backgroundColor: color,
              margin: "0 10px", // Adjust the value as needed to reduce the gap
            }}
            onClick={() => toggleModal(index, true)}
          >
            {label}
          </Button>
        ))}
      </Col>

      <ConfigProvider modal={{ classNames, styles: modalStyles }}>
        {actions.map(({ label, message, index }) => (
          <Modal
            key={label}
            title={label}
            open={isModalOpen[index]}
            footer={renderFooter(index)}
          >
            <p>{message}</p>
            {label === "Referral" && (
              <Select
                placeholder="Select Underwriter"
                style={{ width: "100%", marginTop: "10px" }}
                onChange={(value) => setSelectedUnderwriter(value)}
              >
              <Select.Option value="underwriter1">Henry Oscar</Select.Option>
                <Select.Option value="underwriter2">Alexander William</Select.Option>
                <Select.Option value="underwriter3">Samuel Smith</Select.Option>
              </Select>
            )}
          </Modal>
        ))}
      </ConfigProvider>
    </>
  );
};

export default ModalDesign;
