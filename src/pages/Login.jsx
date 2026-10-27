import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, GraduationCap } from 'lucide-react';

import axiosClient from '../api/axiosClient';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axiosClient.post('/auth/login', formData);
      
      console.log("Response từ server:", response);

      // Lấy dữ liệu trả về từ response
      const resData = response?.data || response; 
      const token = resData?.accessToken || resData?.token;

      if (token) {
        // 1. DÙNG sessionStorage ĐỂ DỮ LIỆU ĐÓC ĐỘC LẬP THEO TỪNG TAB
        sessionStorage.clear(); // Xoá sạch bộ nhớ phiên làm việc cũ của TAB này
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(resData));

        // 2. Lấy danh sách roles
        const roles = resData?.roles || resData?.user?.roles || [];
        
        console.log("Danh sách quyền (roles):", roles);

        // Kiểm tra xem có chứa quyền giáo viên hoặc admin không
        const isTeacherOrAdmin = roles.includes('ROLE_TEACHER') || roles.includes('ROLE_ADMIN');

        // Điều hướng tương ứng
        if (isTeacherOrAdmin) {
          navigate('/teacher/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      } else {
        setError('Đăng nhập thành công nhưng không tìm thấy Token!');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!';
      setError(typeof msg === 'string' ? msg : 'Đăng nhập thất bại. Vui lòng kiểm tra lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconWrapper}>
            <GraduationCap size={32} color="#007bff" />
          </div>
          <h2 style={styles.title}>Đăng Nhập Hệ Thống</h2>
          <p style={styles.subtitle}>Thi trắc nghiệm trực tuyến</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Tên đăng nhập / Email</label>
            <div style={styles.inputContainer}>
              <Mail size={18} color="#888" style={styles.inputIcon} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Nhập username của bạn"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Mật khẩu</label>
            <div style={styles.inputContainer}>
              <Lock size={18} color="#888" style={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Nhập mật khẩu"
                style={styles.inputWithIconRight}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? <EyeOff size={18} color="#888" /> : <Eye size={18} color="#888" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
          </button>
        </form>

        <p style={styles.footerText}>
          Chưa có tài khoản? <Link to="/register" style={styles.link}>Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}

// Bảng CSS trực tiếp (Inline styles)
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f6f9',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  card: {
    padding: '40px 30px',
    borderRadius: '12px',
    background: '#ffffff',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    width: '400px',
    boxSizing: 'border-box',
  },
  header: {
    textAlign: 'center',
    marginBottom: '25px',
  },
  iconWrapper: {
    display: 'inline-flex',
    padding: '12px',
    backgroundColor: '#eef2ff',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  title: {
    margin: '0 0 5px 0',
    fontSize: '24px',
    color: '#333',
    fontWeight: '700',
  },
  subtitle: {
    margin: '0',
    fontSize: '14px',
    color: '#666',
  },
  field: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#444',
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
  },
  input: {
    width: '100%',
    padding: '12px 12px 12px 40px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  inputWithIconRight: {
    width: '100%',
    padding: '12px 40px 12px 40px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  eyeButton: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
  },
  error: {
    color: '#d93838',
    backgroundColor: '#fde8e8',
    padding: '10px 12px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '13px',
    border: '1px solid #fbd5d5',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  footerText: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '600',
  },
};