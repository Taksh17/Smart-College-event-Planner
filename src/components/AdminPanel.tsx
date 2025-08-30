import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  TrendingUp, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye,
  Bell,
  Mail,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { Event } from '../types/Event';
import { mockUser } from '../data/mockData';
import EventCard from './EventCard';

interface AdminPanelProps {
  events: Event[];
  onCreateEvent: () => void;
  onEditEvent: (eventId: string) => void;
  onDeleteEvent: (eventId: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  events,
  onCreateEvent,
  onEditEvent,
  onDeleteEvent
}) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'events' | 'analytics' | 'notifications'>('overview');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Calculate statistics
  const stats = {
    totalEvents: events.length,
    upcomingEvents: events.filter(e => e.status === 'upcoming').length,
    totalAttendees: events.reduce((sum, e) => sum + e.currentAttendees, 0),
    averageAttendance: events.length > 0 ? Math.round(events.reduce((sum, e) => sum + e.currentAttendees, 0) / events.length) : 0,
    completedEvents: events.filter(e => e.status === 'completed').length,
    cancelledEvents: events.filter(e => e.status === 'cancelled').length
  };

  const eventsByType = events.reduce((acc, event) => {
    acc[event.eventType] = (acc[event.eventType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const eventsByDepartment = events.reduce((acc, event) => {
    acc[event.department] = (acc[event.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentEvents = events
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const StatCard = ({ title, value, icon: Icon, color, change }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 inline mr-1" />
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
      onClick={() => setSelectedTab(id as any)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        selectedTab === id
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {mockUser.name}</p>
        </div>
        <button
          onClick={onCreateEvent}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg active:transform active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-white rounded-xl shadow-sm border border-gray-100 p-2">
        <TabButton id="overview" label="Overview" icon={BarChart3} />
        <TabButton id="events" label="Manage Events" icon={Calendar} />
        <TabButton id="analytics" label="Analytics" icon={TrendingUp} />
        <TabButton id="notifications" label="Notifications" icon={Bell} />
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Events"
              value={stats.totalEvents}
              icon={Calendar}
              color="bg-blue-500"
              change={12}
            />
            <StatCard
              title="Upcoming Events"
              value={stats.upcomingEvents}
              icon={Clock}
              color="bg-green-500"
              change={8}
            />
            <StatCard
              title="Total Attendees"
              value={stats.totalAttendees.toLocaleString()}
              icon={Users}
              color="bg-purple-500"
              change={25}
            />
            <StatCard
              title="Avg. Attendance"
              value={stats.averageAttendance}
              icon={TrendingUp}
              color="bg-orange-500"
              change={-3}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Events by Type */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Events by Type</h3>
              <div className="space-y-3">
                {Object.entries(eventsByType).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{type}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(count / stats.totalEvents) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h3>
              <div className="space-y-3">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      event.status === 'upcoming' ? 'bg-green-500' :
                      event.status === 'completed' ? 'bg-blue-500' :
                      event.status === 'cancelled' ? 'bg-red-500' : 'bg-gray-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.department}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(event.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'events' && (
        <div className="space-y-6">
          {/* Events Management Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Manage Events</h2>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Events</option>
                <option>Upcoming</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          {/* Events List */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                showAdminActions={true}
                onEdit={onEditEvent}
                onDelete={onDeleteEvent}
              />
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Success Rate</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {Math.round((stats.completedEvents / stats.totalEvents) * 100)}%
                </div>
                <p className="text-gray-600">of events completed successfully</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Departments</h3>
              <div className="space-y-2">
                {Object.entries(eventsByDepartment)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([dept, count]) => (
                    <div key={dept} className="flex justify-between">
                      <span className="text-sm text-gray-600 truncate">{dept}</span>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats.averageAttendance}
                </div>
                <p className="text-gray-600">average attendees per event</p>
              </div>
            </div>
          </div>

          {/* Detailed Analytics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Event</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Attendees</th>
                    <th className="text-left py-3 px-4">Capacity</th>
                    <th className="text-left py-3 px-4">Fill Rate</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {events.slice(0, 10).map((event) => (
                    <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{event.title}</td>
                      <td className="py-3 px-4 capitalize">{event.eventType}</td>
                      <td className="py-3 px-4">{event.currentAttendees}</td>
                      <td className="py-3 px-4">{event.maxAttendees || 'Unlimited'}</td>
                      <td className="py-3 px-4">
                        {event.maxAttendees 
                          ? `${Math.round((event.currentAttendees / event.maxAttendees) * 100)}%`
                          : 'N/A'
                        }
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          event.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                          event.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                          event.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'notifications' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Notification Center</h2>
          
          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reminder Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">Email Reminders</p>
                    <p className="text-sm text-gray-600">Send email reminders to registered users</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-600">Send push notifications for new events</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Queue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Notifications</h3>
            <div className="space-y-3">
              {events.filter(e => e.status === 'upcoming').slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-600">
                        Reminder scheduled for {new Date(event.date + ' ' + event.startTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;