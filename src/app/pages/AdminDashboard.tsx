import { useEffect, useState } from 'react';
import { Shield, RefreshCw, Check, Clock, Edit2, Save, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BookingRecord } from '../types/booking';
import { mapBookingRowToRecord } from '../lib/booking';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<BookingRecord>>({});

  const ADMIN_PASSWORD = 'bbg2026'; // Simple password - replace with proper auth in production

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('sbp-admin-auth', 'true');
      fetchBookings();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchBookings = async () => {
    if (!supabase) return;
    setLoading(true);
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
    } else if (data) {
      setBookings(data.map(mapBookingRowToRecord));
    }
    setLoading(false);
  };

  const toggleStatus = async (booking: BookingRecord) => {
    if (!supabase) return;

    const newStatus = booking.status === 'Confirmed' ? 'Pending Verification' : 'Confirmed';
    
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', booking.id);

    if (error) {
      alert('Failed to update status');
      console.error(error);
    } else {
      fetchBookings();
    }
  };

  const startEdit = (booking: BookingRecord) => {
    setEditingId(booking.id);
    setEditForm({
      clinic: booking.clinic,
      surgeryDate: booking.surgeryDate,
      services: booking.services,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (bookingId: string) => {
    if (!supabase) return;

    const updateData: any = {
      clinic: editForm.clinic,
      surgery_date: editForm.surgeryDate,
      services: editForm.services,
    };

    const { error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', bookingId);

    if (error) {
      alert('Failed to update booking');
      console.error(error);
    } else {
      setEditingId(null);
      setEditForm({});
      fetchBookings();
    }
  };

  const updateDriverInfo = (driverName: string, carPlate: string, pickupTime: string, terminal: string) => {
    setEditForm({
      ...editForm,
      services: {
        ...editForm.services!,
        airportPickup: {
          status: 'Driver Assigned',
          driverName,
          carPlate,
          pickupTime,
          terminal,
        },
      },
    });
  };

  useEffect(() => {
    const authStored = localStorage.getItem('sbp-admin-auth');
    if (authStored === 'true') {
      setIsAuthenticated(true);
      fetchBookings();
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0A2540] to-[#0056D2] rounded-full mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Enter password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent outline-none"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0A2540] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#0056D2] transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage all bookings</p>
          </div>
          <button
            onClick={fetchBookings}
            disabled={loading}
            className="flex items-center gap-2 bg-[#0056D2] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0046B0] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Booking Ref</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Tier</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Clinic</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Surgery Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{booking.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.email}</td>
                    <td className="px-6 py-4 text-sm font-mono font-semibold text-gray-900">{booking.bookingRef}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.tier === 'VIP' ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black' :
                        booking.tier === 'Safety' ? 'bg-[#0056D2] text-white' :
                        'bg-[#0A2540] text-white'
                      }`}>
                        {booking.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(booking)}
                        className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                          booking.status === 'Confirmed'
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                        }`}
                      >
                        {booking.status === 'Confirmed' ? (
                          <><Check className="w-3 h-3" /> Confirmed</>
                        ) : (
                          <><Clock className="w-3 h-3" /> Pending</>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {editingId === booking.id ? (
                        <input
                          type="text"
                          value={editForm.clinic || ''}
                          onChange={(e) => setEditForm({ ...editForm, clinic: e.target.value })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#0056D2]"
                        />
                      ) : (
                        booking.clinic
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {editingId === booking.id ? (
                        <input
                          type="date"
                          value={editForm.surgeryDate || ''}
                          onChange={(e) => setEditForm({ ...editForm, surgeryDate: e.target.value })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#0056D2]"
                        />
                      ) : (
                        new Date(booking.surgeryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === booking.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => saveEdit(booking.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(booking)}
                          className="text-[#0056D2] hover:text-[#0046B0]"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {bookings.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500">No bookings found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
