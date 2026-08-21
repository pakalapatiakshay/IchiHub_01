import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { useDataStore, calculateDistance } from '../store/dataStore';
import { useToastStore } from '../store/toastStore';
import { ArrowLeft, MapPin } from 'lucide-react';

const CUSTOMER_LAT = 12.9716;
const CUSTOMER_LNG = 77.5946;

export default function BookService() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { vendors, addBooking } = useDataStore();
  const { addToast } = useToastStore();

  const provider = useMemo(() => vendors.find(v => v.id === id), [vendors, id]);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: 'Current Location (12.9716, 77.5946)',
    notes: ''
  });

  if (!provider) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-brand-light">
        <p className="text-lg text-gray-500">Provider not found</p>
      </div>
    );
  }

  // If customer is not logged in, prompt them
  if (!user || user.role !== 'customer') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-brand-light">
        <div className="card p-10 text-center max-w-md mx-4">
          <h2 className="text-xl font-bold text-brand-dark mb-3">Login Required</h2>
          <p className="text-gray-500 text-sm mb-6">Please login as a customer to book this service.</p>
          <button onClick={() => navigate('/customer/login')} className="btn-primary">
            Login Now
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    addBooking({
      id: Math.random().toString(36).substr(2, 9),
      customer_id: user.id,
      vendor_id: provider.id,
      service: provider.category,
      date: formData.date,
      time: formData.time,
      status: 'pending',
      address: formData.address,
      notes: formData.notes,
      created_at: new Date().toISOString()
    });
    addToast(`Booking confirmed with ${provider.business_name}!`, 'success');
    navigate('/customer/dashboard');
  };

  const distance = calculateDistance(CUSTOMER_LAT, CUSTOMER_LNG, provider.lat, provider.lng);

  return (
    <div className="bg-brand-light min-h-screen py-8 md:py-10">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <button
          onClick={() => navigate(-1)}
          className="btn-ghost text-gray-500 px-3 py-2 mb-5 text-sm"
        >
          <ArrowLeft size={16} className="mr-1.5" /> Back to Profile
        </button>

        <div className="card overflow-hidden">
          {/* Provider Info Header */}
          <div className="p-5 border-b border-brand-border bg-gray-50/50 flex items-center gap-4">
            <img
              src={provider.image}
              className="w-14 h-14 rounded-2xl object-cover shadow-soft"
              alt="Provider"
            />
            <div>
              <h2 className="text-lg font-bold text-brand-dark">Book {provider.business_name}</h2>
              <div className="flex items-center text-xs text-gray-500 mt-0.5">
                <MapPin size={12} className="mr-1 text-brand-accent" /> {distance.toFixed(1)} km away
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form className="p-6 md:p-8" onSubmit={handleBooking}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Preferred Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Service Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Describe your requirement</label>
                <textarea
                  rows={4}
                  required
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="input-field resize-none"
                  placeholder="What needs to be done?"
                ></textarea>
              </div>

              <div className="border-t border-brand-border pt-5">
                <button type="submit" className="btn-primary btn-lg w-full">
                  Confirm Booking
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
