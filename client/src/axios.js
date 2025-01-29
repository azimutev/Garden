import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/', // Replace with your API base URL
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

async function fetchData() {
  // Изчисляване на последните 24 часа
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Сега - 24 часа

  const fromDate = yesterday.toISOString(); // ISO формат за fromDate
  const toDate = now.toISOString();        // ISO формат за toDate

  try {
    const response = await instance.get('getChartDataByDate', {
      params: {
        fromDate,
        toDate,
        sensor: 'temperature',
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


