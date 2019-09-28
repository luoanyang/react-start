import { $http } from './../utils/util';

export default {
  findByName(name) {
    return $http.get('/api/activity', { params: { name } });
  },

  downExcel(name) {
    return $http.get('/api/activity/downExcel', { params: { name } });
  }
}