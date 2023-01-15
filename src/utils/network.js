import axios from 'axios';

export const getApiResource = async (baseURL, page = 1, id) => {
  try {
    const res = await axios({
      baseURL: baseURL,
      params: {
        page: page,
        ID: id,
      },
    },
    );
    return res.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
    return false;
  }
};

export default getApiResource;
