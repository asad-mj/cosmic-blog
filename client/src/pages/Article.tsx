import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface Author {
  id: number;
  name: string;
  avatarUrl: string;
  bio?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishedAt: string;
  categoryId: number;
  authorId: number;
  readTime: number;
}

interface Comment {
  id: number;
  content: string;
  postId: number;
  userId: number;
  createdAt: string;
}

const Article: React.FC<{ slug: string }> = ({ slug }) => {
  const [location] = useLocation();
  const { toast } = useToast();
  const [commentText, setCommentText] = useState('');
  
  // Fetch article data
  const { data: post, isLoading: isLoadingPost } = useQuery<Post>({
    queryKey: [`/api/posts/${slug}`],
  });
  
  // Fetch categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  // Fetch users
  const { data: users } = useQuery<Author[]>({
    queryKey: ['/api/users'],
    enabled: !!post,
  });
  
  // Fetch comments
  const { 
    data: comments, 
    isLoading: isLoadingComments,
    refetch: refetchComments
  } = useQuery<Comment[]>({
    queryKey: [`/api/posts/${slug}/comments`],
    enabled: !!post,
  });
  
  // Find category and author for the post
  const category = post && categories 
    ? categories.find(cat => cat.id === post.categoryId) 
    : null;
  
  const author = post && users
    ? users.find(user => user.id === post.authorId)
    : null;
  
  // Format the published date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Add a new comment
  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please write something before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await apiRequest('POST', `/api/posts/${slug}/comments`, {
        content: commentText
      });
      
      // Reset form and refetch comments
      setCommentText('');
      refetchComments();
      
      toast({
        title: "Comment Added",
        description: "Your comment has been posted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to post comment",
        variant: "destructive",
      });
    }
  };
  
  // Get user info for a comment
  const getCommentUser = (userId: number) => {
    return users?.find(user => user.id === userId) || { 
      id: 0, 
      name: 'Anonymous', 
      avatarUrl: 'https://i.pravatar.cc/300' 
    };
  };
  
  // Format comment date
  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  useEffect(() => {
    // Scroll to top when article loads
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (isLoadingPost) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="h-10 w-3/4 bg-[#1e1e2a] rounded-lg animate-pulse mb-4"></div>
            <div className="h-64 w-full bg-[#1e1e2a] rounded-lg animate-pulse mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-[#1e1e2a] rounded animate-pulse"></div>
              <div className="h-4 w-full bg-[#1e1e2a] rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-[#1e1e2a] rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-space font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="neon-border rounded-full px-8 py-3 bg-[#1e1e2a] text-[#00f0ff] font-medium hover:bg-[#252538] transition-all">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen">
      {/* Featured Image Header */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121225]/70 via-transparent to-[#121225]"></div>
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-6 left-6">
            <Link href={`/categories/${category.slug}`}>
              <span className="bg-[#00f0ff]/80 text-white text-sm font-bold px-4 py-1.5 rounded-full backdrop-blur-sm">
                {category.name}
              </span>
            </Link>
          </div>
        )}
      </div>
      
      {/* Article Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="max-w-4xl mx-auto bg-[#1e1e2a]/90 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-xl border border-[#2c2c42] mb-12">
          <h1 className="font-space text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between mb-8 pb-8 border-b border-[#2c2c42]">
            {/* Author Info */}
            {author && (
              <div className="flex items-center mb-4 md:mb-0">
                <img src={author.avatarUrl} alt={author.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="font-medium text-[#e2e8f0]">{author.name}</div>
                  <div className="text-sm text-gray-400">
                    {formatDate(post.publishedAt)} • {post.readTime} min read
                  </div>
                </div>
              </div>
            )}
            
            {/* Share Buttons */}
            <div className="flex space-x-3">
              <button className="w-10 h-10 rounded-full bg-[#252538] flex items-center justify-center hover:bg-[#2c2c42] transition-colors">
                <i className="fab fa-twitter text-gray-300"></i>
              </button>
              <button className="w-10 h-10 rounded-full bg-[#252538] flex items-center justify-center hover:bg-[#2c2c42] transition-colors">
                <i className="fab fa-facebook-f text-gray-300"></i>
              </button>
              <button className="w-10 h-10 rounded-full bg-[#252538] flex items-center justify-center hover:bg-[#2c2c42] transition-colors">
                <i className="fab fa-linkedin-in text-gray-300"></i>
              </button>
              <button className="w-10 h-10 rounded-full bg-[#252538] flex items-center justify-center hover:bg-[#2c2c42] transition-colors">
                <i className="fas fa-link text-gray-300"></i>
              </button>
            </div>
          </div>
          
          {/* Article Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            {/* Render article content with proper formatting */}
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {/* Tags Section */}
          <div className="mt-12 pt-6 border-t border-[#2c2c42]">
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-400 mr-2">Tags:</span>
              <a href="#" className="px-3 py-1 rounded-full bg-[#252538] text-sm text-gray-300 hover:bg-[#2c2c42] transition-colors">
                Future Tech
              </a>
              <a href="#" className="px-3 py-1 rounded-full bg-[#252538] text-sm text-gray-300 hover:bg-[#2c2c42] transition-colors">
                {category?.name || 'Technology'}
              </a>
              <a href="#" className="px-3 py-1 rounded-full bg-[#252538] text-sm text-gray-300 hover:bg-[#2c2c42] transition-colors">
                Innovation
              </a>
            </div>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="font-space text-2xl font-bold mb-6">Comments</h3>
          
          {/* Add Comment Form */}
          <form onSubmit={addComment} className="mb-10">
            <div className="bg-[#1e1e2a] rounded-xl p-6 border border-[#2c2c42]">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full bg-[#252538] text-gray-200 border border-[#333350] rounded-lg p-4 min-h-[120px] focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] placeholder-gray-500 transition-all mb-4"
              ></textarea>
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="neon-border rounded-full px-6 py-2 bg-[#1e1e2a] text-[#00f0ff] font-medium hover:bg-[#252538] transition-all"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </form>
          
          {/* Comments List */}
          <div className="space-y-6">
            {isLoadingComments ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00f0ff] mb-4"></div>
                <p className="text-gray-400">Loading comments...</p>
              </div>
            ) : comments && comments.length > 0 ? (
              comments.map((comment) => {
                const commentUser = getCommentUser(comment.userId);
                
                return (
                  <div key={comment.id} className="bg-[#1e1e2a] rounded-xl p-6 border border-[#2c2c42]">
                    <div className="flex items-start mb-4">
                      <img src={commentUser.avatarUrl} alt={commentUser.name} className="w-10 h-10 rounded-full mr-4" />
                      <div>
                        <div className="font-medium text-[#e2e8f0]">{commentUser.name}</div>
                        <div className="text-xs text-gray-400">{formatCommentDate(comment.createdAt)}</div>
                      </div>
                    </div>
                    <p className="text-gray-300">{comment.content}</p>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 bg-[#1e1e2a] rounded-xl border border-[#2c2c42]">
                <p className="text-gray-400">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Article;
