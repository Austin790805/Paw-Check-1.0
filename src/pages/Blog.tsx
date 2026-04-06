import { Calendar, User, ArrowRight } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: '10 Signs Your Dog Might Be Stressed',
      excerpt: 'Learn to recognize the subtle signs of canine anxiety and discover practical ways to help your furry friend feel more relaxed and secure.',
      author: 'Dr. Sarah Jenkins',
      date: 'Oct 12, 2023',
      category: 'Behavior',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Feline Nutrition',
      excerpt: 'Wet food vs. dry food? Grain-free or not? We break down everything you need to know about feeding your cat a balanced, healthy diet.',
      author: 'Dr. Michael Chen',
      date: 'Oct 05, 2023',
      category: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Preparing Your Pet for Winter',
      excerpt: 'As the temperature drops, your pet\'s needs change. Here are essential tips to keep your dogs and cats safe, warm, and happy during the colder months.',
      author: 'Emily Rodriguez, Vet Tech',
      date: 'Sep 28, 2023',
      category: 'Seasonal Care',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Dental Health: Why Brushing Matters',
      excerpt: 'Dental disease is one of the most common health issues in pets. Discover easy ways to maintain your pet\'s oral hygiene at home.',
      author: 'Dr. Sarah Jenkins',
      date: 'Sep 15, 2023',
      category: 'Health',
      image: 'https://images.unsplash.com/photo-1606314816918-d74868f04fd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Pet Care Blog</h1>
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Expert advice, health tips, and heartwarming stories to help you give your pets the best life possible.
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col lg:flex-row hover:shadow-md transition-shadow">
          <div className="lg:w-1/2 h-64 lg:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Featured post" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <span className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-2">Featured Article</span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              <a href="#" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Understanding Your Pet's Body Language</a>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
              Pets communicate constantly, but not with words. Learn how to read your dog's tail wags, your cat's ear positions, and what they're really trying to tell you.
            </p>
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
              <div className="flex items-center mr-6">
                <User className="w-4 h-4 mr-2" />
                Dr. Emily Rodriguez
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Oct 15, 2023
              </div>
            </div>
            <div>
              <a href="#" className="inline-flex items-center font-medium text-rose-500 hover:text-rose-600 dark:hover:text-rose-400">
                Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts Grid */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Recent Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-2">{post.category}</span>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">
                  <a href="#" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">{post.title}</a>
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <button className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-full font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          Load More Articles
        </button>
      </div>
    </div>
  );
}
