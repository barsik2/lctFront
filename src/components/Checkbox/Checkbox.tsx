import React from 'react';
import styles from './CustomCheckbox.module.css';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = ''
}) => {
  const handleCheckboxClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.checkboxContent}>
        <div 
          className={`${styles.customCheckbox} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}
          onClick={handleCheckboxClick}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="checkbox"
          aria-checked={checked}
          aria-label={label}
          aria-disabled={disabled}
        >
          {checked && (
            <svg 
              className={styles.checkmark} 
              viewBox="0 0 12 10"
              fill="none"
            >
              <path
                d="M1 5L4.5 8.5L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span 
          className={`${styles.labelText} ${disabled ? styles.disabled : ''}`}
        >
          {label}
        </span>
      </div>
      
      {/* Скрытый input для формы */}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {}} // Пустой обработчик, т.к. управляем через кастомный чекбокс
        disabled={disabled}
        className={styles.hiddenInput}
        tabIndex={-1}
      />
    </div>
  );
};

export default Checkbox;