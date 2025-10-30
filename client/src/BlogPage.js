import React from 'react';
import { ArrowLeft, Calendar, User, ArrowRight, Tag, Clock } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

function BlogPage({ onBackToHome, onNavigateToPage, onNavigateToLogin, onNavigateToSignup }) {
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Better Invoice Management in 2025",
      excerpt: "Learn the latest strategies to streamline your invoicing process and get paid faster with these proven techniques.",
      author: "Sarah Johnson",
      date: "January 15, 2025",
      readTime: "5 min read",
      category: "Business Tips",
      image: "📊"
    },
    {
      id: 2,
      title: "AI-Powered Receipt Scanning: The Future of Expense Tracking",
      excerpt: "Discover how artificial intelligence is revolutionizing the way businesses track and categorize expenses automatically.",
      author: "Mike Chen",
      date: "January 12, 2025",
      readTime: "7 min read",
      category: "Technology",
      image: "🤖"
    },
    {
      id: 3,
      title: "Tax Deduction Strategies for Small Business Owners",
      excerpt: "Maximize your tax savings with these expert-approved strategies for tracking and claiming business expenses.",
      author: "Lisa Rodriguez",
      date: "January 10, 2025",
      readTime: "8 min read",
      category: "Finance",
      image: "💰"
    },
    {
      id: 4,
      title: "QuickInvoice vs Traditional Accounting Software: A Complete Comparison",
      excerpt: "See how modern invoicing tools stack up against traditional accounting software in terms of features and usability.",
      author: "David Kim",
      date: "January 8, 2025",
      readTime: "6 min read",
      category: "Reviews",
      image: "⚖️"
    },
    {
      id: 5,
      title: "Freelancer's Guide to Getting Paid on Time",
      excerpt: "Essential strategies for freelancers to ensure timely payments and maintain healthy cash flow.",
      author: "Emma Wilson",
      date: "January 5, 2025",
      readTime: "4 min read",
      category: "Freelancing",
      image: "⏰"
    },
    {
      id: 6,
      title: "Understanding Invoice Payment Terms: Net 30, Net 15, and More",
      excerpt: "A comprehensive guide to different payment terms and how to choose the right ones for your business.",
      author: "James Thompson",
      date: "January 3, 2025",
      readTime: "5 min read",
      category: "Finance",
      image: "📋"
    }
  ];

  const categories = ["All", "Business Tips", "Technology", "Finance", "Reviews", "Taxes", "Freelancing"];

  return (
    <div className="page-container">
      <Navigation
        onNavigateToLogin={onNavigateToLogin}
        onGetStarted={onNavigateToSignup}
        onNavigateToPage={onNavigateToPage}
      />
      <div className="page-content">
        <div className="page-hero">
          <h1>QuickInvoice Blog</h1>
          <p className="page-subtitle">
            Insights, tips, and strategies to help you manage your business finances better.
          </p>
        </div>

        {/* Categories */}
        <section className="blog-categories">
          <div className="categories-list">
            {categories.map((category, index) => (
              <button 
                key={index} 
                className={`category-btn ${index === 0 ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Post */}
        <section className="featured-post">
          <div className="featured-content">
            <div className="featured-image">
              <span className="post-emoji">🚀</span>
            </div>
            <div className="featured-text">
              <div className="post-meta">
                <span className="category-badge featured">Featured</span>
                <span className="post-date">
                  <Calendar size={16} />
                  January 20, 2025
                </span>
              </div>
              <h2>The Complete Guide to Digital Invoicing in 2025</h2>
              <p>
                Everything you need to know about modern invoicing practices, from automation to AI-powered features 
                that can transform your business operations and improve cash flow.
              </p>
              <div className="post-author">
                <User size={16} />
                <span>By QuickInvoice Team</span>
                <Clock size={16} />
                <span>10 min read</span>
              </div>
              <button className="read-more-btn">
                Read Full Article
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="blog-posts">
          <h2>Latest Articles</h2>
          <div className="posts-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-post-card">
                <div className="post-image">
                  <span className="post-emoji">{post.image}</span>
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="category-badge">{post.category}</span>
                    <span className="post-date">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="post-author">
                    <User size={14} />
                    <span>{post.author}</span>
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                  <button className="read-more-btn">
                    Read More
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Get the latest invoicing tips and business insights delivered to your inbox.</p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
            <p className="newsletter-note">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <Footer onNavigateToPage={onNavigateToPage} />
    </div>
  );
}

export default BlogPage;