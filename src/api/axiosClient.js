import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Tự động đính kèm JWT Token từ sessionStorage vào Header
axiosClient.interceptors.request.use(
  (config) => {
    // SỬA TẠI ĐÂY: Lấy token từ sessionStorage thay vì localStorage
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Xử lý tập trung khi Token hết hạn hoặc sai quyền (Lỗi 401/403)
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // SỬA TẠI ĐÂY: Dọn dẹp sessionStorage khi bị hết hạn phiên làm việc
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;