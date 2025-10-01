import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomField.module.css';
import arrowImagePathIcon from '../../assets/icons/arrow.svg';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomFieldProps {
  type: 'text' | 'number' | 'email' | 'password' | 'select';
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: SelectOption[];
  arrowImagePath?: string;
}

const CustomField: React.FC<CustomFieldProps> = ({
  type,
  value,
  onChange,
  placeholder = '',
  label,
  disabled = false,
  error,
  className = '',
  min,
  max,
  step,
  options = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSelectToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  const renderInput = () => {
    if (type === 'select') {
      return (
        <div 
          className={styles.selectContainer} 
          ref={selectRef}
        >
          <div
            className={`${styles.field} ${styles.selectTrigger} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''} ${isOpen ? styles.open : ''}`}
            onClick={handleSelectToggle}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelectToggle();
              }
            }}
          >
            <span className={selectedOption ? styles.selectedValue : styles.placeholder}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <img 
              src={arrowImagePathIcon} 
              alt="▼" 
              className={`${styles.arrow} ${isOpen ? styles.arrowRotated : ''}`}
            />
          </div>
          
          {isOpen && (
            <div className={styles.dropdown}>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.option} ${option.value === value ? styles.selected : ''}`}
                  onClick={() => handleOptionSelect(option.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleOptionSelect(option.value);
                    }
                  }}
                  tabIndex={0}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.field} ${styles.input} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
        min={min}
        max={max}
        step={step}
      />
    );
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      
      {renderInput()}
      
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default CustomField;