// backend/utils/generateCharacter.js
import axios from 'axios';

const generateCharacter = async () => {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const user = response.data.results[0];

    return {
      firstName: user.name.first,
      lastName: user.name.last,
      country: user.location.country,
    };
  } catch (error) {
    console.error('Error generating character:', error);
    // Fallback to manual generation if API fails
    return {
      firstName: 'Generated',
      lastName: 'User',
      country: 'Randomland'
    };
  }
};

export default generateCharacter;