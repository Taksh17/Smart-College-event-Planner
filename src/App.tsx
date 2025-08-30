import React, { useState } from 'react';
import { Calendar, Users, PlusCircle, Settings, Home, Bell } from 'lucide-react';
import { Event } from './types/Event';
import { mockEvents, mockUser } from './data/mockData';
import EventFeed from './components/EventFeed';
import EventCreationForm from './components/EventCreationForm';
import AdminPanel from './components/AdminPanel';

type ViewType = 'feed' | 'admin' | 'notifications';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('feed');
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [userRegisteredEvents, setUserRegisteredEvents] = useState<string[]>(mockUser.registeredEvents);

  const handleCreateEvent = (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setEvents(prev => [newEvent, ...prev]);
    setShowCreateForm(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setEditingEvent(event);
      setShowCreateForm(true);
    }
  };

  const handleUpdateEvent = (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingEvent) {
      const updatedEvent: Event = {
        ...eventData,
        id: editingEvent.id,
        createdAt: editingEvent.createdAt,
        updatedAt: new Date().toISOString()
      };
      
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? updatedEvent : e));
      setShowCreateForm(false);
      setEditingEvent(null);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  const handleRSVP = (eventId: string) => {
    if (!userRegisteredEvents.includes(eventId)) {
      setUserRegisteredEvents(prev => [...prev, eventId]);
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, currentAttendees: event.currentAttendees + 1 }
          : event
      ));
    }
  };

  const NavButton = ({ id, icon: Icon, label, count }: { id: ViewType; icon: any; label: string; count?: number }) => (
    <button
      onClick={() => setCurrentView(id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        currentView === id
          ? 'bg-blue-600 text-white shadow-md transform scale-105'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      {count !== undefined && (
        <span className={`px-2 py-1 text-xs rounded-full ${
          currentView === id ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'
        }`}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EventFlow</h1>
                <p className="text-xs text-gray-500">Smart College Event Planner</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{mockUser.name}</span>
                <span className="text-xs text-gray-500">({mockUser.role})</span>
              </div>
              
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {events.filter(e => e.status === 'upcoming').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24">
              <nav className="space-y-2">
                <NavButton 
                  id="feed" 
                  icon={Home} 
                  label="Event Feed" 
                  count={events.filter(e => e.status === 'upcoming').length}
                />
                {(mockUser.role === 'organizer' || mockUser.role === 'admin') && (
                  <NavButton 
                    id="admin" 
                    icon={Settings} 
                    label="Admin Panel" 
                  />
                )}
                <NavButton 
                  id="notifications" 
                  icon={Bell} 
                  label="Notifications" 
                  count={userRegisteredEvents.length}
                />
              </nav>
              
              {(mockUser.role === 'organizer' || mockUser.role === 'admin') && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:transform active:scale-95"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Create Event
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {currentView === 'feed' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
                  <p className="text-gray-600">
                    Discover and register for exciting events happening at your college
                  </p>
                </div>
                <EventFeed 
                  events={events} 
                  onRSVP={handleRSVP}
                />
              </div>
            )}

            {currentView === 'admin' && (mockUser.role === 'organizer' || mockUser.role === 'admin') && (
              <AdminPanel
                events={events}
                onCreateEvent={() => setShowCreateForm(true)}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
              />
            )}

            {currentView === 'notifications' && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h2>
                  <p className="text-gray-600">
                    Stay updated with your registered events and reminders
                  </p>
                </div>
                
                <div className="grid gap-4">
                  {userRegisteredEvents.map(eventId => {
                    const event = events.find(e => e.id === eventId);
                    if (!event) return null;
                    
                    return (
                      <div key={eventId} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {new Date(event.date + ' ' + event.startTime).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>📍 {event.venue}</span>
                              <span>👥 {event.currentAttendees} attending</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Registered
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {userRegisteredEvents.length === 0 && (
                    <div className="text-center py-12">
                      <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
                      <p className="text-gray-500">Register for events to receive notifications and reminders</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Creation/Edit Form Modal */}
      {showCreateForm && (
        <EventCreationForm
          onClose={() => {
            setShowCreateForm(false);
            setEditingEvent(null);
          }}
          onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
          existingEvents={events}
          editingEvent={editingEvent || undefined}
        />
      )}
    </div>
  );
}

export default App;