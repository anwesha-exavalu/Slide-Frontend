import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  Radio, 
  Upload, 
  message, 
  Alert,
  Space
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  max-width: 800px;
  margin: 2rem auto;
  box-shadow: 0px 6px 18px -2px #18181C1A;
  .ant-card-head-title {
    text-align: center;
    font-size: 24px;
  }
`;

const MethodContainer = styled.div`
  padding: 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.3s;
  &:hover {
    background: #fafafa;
  }
  &.selected {
    border-color: #1890ff;
    background: #e6f7ff;
  }
`;

const UploadContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 8px;
`;

const UploadFile = () => {
  const [selection, setSelection] = useState(null);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  
  const handleOptionSelect = (e) => {
    setSelection(e.target.value);
    setFileList([]);
  };

  const handleFileChange = (info) => {
    const { fileList: newFileList, file } = info;
    setFileList(newFileList);
    
    if (file.status === 'removed') {
      message.warning('File removed');
    } else if (newFileList.length > 0) {
      message.success('File selected successfully');
    }
  };

  const handleNext = () => {
    if (selection === 'manual') {
      navigate('/herald-product');
    } else if (selection === 'upload' && fileList.length > 0) {
      navigate('/herald-product', { 
        state: { 
          fromPdfUpload: true
        }
      });
    } else {
      message.error('Please complete all required selections');
    }
  };

  return (
    <StyledCard title="Select Input Method">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Radio.Group 
          onChange={handleOptionSelect} 
          value={selection}
          style={{ width: '100%' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <MethodContainer className={selection === 'manual' ? 'selected' : ''}>
              <Radio value="manual">
                <div>
                  <h4>Input Data Manually</h4>
                  <p style={{ color: 'rgba(0, 0, 0, 0.45)', marginTop: '8px' }}>
                    Manually enter the required data step-by-step
                  </p>
                </div>
              </Radio>
            </MethodContainer>

            <MethodContainer className={selection === 'upload' ? 'selected' : ''}>
              <Radio value="upload">
                <div>
                  <h4>Upload File</h4>
                  <p style={{ color: 'rgba(0, 0, 0, 0.45)', marginTop: '8px' }}>
                    Upload a PDF file to auto-fill the necessary information
                  </p>
                </div>
              </Radio>
            </MethodContainer>
          </Space>
        </Radio.Group>

        {selection === 'upload' && (
          <UploadContainer>
            <Upload
              accept=".pdf"
              beforeUpload={() => false}
              onChange={handleFileChange}
              fileList={fileList}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to Upload PDF</Button>
            </Upload>
            {fileList.length > 0 && (
              <Alert
                message="File selected successfully"
                type="success"
                showIcon
                style={{ marginTop: '1rem' }}
              />
            )}
          </UploadContainer>
        )}

        <Button
          type="primary"
          block
          onClick={handleNext}
          disabled={!selection || (selection === 'upload' && fileList.length === 0)}
        >
          Next
        </Button>
      </Space>
    </StyledCard>
  );
};

export default UploadFile;