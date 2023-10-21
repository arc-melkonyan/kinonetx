import React, { useState } from 'react';

const useMessage = () => {
  const [messageData, setMessageData] = useState({
    text: '',
    status: false,
  });

  const handleMessageClose = () => {
    setMessageData({ text: '', status: false });
  };

  return {
    messageData,
    setMessageData,
    handleMessageClose,
  };
};

export default useMessage;
