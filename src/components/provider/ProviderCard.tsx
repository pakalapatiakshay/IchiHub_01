import { Star, MapPin, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type VendorProfile } from '../../store/dataStore';

interface ProviderCardProps {
  provider: VendorProfile;
  distanceKm: number;
}

export default function ProviderCard({ provider, distanceKm }: ProviderCardProps) {
  return (
    <div className="card-hover overflow-hidden flex flex-col md:flex-row group">
      {/* Image */}
      <div className="md:w-[280px] h-52 md:h-auto bg-gray-100 relative overflow-hidden flex-shrink-0 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
        <img
          src={provider.image}
          alt={provider.business_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-smooth"
        />
        {/* Verified badge */}
        {provider.verification_status === 'verified' && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand-dark px-2.5 py-1 rounded-pill text-xs font-bold flex items-center shadow-soft">
            <CheckCircle size={13} className="text-brand-accent mr-1" />
            Verified
          </div>
        )}
        {/* Category chip */}
        <div className="absolute bottom-3 left-3">
          <span className="badge-accent text-[11px] uppercase tracking-wider">{provider.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-brand-dark leading-tight">{provider.business_name}</h3>
            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-pill ml-3 flex-shrink-0">
              <Star size={14} fill="#F59E0B" className="text-amber-500" />
              <span className="text-sm font-bold text-amber-700">
                {provider.rating > 0 ? provider.rating : 'New'}
              </span>
              {provider.review_count > 0 && (
                <span className="text-xs text-amber-600/70">({provider.review_count})</span>
              )}
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-brand-accent" />
              <span>{distanceKm.toFixed(1)} km away</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              {provider.availability ? (
                <span className="flex items-center gap-1.5 text-semantic-success font-medium">
                  <span className="status-online animate-pulse-soft"></span>
                  Available Now
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-semantic-error">
                  <span className="status-offline"></span>
                  Unavailable
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-border">
          <div>
            <span className="text-xs text-gray-400 font-medium">Starting from</span>
            <div className="font-bold text-lg text-brand-dark">₹{provider.starting_price}</div>
          </div>
          <div className="flex gap-2">
            <Link to={`/provider/${provider.id}`} className="btn-secondary btn-sm">
              View
            </Link>
            <Link to={`/book/${provider.id}`} className="btn-primary btn-sm">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
