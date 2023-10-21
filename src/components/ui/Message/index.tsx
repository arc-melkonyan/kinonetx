'use client';
import React from 'react';
import styles from './message.module.scss';

interface IMessage {
  message: {
    text: string;
    status: boolean;
  };
  onClose: () => void;
}

const Message: React.FC<IMessage> = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      console.log('start');
      onClose();
      console.log('end');
    }, 3000);
    return () => clearTimeout(timer);
  }, [message.text, onClose]);

  if (message.text) {
    return (
      <div onClick={onClose} className={styles.root}>
        <div className={message.status ? styles.success : styles.error}>
          <span>{message.text}</span>
        </div>
      </div>
    );
  }

  return '';
};

export default Message;
