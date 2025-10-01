import React, { useRef, useState } from 'react';
import styles from './styles.module.css';
import uploadIcon from '../../assets/icons/uploadFileComponent.svg';

interface UploadedFile {
  file: File;
  errors: string[];
}

const FileUploader: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validTypes = ['image/jpeg', 'image/jpg', 'image/tiff', 'application/pdf'];
  const maxSize = 50 * 1024 * 1024; // 50 MB

  const validateFile = (file: File): string[] => {
    const errors: string[] = [];
    
    if (!validTypes.includes(file.type)) {
      errors.push('Недопустимый формат файла');
    }

    if (file.size > maxSize) {
      errors.push('Файл слишком большой');
    }

    return errors;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newFiles: UploadedFile[] = filesArray.map(file => ({
        file,
        errors: validateFile(file)
      }));

      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add(styles.dragOver);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove(styles.dragOver);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove(styles.dragOver);
    
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
      const newFiles: UploadedFile[] = filesArray.map(file => ({
        file,
        errors: validateFile(file)
      }));

      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('pdf')) return '📄';
    return '📁';
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.dropZone}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.tiff,.pdf"
          onChange={handleFileChange}
          className={styles.fileInput}
        />

        {uploadedFiles.length === 0 ? (
          <div className={styles.placeholder}>
            <img style={{ paddingBottom: '20px' }} src={uploadIcon} alt="" />
            <p className={styles.dragText}>Перетащите файлы или нажмите для загрузки</p>
            <p className={styles.supportedFormats}>Поддерживаемые форматы: JPG, JPEG, TIFF, PDF (до 50мб каждый)</p>
          </div>
        ) : (
          <div className={styles.filesContainer}>
            <div className={styles.filesHeader}>
              <span>Загруженные файлы:</span>
              <button 
                className={styles.addMoreButton}
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                + Добавить еще
              </button>
            </div>
            
            <div className={styles.fileList}>
              {uploadedFiles.map((uploadedFile, index) => (
                <div key={index} className={styles.fileItem}>
                  <div className={styles.fileIcon}>
                    {getFileIcon(uploadedFile.file.type)}
                  </div>
                  
                  <div className={styles.fileDetails}>
                    <div className={styles.fileName}>
                      {uploadedFile.file.name}
                    </div>
                    <div className={styles.fileInfo}>
                      <span className={styles.fileSize}>
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      {uploadedFile.errors.length > 0 ? (
                        <span className={styles.error}>⚠ Ошибка</span>
                      ) : (
                        <span className={styles.success}>✓ Готово</span>
                      )}
                    </div>
                  </div>

                  <button
                    className={styles.removeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    title="Удалить файл"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Отображение ошибок валидации */}
      {uploadedFiles.some(file => file.errors.length > 0) && (
        <div className={styles.validationErrors}>
          <h4>Обнаружены ошибки:</h4>
          {uploadedFiles.map((uploadedFile, index) => (
            uploadedFile.errors.map((error, errorIndex) => (
              <div key={`${index}-${errorIndex}`} className={styles.validationError}>
                <strong>{uploadedFile.file.name}:</strong> {error}
              </div>
            ))
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;