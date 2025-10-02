import React, { useState } from 'react';
import styles from './uploadDocument.module.css';
import UploadFile from '../../components/Uploader/uploader';
import Checkbox from '../../components/Checkbox/Checkbox';
import warningIcon from '../../assets/icons/warning.svg';
import Field from '../../components/InputField/InputField';
import uploadIcon from '../../assets/icons/uploadFileComponent.svg';
import directoryIcon from '../../assets/icons/directory.svg';

const UploadDocument: React.FC = () => {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [textValue, setTextValue] = useState('');
    const [textValue1, setTextValue1] = useState('');
    const [textValue2, setTextValue2] = useState('');
    const [textValue3, setTextValue3] = useState('');
    const [textValue4, setTextValue4] = useState('');
    const [textValue5, setTextValue5] = useState('');

    const [selectValue, setSelectValue] = useState('');
    const selectOptions = [
        { value: 'option1', label: 'Документ 1' },
        { value: 'option2', label: 'Документ 2' },
        { value: 'option3', label: 'Документ 3' },
    ];

    return (
        <div>
            <h1 className={styles.title}>Загрузка документов</h1>
            <p className={styles.desc}>Загрузите архивные документы для распознавания и индексирования</p>

            <div className={styles.container}>
                <div className={styles.containerFiles}>
                    <div className={styles.containerFile}>
                        <p className={styles.titleFile}>Выбор файлов</p>
                        <UploadFile />
                    </div>

                    <div className={styles.containerFile}>
                        <p className={styles.titleFile}>Параметры предобработки</p>
                        <div className={styles.containerCheckbox}>
                            <Checkbox
                                label="Автоматическое выравнивание"
                                checked={isChecked1}
                                onChange={setIsChecked1}
                            />
                            <Checkbox
                                label="Автоматический поворот"
                                checked={isChecked2}
                                onChange={setIsChecked2}
                            />
                            <Checkbox
                                label="Усиление контраста"
                                checked={isChecked3}
                                onChange={setIsChecked3}
                            />
                            <Checkbox
                                label="Подавление шумов"
                                checked={isChecked4}
                                onChange={setIsChecked4}
                            />
                        </div>

                        <div className={styles.containerWarning}>
                            <img src={warningIcon} alt="" />
                            <p>
                                Низкая уверенность распознавания может быть связана с наклоном, шумами или выцветанием изображений. 
                                Включите соответствующие опции предобработки для улучшения качества.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.containerFile}>
                    <p className={styles.titleFile}>Метаданные партии</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                            <Field
                                type="text"
                                label="Фонд"
                                value={textValue}
                                onChange={setTextValue}
                                placeholder=""
                            />
                            <Field
                                type="text"
                                label="Опись"
                                value={textValue1}
                                onChange={setTextValue1}
                                placeholder=""
                            />
                            <Field
                                type="text"
                                label="Дело"
                                value={textValue2}
                                onChange={setTextValue2}
                                placeholder=""
                            />
                        </div>
                        <Field
                            type="select"
                            label="Тип книги"
                            value={selectValue}
                            onChange={setSelectValue}
                            placeholder="Выберите тип документа"
                            options={selectOptions}
                            arrowImagePath="/icons/arrow.svg"
                        />

                        <Field
                            type="text"
                            label="Годы"
                            value={textValue3}
                            onChange={setTextValue3}
                            placeholder="1980-2000"
                        />
                        <Field
                            type="text"
                            label="Архив"
                            value={textValue4}
                            onChange={setTextValue4}
                            placeholder="СПБ"
                        />
                        <Field
                            type="text"
                            label="Приход/церковь"
                            value={textValue5}
                            onChange={setTextValue5}
                            placeholder="Церковь"
                        />
                        <button className={styles.button}>
                            <img style={{ width: '18px', height: '18px' }} src={uploadIcon} alt="" />
                            Запустить обработку
                        </button>
                        <button className={styles.buttonWhite}>
                            <img style={{ width: '18px', height: '18px' }} src={directoryIcon} alt="" />
                            Выбрать папку
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default UploadDocument;