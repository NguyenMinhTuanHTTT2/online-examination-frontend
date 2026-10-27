import axiosClient from '../../api/axiosClient';

export const teacherService = {
  getDashboardData: async () => {
    // axiosClient đã tự động gắn Token và baseURL ('http://localhost:8080/api/v1')
    return await axiosClient.get('/teacher/dashboard');
  }
};