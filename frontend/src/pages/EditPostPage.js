// frontend/src/pages/EditPostPage.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => {
        const post = res.data;
        setTitle(post.title);
        setBody(post.body);
        setCurrentImage(post.image || '');
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to load post');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    
    const fd = new FormData();
    fd.append('title', title);
    fd.append('body', body);
    if (image) fd.append('image', image);
    
    try {
      await API.put(`/posts/${id}`, fd);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-post-page">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error && !title) {
    return (
      <div className="edit-post-page">
        <p className="error-msg">{error}</p>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="edit-post-page">
      <main className="main">
        <h2>Edit Post</h2>
        
        {error && <p className="error-msg">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="body">Content</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              required
            />
          </div>

          <div className="form-group">
            <label>Cover Image</label>
            {currentImage && (
              <div className="current-image">
                <img 
                  src={currentImage ? `/uploads/${currentImage}` : ''} 
                  alt="Current cover" 
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <small>Leave empty to keep current image</small>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link to={`/posts/${id}`} className="btn-cancel">
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditPostPage;