import {baseUrl} from './httpConfig';

export const apiService = async (method = null, path = null, payload) => {
  try {
    const response = await fetch(`${baseUrl}${path}`,{
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: payload
        ? JSON.stringify({
            ...payload,
          })
        : null,
    });
    let data = await response.json();
    return data;
  } catch (e) {
    console.log(e, 'something went wrong');
    return e;
  }
};
