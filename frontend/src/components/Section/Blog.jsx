
import { BlogPostCard } from '../common';

export default function Blog() {
  const blogPosts = [
    
  ];
  return (
      
    <article className="bg-eerie-black rounded-2xl p-8 shadow-xl">
      <header className="mb-8">
        <h2 className="text-3xl font-semibold text-white pb-4 border-b border-jet">
          Latest Posts
        </h2>
      </header>
      {
        blogPosts.length === 0? (
          <p className="text-center text-white">No blog posts found.</p>
        ) : (<div className="grid md:grid-cols-2 gap-6">
        {blogPosts.map(post => (
          <BlogPostCard
            key={post.id}
            image={post.image}
            category={post.category}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
          />
        ))}
      </div>
        )
      }
    </article>
  );
}
    
