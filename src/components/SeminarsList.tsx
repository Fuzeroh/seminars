import { useState } from 'react';
import SeminarModal from './SeminarModal';
import useFetchSeminars from '../hooks/useFetchSeminars';
import { Seminar } from '../types/types';
import axios from 'axios';
import './SeminarsList.css';

const SeminarsList = () => {
  // Используем кастомный хук для получения списка семинаров
  const { seminars, isLoading, error } = useFetchSeminars();

  // Состояния
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | undefined>();

  // Обработчик для кнопки редактирования семинара
  const handleEditClick = (seminar: Seminar) => {
    setSelectedSeminar(seminar); 
    setShowModal(true); 
  };

  // Обработчик для кнопки удаления семинара
  const handleDeleteClick = async (seminar: Seminar) => {
    if (window.confirm(`Вы уверены, что хотите удалить семинар "${seminar.title}"?`)) {
      try {
        // Отправляем запрос на удаление семинара
        await axios.delete(`http://localhost:3001/seminars/${seminar.id}`);
        window.location.reload(); 
      } catch {
        alert('Произошла ошибка при удалении семинара.');
      }
    }
  };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <ul>
        {seminars.map((seminar) => (
          <li key={seminar.id}>
            <strong>{seminar.title}</strong> {seminar.date}, {seminar.time}
            <br />
            <img src={seminar.photo} alt={seminar.title}/>
            <br />
            <p>{seminar.description}</p>
            <button onClick={() => handleEditClick(seminar)}>Редактировать</button>
            <button onClick={() => handleDeleteClick(seminar)}>Удалить</button>
          </li>
        ))}
      </ul>
      {showModal && selectedSeminar && (
        <SeminarModal
          seminar={selectedSeminar}
          closeModal={() => setShowModal(false)} // Закрытие модального окна
        />
      )}
    </>
  );
};

export default SeminarsList;