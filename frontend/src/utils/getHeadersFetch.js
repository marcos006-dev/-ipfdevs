export const getHeadersFetch = () => {
  return {
    'Content-type': 'application/json; charset=UTF-8',
    authorization: localStorage.getItem('token'),
  };
};
