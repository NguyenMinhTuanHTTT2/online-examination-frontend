import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, GraduationCap, ShieldCheck } from 'lucide-react';
import axiosClient from '../api/axiosClient';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    role: 'STUDENT' // Mặc định là Học viên
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await axiosClient.post('/auth/register', formData);
      setSuccess('Đăng ký tài khoản thành công! Đang chuyển hướng...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!';
      setError(msg);
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
          <h2 style={styles.title}>Tạo Tài Khoản</h2>
          <p style={styles.subtitle}>Thi trắc nghiệm trực tuyến</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Tên đăng nhập */}
          <div style={styles.field}>
            <label style={styles.label}>Tên đăng nhập</label>
            <div style={styles.inputContainer}>
              <User size={18} color="#888" style={styles.inputIcon} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Nhập tên đăng nhập"
                style={styles.input}
              />
            </div>
          </div>

          {/* Họ và Tên */}
          <div style={styles.field}>
            <label style={styles.label}>Họ và Tên</label>
            <div style={styles.inputContainer}>
              <User size={18} color="#888" style={styles.inputIcon} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Nhập họ và tên đầy đủ"
                style={styles.input}
              />
            </div>
          </div>

          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>Địa chỉ Email</label>
            <div style={styles.inputContainer}>
              <Mail size={18} color="#888" style={styles.inputIcon} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Nhập địa chỉ email"
                style={styles.input}
              />
            </div>
          </div>

          {/* Mật khẩu */}
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
            {loading ? 'Đang tạo...' : 'Đăng Ký'}
          </button>
        </form>

        <p style={styles.footerText}>
          Đã có tài khoản? <Link to="/login" style={styles.link}>Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
}

// Bảng CSS trực tiếp (Inline styles) đồng bộ hoàn toàn với Login của bạn
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f9',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    padding: '20px 0',
  },
  card: {
    padding: '40px 30px',
    borderRadius: '12px',
    background: '#ffffff',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    width: '420px',
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
    marginBottom: '16px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
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
  selectInput: {
    width: '100%',
    padding: '12px 12px 12px 40px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    cursor: 'pointer',
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
    marginBottom: '16px',
    fontSize: '13px',
    border: '1px solid #fbd5d5',
    textAlign: 'center',
  },
  success: {
    color: '#155724',
    backgroundColor: '#d4edda',
    padding: '10px 12px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '13px',
    border: '1px solid #c3e6cb',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff', // Đổi về màu chủ đạo Xanh dương chuẩn của trang Login
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '5px',
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