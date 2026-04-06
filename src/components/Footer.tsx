import { HeartPulse, Github, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center flex-shrink-0 mb-4">
              <HeartPulse className="h-8 w-8 text-rose-500" />
              <span className="ml-2 text-xl font-bold text-white tracking-tight">PawCheck</span>
            </Link>
            <p className="text-sm text-slate-400 mb-4">
              Empowering pet owners with AI-driven health insights, connecting you with local vets, and fostering a supportive community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/health-check" className="hover:text-rose-400 transition-colors">AI Health Check</Link></li>
              <li><Link to="/vet-locator" className="hover:text-rose-400 transition-colors">Find a Vet</Link></li>
              <li><Link to="/community" className="hover:text-rose-400 transition-colors">Community Forum</Link></li>
              <li><Link to="/blog" className="hover:text-rose-400 transition-colors">Pet Care Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-rose-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Subscribe</h3>
            <p className="text-sm text-slate-400 mb-4">Get the latest pet health tips delivered to your inbox.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-rose-500 text-white text-sm"
              />
              <button
                type="submit"
                className="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-r-md text-white text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
          &copy; {new Date().getFullYear()} PawCheck. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
