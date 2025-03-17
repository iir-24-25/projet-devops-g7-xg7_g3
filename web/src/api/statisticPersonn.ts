import axios from 'axios';

export const fetchData = async (baseUrl: string, endpoint: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (baseUrl: string, endpoint: string, data: any) => {
  try {
    const response = await axios.post(`${baseUrl}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Add more API functions as needed