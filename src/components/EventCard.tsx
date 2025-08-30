import React from 'react';
import { Calendar, Clock, MapPin, Users, Tag, ExternalLink } from 'lucide-react';
import { Event } from '../types/Event';
import { formatDate, formatTime, getTimeUntilEvent } from '../utils/dateUtils';

interface EventCardProps {
  event: Event;
  onRSVP?: (eventId: string) => void;
  isRegistered?: boolean;
  showAdminActions?: boolean;
  onEdit?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onRSVP,
  isRegistered = false,
  showAdminActions = false,
  onEdit,
  onDelete
}) => {
  const getEventTypeColor = (type: string) => {
    const colors = {
      seminar: 'bg-blue-100 text-blue-800',
      workshop: 'bg-green-100 text-green-800',
      fest: 'bg-purple-100 text-purple-800',
      cultural: 'bg-pink-100 text-pink-800',
      sports: 'bg-orange-100 text-orange-800',
      academic: 'bg-indigo-100 text-indigo-800',
      social: 'bg-yellow-100 text-yellow-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      upcoming: 'bg-blue-500',
      ongoing: 'bg-green-500',
      completed: 'bg-gray-500',
      cancelled: 'bg-red-500'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const addToGoogleCalendar = () => {
    const startDateTime = new Date(`${event.date} ${event.startTime}`).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDateTime = new Date(`${event.date} ${event.endTime}`).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.venue)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {event.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.eventType)}`}>
              {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)}`}></div>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{event.title}</h3>
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-lg ml-2 whitespace-nowrap">
            {getTimeUntilEvent(event.date, event.startTime)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Clock className="w-4 h-4 mr-2 text-green-500" />
            {formatTime(event.startTime)} - {formatTime(event.endTime)}
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-red-500" />
            {event.venue}
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Users className="w-4 h-4 mr-2 text-purple-500" />
            {event.currentAttendees}/{event.maxAttendees || 'Unlimited'} attendees
          </div>
        </div>
        
        {event.tags.length > 0 && (
          <div className="flex items-center mb-4">
            <Tag className="w-4 h-4 mr-2 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {event.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
              {event.tags.length > 3 && (
                <span className="text-xs text-gray-500">+{event.tags.length - 3} more</span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-2">
          {onRSVP && (
            <button
              onClick={() => onRSVP(event.id)}
              disabled={isRegistered || event.status !== 'upcoming'}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isRegistered 
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : event.status === 'upcoming'
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:transform active:scale-95'
                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isRegistered ? 'Registered ✓' : 'RSVP'}
            </button>
          )}
          
          <button
            onClick={addToGoogleCalendar}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Add to Calendar
          </button>
          
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Register
          </a>
        </div>
        
        {showAdminActions && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={() => onEdit?.(event.id)}
              className="flex-1 px-3 py-2 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(event.id)}
              className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;