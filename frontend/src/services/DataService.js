import $api from '../http/index';

            const getData = async () => $api
                    .get('/api/v1/data')
                    .then((response) => { 
                        //console.log('Data from server: ', response.data);
                return response.data});
                    
                    
const DataService = {
    getData
}
    export default DataService;
