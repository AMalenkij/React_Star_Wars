import axios from 'axios';
import {BASE_URL} from '../constants/Resources.js';

const swapiApi = axios.create({
     baseURL: BASE_URL,
     timeout: 60000,
   });

   export async function getApiResource (url, page = 1) {
     try {
          const res = await swapiApi({
          url: url,
          params: {
                 page: page, 
             },
         },);
         return res.data
     } catch (error) {
         if (error.response) {
          //    console.log(error.response.data);
          //    console.log(error.response.status);
          //    console.log(error.response.headers);
         } else if (error.request) {
             console.log(error.request);
         } else {
             console.log('Error', error.message);
         }
         console.log(error.config);
         return false;
     }
 };

 export async function getApi (url) {
    try {
         const res = await swapiApi({
         url: url,
        },);
        return res.data
    } catch (error) {
        if (error.response) {
         //    console.log(error.response.data);
         //    console.log(error.response.status);
         //    console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
        return false;
    }
};

export async function getConcurrentApi(urls) {
    try {
        const responses = await Promise.all(urls.map((url) => axios.get(url)));
        return responses.map((response) => response.data);
    } catch (error) {
        console.error(error);
        return false;
    }
}