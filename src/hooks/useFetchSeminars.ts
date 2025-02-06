import { useState, useEffect } from 'react';
import axios from 'axios';
import { Seminar } from '../types/types';

const useFetchSeminars = () => {
  // Состояния
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Асинхронная функция для получения данных семинаров
    const fetchSeminars = async () => {
      try {
        // Запрос 
        const response = await axios.get('http://localhost:3001/seminars');
        setSeminars(response.data); // Устанавливаем полученные данные в состояние
        setIsLoading(false); 
      } catch {
        setError('Ошибка при загрузке данных'); // Устанавливаем ошибку в случае неудачи
        setIsLoading(false); 
      }
    };

    fetchSeminars(); 
  }, []); 


  return { seminars, isLoading, error };
};

export default useFetchSeminars;