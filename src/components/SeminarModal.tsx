import { useState } from 'react';
import { Seminar } from '../types/types';
import axios from 'axios';
import './SeminarModal.css'; 

interface SeminarModalProps {
  seminar: Seminar; 
  closeModal: () => void; 
}

const SeminarModal = ({ seminar, closeModal }: SeminarModalProps) => {
  // Состояния
  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);

  // Функция для сохранения изменений семинара
  const handleSave = async () => {
    try {
      // Отправляем PUT-запрос для обновления данных семинара
      await axios.put(`http://localhost:3001/seminars/${seminar.id}`, {
        ...seminar,
        title,
        description,
      });
      closeModal(); 
      window.location.reload(); 
    } catch {
      alert('Произошла ошибка при сохранении изменений.'); 
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Редактирование семинара</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          className="modal-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
          className="modal-textarea"
        />
        <button onClick={handleSave} className="modal-button">Сохранить</button>
        <button onClick={closeModal} className="modal-button">Закрыть</button>
      </div>
    </div>
  );
};

export default SeminarModal;