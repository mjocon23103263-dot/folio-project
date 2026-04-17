import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostPage from './pages/PostPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import ProjectRoute from './components/ProjectRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/create" element={
            <ProjectRoute>
              <CreatePostPage />
            </ProjectRoute>
          } />
          <Route path="/edit/:id" element={
            <ProjectRoute>
              <EditPostPage />
            </ProjectRoute>
          } />
          <Route path="/profile" element={
            <ProjectRoute>
              <ProfilePage />
            </ProjectRoute>
          } />
          <Route path="/admin" element={
            <ProjectRoute requireAdmin>
              <AdminPage />
            </ProjectRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;