import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, MoreHorizontal, Send } from 'lucide-react';
import { useAuth } from '../components/AuthProvider';

export default function Community() {
  const { user } = useAuth();
  const [newPostContent, setNewPostContent] = useState('');
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      time: '2 hours ago',
      content: 'Just tried the new grain-free diet for my golden retriever, Max. His coat is looking so much shinier! Has anyone else had good experiences with grain-free?',
      likes: 24,
      isLiked: false,
      comments: [
        { id: 101, author: 'Mike T.', text: 'Yes! My lab loves it.', time: '1 hour ago' }
      ],
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      author: 'David K.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      time: '5 hours ago',
      content: 'Need advice: My cat Luna has been hiding under the bed since we moved to our new apartment yesterday. How long does it usually take for cats to adjust to a new home?',
      likes: 12,
      isLiked: true,
      comments: [],
      image: null
    }
  ]);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: user?.email?.split('@')[0] || 'Anonymous User',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      time: 'Just now',
      content: newPostContent,
      likes: 0,
      isLiked: false,
      comments: [],
      image: null
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleComment = (e: React.FormEvent, postId: number) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            author: user?.email?.split('@')[0] || 'Anonymous User',
            text: commentText,
            time: 'Just now'
          }]
        };
      }
      return post;
    }));
    setCommentText('');
    setActiveCommentId(null);
  };

  const handleShare = () => {
    alert('Link copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Pet Community</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Connect, share, and learn with other pet owners.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post Input */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold">
                  {user ? user.email?.[0].toUpperCase() : 'U'}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <form onSubmit={handlePost}>
                  <div className="border-b border-slate-200 dark:border-slate-700 focus-within:border-rose-500 transition-colors">
                    <textarea
                      rows={3}
                      className="block w-full border-0 pb-2 resize-none focus:ring-0 sm:text-sm bg-transparent placeholder-slate-400 dark:text-white"
                      placeholder={user ? "Share a photo, ask a question, or post an update..." : "Please sign in to post..."}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      disabled={!user}
                    />
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button type="button" disabled={!user} className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </button>
                    </div>
                    <button type="submit" disabled={!user || !newPostContent.trim()} className="bg-slate-900 dark:bg-rose-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-800 dark:hover:bg-rose-600 transition-colors disabled:opacity-50">
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{post.author}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{post.time}</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-slate-800 dark:text-slate-200 mb-4">{post.content}</p>
                
                {post.image && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-96" referrerPolicy="no-referrer" />
                  </div>
                )}
                
                <div className="flex items-center space-x-6 pt-3 border-t border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-1.5 transition-colors ${post.isLiked ? 'text-rose-500' : 'hover:text-rose-500'}`}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button 
                    onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}
                    className="flex items-center space-x-1.5 hover:text-blue-500 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.comments.length}</span>
                  </button>
                  <button onClick={handleShare} className="flex items-center space-x-1.5 hover:text-green-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Comments Section */}
                {activeCommentId === post.id && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-4">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="flex space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                          {comment.author[0]}
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl px-4 py-2 flex-1">
                          <div className="flex items-baseline justify-between">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{comment.author}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{comment.time}</span>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                    
                    <form onSubmit={(e) => handleComment(e, post.id)} className="flex items-center space-x-2 mt-2">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder={user ? "Write a comment..." : "Sign in to comment"}
                        disabled={!user}
                        className="flex-1 bg-slate-100 dark:bg-slate-700 border-transparent focus:border-rose-500 focus:ring-0 rounded-full px-4 py-2 text-sm dark:text-white"
                      />
                      <button 
                        type="submit" 
                        disabled={!user || !commentText.trim()}
                        className="p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 disabled:opacity-50 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Trending Topics</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-rose-500 hover:underline text-sm font-medium">#PuppyTraining</a></li>
              <li><a href="#" className="text-rose-500 hover:underline text-sm font-medium">#CatDiet</a></li>
              <li><a href="#" className="text-rose-500 hover:underline text-sm font-medium">#SeniorPetCare</a></li>
              <li><a href="#" className="text-rose-500 hover:underline text-sm font-medium">#PetInsurance</a></li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Community Guidelines</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Be kind and respectful. No medical advice should replace a vet's opinion.
            </p>
            <a href="#" className="text-sm text-blue-500 hover:underline">Read full guidelines</a>
          </div>
        </div>
      </div>
    </div>
  );
}
