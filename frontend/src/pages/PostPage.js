// frontend/src/pages/PostPage.js
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to load post');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="post-page">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-page">
        <p className="error-msg">{error}</p>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  const isOwner = user && post?.author && user._id === post.author._id;
  const isAdmin = user?.role === 'admin';

  return (
    <div className="post-page">
      <main className="main">
        <article className="post-article">
          {post.image && (
            <div className="post-image">
              <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} />
            </div>
          )}
          
          <header className="post-header">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span className="post-author">
                By {post.author?.name || 'Unknown'}
              </span>
              <span className="post-date">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </header>

          <div className="post-body">
            <p>{post.body}</p>
          </div>

          <footer className="post-footer">
            {(isOwner || isAdmin) && (
              <div className="post-actions">
                <Link to={`/edit/${post._id}`} className="btn-edit">
                  Edit Post
                </Link>
              </div>
            )}
            <Link to="/" className="back-link">← Back to Home</Link>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default PostPage;