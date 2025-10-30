export const apiUrl = 'https://skyline-construction-6.onrender.com/api/';
export const fileUrl = 'https://skyline-construction-6.onrender.com/';
export const token = () => {
      const userinfo = localStorage.getItem('userinfo');
      const data = JSON.parse(userinfo);
      return data.token;
}