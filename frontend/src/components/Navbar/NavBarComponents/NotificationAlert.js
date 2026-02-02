import React from "react";
import { Button, Badge } from "antd";
import {
  NotificationAlertStyle,
  NotificationStyle,
} from "styles/components/Navbar";
import { BellFilled } from "@ant-design/icons";

const NotificationAlert = ({ notifications }) => {
  return notifications == 0 ? (
    <NotificationStyle>
      <Button shape="circle" icon={<BellFilled />} />
    </NotificationStyle>
  ) : (
    <NotificationAlertStyle>
      <Badge count={notifications} size="small" offset={[-6, 7]}>
        <Button shape="circle" icon={<BellFilled />} />
      </Badge>
    </NotificationAlertStyle>
  );
};

export default NotificationAlert;
