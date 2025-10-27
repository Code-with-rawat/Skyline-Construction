export const apiUrl = 'https://skyline-construction.onrender.comapi/';
export const fileUrl = 'https://skyline-construction.onrender.com/';
export const token = () => {
      const userinfo = localStorage.getItem('userinfo');
      const data = JSON.parse(userinfo);
      return data.token;
}