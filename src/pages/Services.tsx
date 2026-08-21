import { useState, useMemo } from 'react';
import { useDataStore, calculateDistance } from '../store/dataStore';
import ProviderCard from '../components/provider/ProviderCard';
import { MapPin, SlidersHorizontal } from 'lucide-react';

// Bangalore center for demo purposes
const CUSTOMER_LAT = 12.9716;
const CUSTOMER_LNG = 77.5946;

export default function Services() {
  const { vendors } = useDataStore();
  const [radius, setRadius] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(vendors.map(v => v.category)))];

  const nearbyProviders = useMemo(() => {
    return vendors
      .map(v => ({ ...v, distance: calculateDistance(CUSTOMER_LAT, CUSTOMER_LNG, v.lat, v.lng) }))
      .filter(v => v.distance <= radius)
      .filter(v => selectedCategory === 'All' || v.category === selectedCategory)
      .sort((a, b) => a.distance - b.distance);
  }, [vendors, radius, selectedCategory]);

  return (
    <div className="bg-brand-light min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col lg:flex-row gap-6 md:gap-8">

        {/* Filters Sidebar */}
        <div className="w-full lg:w-[280px] flex-shrink-0">
          <div className="card p-5 sticky top-24">
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-brand-border text-brand-dark">
              <div className="bg-brand-accentLight p-2 rounded-xl text-brand-accent">
                <SlidersHorizontal size={16} />
              </div>
              <h2 className="font-bold text-sm">Filters</h2>
            </div>

            {/* Radius Filter */}
            <div className="mb-8">
              <label className="flex justify-between items-center text-sm font-semibold text-gray-700 mb-4">
                <span>Search Radius</span>
                <span className="badge-accent">{radius} KM</span>
              </label>
              <input
                type="range"
                min="1" max="15" step="1"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-2 font-medium">
                <span>1 KM</span>
                <span>15 KM</span>
              </div>
            </div>

            {/* Category Filter — Pill Chips */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-pill text-xs font-semibold transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-brand-accent text-white shadow-soft'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="w-full lg:flex-1 min-w-0">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-brand-dark">Trusted Providers Near You</h1>
            <div className="badge bg-white shadow-soft text-gray-600 font-medium py-2 px-4">
              <MapPin size={14} className="text-brand-accent mr-1.5" />
              Near <strong className="text-brand-dark ml-1">Current Location</strong>
            </div>
          </div>

          {nearbyProviders.length > 0 ? (
            <div className="space-y-5">
              <p className="text-gray-500 text-sm font-medium">
                Found {nearbyProviders.length} provider{nearbyProviders.length !== 1 && 's'} within {radius} KM
              </p>
              <div className="stagger-children space-y-5">
                {nearbyProviders.map(provider => (
                  <ProviderCard key={provider.id} provider={provider} distanceKm={provider.distance} />
                ))}
              </div>
            </div>
          ) : (
            <div className="card p-12 md:p-16 text-center flex flex-col items-center">
              <div className="bg-gray-100 p-5 rounded-3xl mb-5 text-gray-400">
                <MapPin size={40} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">No providers found nearby</h3>
              <p className="text-gray-500 mb-8 max-w-md text-sm leading-relaxed">
                We couldn't find any trusted professionals in the selected category within your current {radius} KM radius.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setRadius(3)} className="btn-secondary btn-sm">
                  Expand to 3 KM
                </button>
                <button onClick={() => setRadius(5)} className="btn-primary btn-sm">
                  Expand to 5 KM
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
