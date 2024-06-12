import React from 'react';
import { TextCus, ViewCus } from 'components';

const IndicatorTop = () => {
  return (
    <ViewCus items-center bg-statusColor py-8>
      <TextCus color-black3A subhead>
        Tạm dừng nhận đơn mới đến 08:30, 03/05/202
      </TextCus>
    </ViewCus>
  );
};

export default IndicatorTop;
