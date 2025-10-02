import React, { useState, useEffect } from 'react';
import styles from './stackTasks.module.css';
import TaskManager, { type TaskItem } from '../../components/TaskManager/TaskManager';

const mockItems: TaskItem[] = Array.from({ length: 8 }).map((_, i) => ({
    id: String(i + 1),
    title: `Название документа №${i + 1}`,
    pages: "157/234 страниц",
    confidence: "Уверенность: 91.4",
    status: i % 3 === 0 ? "running" : i % 3 === 1 ? "done" : "queued",
    start: "Начало: 14:30",
    duration: "Длительность: 1ч 20м",
    progress: 67 - i * 3,
}));

const StackTasks: React.FC = () => {
  const [items, setItems] = useState<TaskItem[]>([]);

  useEffect(() => {
    // Симуляция загрузки с сервера — заменить на реальный fetch/axios, потом как подключим апи
    const t = setTimeout(() => setItems(mockItems), 600);
    return () => clearTimeout(t);
  }, []);

    return (
        <div>
            <h1 className={styles.title}>Очередь задач</h1>
            <p className={styles.desc}>Управление задачами обработки документов</p>
            <TaskManager items={items} />
        </div>
    )
};


export default StackTasks;