export const apiUrl = 'http://localhost:8000/api/';
export const fileUrl = 'http://localhost:8000/';
export const token = () => {
      const userinfo = localStorage.getItem('userinfo');
      const data = JSON.parse(userinfo);
      return data.token;
}