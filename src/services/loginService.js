import { $http } from '@utils/util';

export default {
  login(data) {
    let { username, password } = data;
    return $http.post('/api/login', { username, password });
  }
}