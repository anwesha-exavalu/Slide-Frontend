import React from 'react';
import { Progress } from 'antd';

const ProgressBar = ({percent=0,size="small", status="", strokeColor="#0095FF"}) => {
  return (
    <Progress percent={percent} format={() => null} size={size} status={status} strokeColor={strokeColor} />
  )
}

export default ProgressBar