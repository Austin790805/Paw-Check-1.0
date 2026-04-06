import { Link } from 'react-router-dom';
import { Stethoscope, MapPin, Users, ArrowRight, ShieldCheck, Clock, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-slate-900 overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white dark:bg-slate-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 transition-colors">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Your Pet's Health,</span>{' '}
                  <span className="block text-rose-500 xl:inline">Simplified.</span>
                </h1>
                <p className="mt-3 text-base text-slate-500 dark:text-slate-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Get instant preliminary health assessments for your furry friends using our advanced AI technology. Connect with local vets and join a community of pet lovers.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/health-check"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-rose-500 hover:bg-rose-600 md:py-4 md:text-lg transition-colors"
                    >
                      Start Health Check
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/vet-locator"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30 hover:bg-rose-200 dark:hover:bg-rose-900/50 md:py-4 md:text-lg transition-colors"
                    >
                      Find a Vet
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Happy dog"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-rose-500 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Everything you need for your pet's well-being
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center mb-6">
                  <Stethoscope className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">AI Health Assessment</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Upload a photo or describe symptoms to get an instant, preliminary health analysis powered by advanced AI.
                </p>
                <Link to="/health-check" className="text-rose-500 font-medium flex items-center hover:text-rose-600">
                  Try it now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 2 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Vet Locator</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Find trusted veterinarians near you, view ratings, and book appointments directly through our platform.
                </p>
                <Link to="/vet-locator" className="text-blue-500 font-medium flex items-center hover:text-blue-600">
                  Find vets <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 3 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Pet Community</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Connect with other pet owners, share experiences, ask questions, and get advice from a supportive community.
                </p>
                <Link to="/community" className="text-green-500 font-medium flex items-center hover:text-green-600">
                  Join community <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
                Why trust PawCheck?
              </h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ShieldCheck className="h-6 w-6 text-rose-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Privacy First</h4>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">Your pet's data is securely stored and never shared without your explicit consent.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-rose-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">24/7 Availability</h4>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">Our AI assessment tool is available around the clock for those late-night worries.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Heart className="h-6 w-6 text-rose-500" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Built for Pet Lovers</h4>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">Designed by a team of pet enthusiasts and veterinary consultants to ensure reliability.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                className="rounded-2xl shadow-xl"
                src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Veterinarian examining a dog"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
