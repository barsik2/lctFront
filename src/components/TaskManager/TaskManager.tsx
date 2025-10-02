import React from "react";
import styles from "./TaskManager.module.css";

export type TaskStatus = "running" | "queued" | "done";

export interface TaskItem {
  id: string;
  title: string;
  pages: string; // 157/234 страниц
  confidence?: string; // Уверенность
  status: TaskStatus;
  start: string; // Начало
  duration: string; //Длительность
  progress: number; // 0..100 прогресс
}

const StatusPill: React.FC<{ status: TaskStatus }> = ({ status }) => {
  let label = "";
  let cls = styles.statusPill;
  if (status === "running") {
    label = "Выполняется";
    cls = `${styles.statusPill} ${styles.running}`;
  } else if (status === "done") {
    label = "Завершено";
    cls = `${styles.statusPill} ${styles.done}`;
  } else {
    label = "В очереди";
    cls = `${styles.statusPill} ${styles.queued}`;
  }
  return <span className={cls}>{label}</span>;
};

const IconPause = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="6" y="5" width="3" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="15" y="5" width="3" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const IconStop = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export const TaskRow: React.FC<{ item: TaskItem }> = ({ item }) => {
  return (
    <div className={styles.row} role="row">
      <div className={styles.colTitle}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.meta}>
          <span>{item.pages}</span>
          {item.confidence ? <span className={styles.metaSep}> · </span> : null}
          {item.confidence ? <span>{item.confidence}</span> : null}
        </div>
      </div>

      <div className={styles.colStatus}>
        <StatusPill status={item.status} />
      </div>

      <div className={styles.colTime}>
        <div>{item.start}</div>
        <div className={styles.timeSub}>{item.duration}</div>
      </div>

      <div className={styles.colProgress}>
        <div className={styles.progressBar} aria-hidden>
          <div className={styles.progressFill} style={{ width: `${item.progress}%` }} />
        </div>
        <div className={styles.progressPct}>{Math.round(item.progress)}%</div>
      </div>

      <div className={styles.colActions}>
        <button className={styles.iconBtn} title="Pause">
          <IconPause />
        </button>
        <button className={styles.iconBtn} title="Stop">
          <IconStop />
        </button>
        <button className={styles.iconBtn} title="View">
          <IconEye />
        </button>
      </div>
    </div>
  );
};

interface TaskManagerProps {
  items: TaskItem[];
}

const TaskManager: React.FC<TaskManagerProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Управление задачами</h2>

      <div className={styles.table} role="table" aria-label="Task list">
        <div className={styles.headerRow} role="row">
          <div className={styles.colTitleHeader}>Название документа</div>
          <div className={styles.colStatusHeader}>Статус</div>
          <div className={styles.colTimeHeader}>Время</div>
          <div className={styles.colProgressHeader}>Прогресс</div>
          <div className={styles.colActionsHeader}>Действия</div>
        </div>

        {items.map((it) => (
          <TaskRow key={it.id} item={it} />
        ))}
      </div>
    </div>
  );
};

export default TaskManager;