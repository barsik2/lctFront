import React from "react";
import styles from "./TaskManager.module.css";
import IconPause from "../../assets/icons/pause.svg";
import IconStop from "../../assets/icons/stop.svg";
import IconEye from "../../assets/icons/eye.svg";

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
          <img src={IconPause} alt="" />
        </button>
        <button className={styles.iconBtn} title="Stop">
          <img src={IconStop} alt="" />
        </button>
        <button className={styles.iconBtn} title="View">
          <img src={IconEye} alt="" />
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