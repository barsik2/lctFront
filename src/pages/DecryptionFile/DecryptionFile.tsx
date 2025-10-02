import React from 'react';
// import styles from './DecryptionFile.module.css';
import DocumentViewer from '../../components/DocumentViewer/DocumentViewer';

const sampleText = `Наименование документа
Низкоуровенных элементов: 230

Распознанный текст:
Пример распознанного текста документа. Здесь может быть несколько строк,
таблицы, номера страниц и другие атрибуты, полученные из OCR.`;

const DecryptionFile: React.FC = () => {

    return (
        <div>
            <DocumentViewer
                documentUrl="/sample-doc.pdf"
                recognizedText={sampleText}
                alt="Пример документа — PDF"
            />
        </div>
    )
};


export default DecryptionFile;