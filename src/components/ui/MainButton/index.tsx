import styles from './MainButton.module.scss';
import React from 'react';

interface MainButtonProps {
  type?: 'button' | 'submit';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const MainButton: React.FC<MainButtonProps> = ({ children, disabled, type, onClick }) => {
  return (
    <button onClick={onClick} disabled={disabled} type={type} className={styles.button}>
      {children}
    </button>
  );
};

export default MainButton;
