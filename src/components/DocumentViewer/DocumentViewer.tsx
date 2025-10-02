import { useMemo, useRef, useState } from 'react';
import styles from './DocumentViewer.module.css';
import zoomOutIcon from '../../assets/icons/zoom.svg';
import zoomInIcon from '../../assets/icons/zoomin.svg';

interface DocumentViewerProps {
  documentUrl: string;
  recognizedText: string;
  alt?: string;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const isPdf = (url: string) => url.slice(-4).toLowerCase() === '.pdf';

export default function DocumentViewer({ 
  documentUrl, 
  recognizedText, 
  alt = 'Документ',
  totalPages = 1,
  currentPage = 1,
  onPageChange 
}: DocumentViewerProps) {
  const [zoom, setZoom] = useState(1);
  const viewerRef = useRef<HTMLDivElement | null>(null);

  const zoomIn = () => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(0.25, +(z - 0.25).toFixed(2)));

  const nextPage = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(recognizedText);
      alert('Текст скопирован в буфер обмена');
    } catch (err) {
      alert('Не получилось скопировать текст');
    }
  };

  const viewerStyle = useMemo(() => ({ 
    transform: `scale(${zoom})`, 
    transformOrigin: 'top left' as const 
  }), [zoom]);

  const pdfUrlWithPage = useMemo(() => {
    if (!isPdf(documentUrl) || !totalPages || totalPages <= 1) return documentUrl;
    return `${documentUrl}#page=${currentPage}`;
  }, [documentUrl, currentPage, totalPages]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.toolbar}>
          <div className={styles.title} aria-hidden>
            Наименование документа
          </div>

          <div className={styles.spacer} />

          <div className={styles.controls}>
            {/* Кнопки переключения страниц */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button 
                  className={styles.button} 
                  onClick={prevPage}
                  disabled={currentPage <= 1}
                  aria-label="Предыдущая страница"
                >
                  ←
                </button>
                <span className={styles.pageInfo}>
                  {currentPage} / {totalPages}
                </span>
                <button 
                  className={styles.button} 
                  onClick={nextPage}
                  disabled={currentPage >= totalPages}
                  aria-label="Следующая страница"
                >
                  →
                </button>
              </div>
            )}

            {/* Элементы управления масштабом */}
            <div className={styles.zoomControls}>
              <button className={styles.button} onClick={zoomOut} aria-label="Уменьшить масштаб">
                <img src={zoomOutIcon} alt="" />
              </button>
              <span className={styles.zoomInfo}>{Math.round(zoom * 100)}%</span>
              <button className={styles.button} onClick={zoomIn} aria-label="Увеличить масштаб">
                <img src={zoomInIcon} alt="" />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.viewer} ref={viewerRef}>
          <div className={styles.imgWrapper} style={viewerStyle}>
            {isPdf(documentUrl) ? (
              <iframe
                title={alt}
                src={pdfUrlWithPage}
                className={styles.iframe}
                sandbox="allow-same-origin allow-scripts allow-forms"
              />
            ) : (
              <img src={documentUrl} alt={alt} className={styles.img} />
            )}
          </div>
        </div>
      </div>

      <aside className={styles.right} aria-label="Расшифрованный текст">
        <div className={styles.rightHeader}>
          <h3 className={styles.rightTitle}>Текст и атрибуты</h3>
          <div className={styles.rightActions}>
            {/* <button className={styles.button} onClick={copyText} aria-label="Скопировать текст">
              Копировать
            </button> */}
          </div>
        </div>

        <h3 style={{ paddingLeft: '16px' }} className={styles.rightTitle}>Распознанный текст</h3>


        <div className={styles.textArea}>
          {recognizedText ? (
            <pre className={styles.text} aria-live="polite">{recognizedText}</pre>
          ) : (
            <div className={styles.empty}>Нет распознанного текста</div>
          )}
        </div>
      </aside>
    </div>
  );
}