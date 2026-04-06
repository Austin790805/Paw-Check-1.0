import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Phone, Calendar, Loader2, X, AlertCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAuth } from '../components/AuthProvider';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
};

export default function VetLocator() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [bookingVet, setBookingVet] = useState<any | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingPet, setBookingPet] = useState('');

  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiPlaces, setAiPlaces] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Could not get your location. Using default.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleSearch = async () => {
    setIsSearching(true);
    setAiResponse(null);
    setAiPlaces([]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = searchQuery ? `Find veterinary clinics matching: ${searchQuery}` : "Find good veterinary clinics and animal hospitals nearby.";
      
      const config: any = {
        tools: [{ googleMaps: {} }],
      };

      if (userLocation) {
        config.toolConfig = {
          retrievalConfig: {
            latLng: {
              latitude: userLocation.lat,
              longitude: userLocation.lng
            }
          }
        };
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: config
      });

      setAiResponse(response.text || "No response generated.");
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const places = chunks.map(chunk => chunk.maps).filter(Boolean);
      setAiPlaces(places);
      
    } catch (error) {
      console.error("Error searching vets:", error);
      setAiResponse("Sorry, there was an error searching for vets. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Mock data for vets (in a real app, these would be fetched based on userLocation)
  const vets = [
    {
      id: 1,
      name: 'Paws & Claws Veterinary Clinic',
      doctor: 'Dr. Sarah Jenkins',
      rating: 4.8,
      reviews: 124,
      address: '123 Pet Lane, Cityville, ST 12345',
      distance: '1.2 miles',
      phone: '(555) 123-4567',
      available: true,
      lat: (userLocation?.lat || defaultCenter.lat) + 0.01,
      lng: (userLocation?.lng || defaultCenter.lng) + 0.01,
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      name: 'City Center Animal Hospital',
      doctor: 'Dr. Michael Chen',
      rating: 4.9,
      reviews: 89,
      address: '456 Main St, Cityville, ST 12345',
      distance: '2.5 miles',
      phone: '(555) 987-6543',
      available: false,
      lat: (userLocation?.lat || defaultCenter.lat) - 0.015,
      lng: (userLocation?.lng || defaultCenter.lng) + 0.02,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      name: 'Happy Tails Care Center',
      doctor: 'Dr. Emily Rodriguez',
      rating: 4.7,
      reviews: 210,
      address: '789 Oak Ave, Cityville, ST 12345',
      distance: '3.8 miles',
      phone: '(555) 456-7890',
      available: true,
      lat: (userLocation?.lat || defaultCenter.lat) + 0.02,
      lng: (userLocation?.lng || defaultCenter.lng) - 0.01,
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to book an appointment.");
      return;
    }
    // In a real app, this would save to Supabase
    alert(`Appointment booked with ${bookingVet.name} for ${bookingPet} on ${bookingDate} at ${bookingTime}!`);
    setBookingVet(null);
    setBookingDate('');
    setBookingTime('');
    setBookingPet('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Find a Vet Near You</h1>
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
          Locate trusted veterinary clinics and hospitals in your area.
        </p>
        {locationError && (
          <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">{locationError}</p>
        )}
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-4 border border-slate-300 dark:border-slate-600 rounded-full leading-5 bg-white dark:bg-slate-800 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm shadow-sm"
            placeholder="Search by zip code, city, or clinic name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            className="absolute inset-y-2 right-2 px-4 py-2 bg-rose-500 text-white rounded-full text-sm font-medium hover:bg-rose-600 transition-colors disabled:opacity-70 flex items-center"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vet List */}
        <div className="lg:col-span-2 space-y-6">
          {aiResponse && (
            <div className="bg-rose-50 dark:bg-slate-800 p-6 rounded-2xl border border-rose-100 dark:border-slate-700 mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <Star className="w-5 h-5 text-amber-400 mr-2" /> AI Recommendations
              </h2>
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                <Markdown>{aiResponse}</Markdown>
              </div>
              
              {aiPlaces.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Places Found:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {aiPlaces.map((place, idx) => (
                      <a 
                        key={idx} 
                        href={place.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block p-4 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-rose-300 dark:hover:border-rose-500 transition-colors"
                      >
                        <div className="font-medium text-slate-900 dark:text-white">{place.title}</div>
                        <div className="text-sm text-rose-500 mt-1 flex items-center">
                          View on Google Maps <MapPin className="w-3 h-3 ml-1" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!aiResponse && vets.map((vet) => (
            <div key={vet.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow">
              <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0">
                <img src={vet.image} alt={vet.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{vet.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${vet.available ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'}`}>
                      {vet.available ? 'Available Today' : 'Book for Tomorrow'}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">{vet.doctor}</p>
                  <div className="flex items-center mb-4">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="ml-1 text-sm font-bold text-slate-700 dark:text-slate-300">{vet.rating}</span>
                    <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">({vet.reviews} reviews)</span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-slate-400" />
                      <span>{vet.address} <span className="text-slate-400 ml-1">• {vet.distance}</span></span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-slate-400" />
                      <span>{vet.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={() => setBookingVet(vet)}
                    className="flex-1 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors flex items-center justify-center"
                  >
                    <Calendar className="w-4 h-4 mr-2" /> Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="lg:col-span-1">
          <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-[600px] sticky top-24 flex items-center justify-center border border-slate-300 dark:border-slate-700 overflow-hidden z-0">
            <MapContainer 
              center={[userLocation?.lat || defaultCenter.lat, userLocation?.lng || defaultCenter.lng]} 
              zoom={12} 
              style={{ width: '100%', height: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {userLocation && (
                <Marker position={[userLocation.lat, userLocation.lng]}>
                  <Popup>You are here</Popup>
                </Marker>
              )}
              {vets.map(vet => (
                <Marker key={vet.id} position={[vet.lat, vet.lng]}>
                  <Popup>
                    <strong>{vet.name}</strong><br/>
                    {vet.doctor}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingVet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setBookingVet(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Book Appointment</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">with {bookingVet.doctor} at {bookingVet.name}</p>
            
            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pet Name</label>
                <input 
                  type="text" 
                  required
                  value={bookingPet}
                  onChange={(e) => setBookingPet(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="e.g., Max"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                  <input 
                    type="date" 
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Time</label>
                  <input 
                    type="time" 
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-rose-500 text-white rounded-lg px-4 py-3 font-medium hover:bg-rose-600 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
