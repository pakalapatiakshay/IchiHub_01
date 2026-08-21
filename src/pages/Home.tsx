import { MapPin, Search, ArrowRight, ShieldCheck, Zap, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/services');
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative bg-brand-dark text-white min-h-[620px] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/30 z-10" />
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
            alt="Electrician working"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-16 pb-28">
          <div className="max-w-3xl space-y-8">
            {/* Tag */}
            <div className="badge-glass text-xs tracking-[0.12em] uppercase animate-fade-up">
              <span className="status-online mr-2"></span>
              Local Services, Right Near You
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-[1.08] tracking-tight animate-fade-up" style={{ animationDelay: '80ms' }}>
              Trusted Local<br />
              Services.{' '}
              <span className="text-gray-400">Just Around<br className="hidden md:block" /> the Corner.</span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: '160ms' }}>
              Find reliable electricians, plumbers, mechanics, cleaners, and other service professionals near you.
            </p>

            {/* Search Bar — Glass Pill */}
            <form
              onSubmit={handleSearch}
              className="glass rounded-3xl p-2 max-w-2xl shadow-float animate-fade-up flex flex-col sm:flex-row gap-2"
              style={{ animationDelay: '240ms' }}
            >
              <div className="flex-1 flex items-center px-4 py-1 bg-white/60 rounded-2xl">
                <MapPin className="text-brand-accent mr-2.5 shrink-0" size={18} />
                <input
                  type="text"
                  placeholder="Your Location"
                  defaultValue="Current Location"
                  className="w-full bg-transparent py-2.5 text-brand-dark outline-none font-medium text-sm placeholder:text-gray-400"
                />
              </div>
              <div className="flex-1 flex items-center px-4 py-1 bg-white/60 rounded-2xl">
                <Search className="text-brand-accent mr-2.5 shrink-0" size={18} />
                <input
                  type="text"
                  placeholder="What service do you need?"
                  className="w-full bg-transparent py-2.5 text-brand-dark outline-none font-medium text-sm placeholder:text-gray-400"
                />
              </div>
              <button type="submit" className="btn-primary whitespace-nowrap px-6">
                Find Nearby
              </button>
            </form>

            <div className="text-xs text-gray-500 flex items-center gap-2 animate-fade-up" style={{ animationDelay: '320ms' }}>
              <MapPin size={12} className="text-brand-accent" />
              <span>Searching within 1 KM radius by default</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST INDICATORS */}
      <section className="bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 stagger-children">
            {[
              { icon: ShieldCheck, title: 'Verified Providers', desc: 'Background checked' },
              { icon: MapPin, title: 'Local Professionals', desc: 'In your neighborhood' },
              { icon: Zap, title: 'Transparent Pricing', desc: 'No hidden fees' },
              { icon: Star, title: 'Customer Reviews', desc: 'Real ratings from locals' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 md:gap-4">
                <div className="bg-brand-accentLight p-3 rounded-2xl text-brand-accent shrink-0">
                  <feature.icon size={24} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICE CATEGORIES */}
      <section className="py-20 md:py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-12">
            <span className="section-label">What do you need?</span>
            <h2 className="section-title">Services For Every Need</h2>
            <p className="section-desc">From quick repairs to complete home and vehicle services, find professionals near you.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
            {[
              { name: 'Electrician', img: 'https://images.unsplash.com/photo-1621905251918-48416bd8af50?q=80&w=2069&auto=format&fit=crop' },
              { name: 'Plumber', img: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Car Mechanic', img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974&auto=format&fit=crop' },
              { name: 'Cleaning', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop' },
            ].map((cat, i) => (
              <Link
                to="/services"
                key={i}
                className="card-interactive group flex flex-col overflow-hidden"
              >
                <div className="h-48 overflow-hidden relative rounded-t-3xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-smooth"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="badge-accent mb-3 self-start text-[11px]">
                    <Zap size={12} className="mr-1" />
                    Available
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-1.5">{cat.name}</h3>
                  <p className="text-gray-500 text-sm mb-5 flex-1 leading-relaxed">Expert {cat.name.toLowerCase()}s available in your area.</p>
                  <div className="text-brand-accent font-semibold inline-flex items-center text-sm group-hover:gap-2 gap-1 transition-all duration-200">
                    Find Providers <ArrowRight size={15} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EMERGENCY CTA */}
      <section className="bg-brand-dark text-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-5 leading-tight">Need Help Right Now?</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">Find available service providers near you and get connected quickly for urgent repairs.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/services" className="btn-primary btn-lg">
              Find Help Near Me
            </Link>
            <Link to="/vendor/register" className="btn-ghost-white btn-lg">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
