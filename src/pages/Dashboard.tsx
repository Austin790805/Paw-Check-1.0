import { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { Navigate } from 'react-router-dom';
import { Plus, Calendar, Settings, Edit2 } from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [pets, setPets] = useState([
    { id: 1, name: 'Max', type: 'Dog', breed: 'Golden Retriever', age: 3, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }
  ]);
  const [appointments, setAppointments] = useState([
    { id: 1, vet: 'Dr. Sarah Jenkins', clinic: 'Paws & Claws Veterinary Clinic', date: 'Oct 24, 2023', time: '10:00 AM', pet: 'Max', status: 'Upcoming' }
  ]);

  if (loading) return <div className="p-12 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Welcome back!</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your pets and appointments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pets Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Pets</h2>
            <button className="flex items-center text-sm font-medium text-rose-500 hover:text-rose-600 dark:hover:text-rose-400">
              <Plus className="w-4 h-4 mr-1" /> Add Pet
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pets.map(pet => (
              <div key={pet.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex items-center space-x-4">
                <img src={pet.image} alt={pet.name} className="w-20 h-20 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{pet.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{pet.breed} • {pet.age} yrs</p>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <Edit2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            
            <button className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-rose-500 transition-colors h-full min-h-[140px]">
              <Plus className="w-8 h-8 mb-2" />
              <span className="font-medium">Add New Pet</span>
            </button>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Upcoming Appointments</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            {appointments.length > 0 ? (
              <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                {appointments.map(apt => (
                  <li key={apt.id} className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900 dark:text-white">{apt.clinic}</h4>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs font-medium rounded-full">
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{apt.vet}</p>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {apt.date} at {apt.time}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">For: {apt.pet}</span>
                      <button className="text-sm text-rose-500 hover:text-rose-600 font-medium">Reschedule</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-slate-500">
                No upcoming appointments.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
