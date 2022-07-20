import $api from '../http/index';

const getData = async () => $api
  .get('/api/v1/data')
  .then((response) => response.data)
  .catch((err) => console.log(err));

const DataService = {
  getData,
};
export default DataService;
