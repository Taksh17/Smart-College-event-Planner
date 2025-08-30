export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const isEventConflict = (
  existingEvents: any[],
  newEvent: { date: string; startTime: string; endTime: string; venue: string }
): boolean => {
  return existingEvents.some(event => {
    if (event.date !== newEvent.date || event.venue !== newEvent.venue) {
      return false;
    }
    
    const newStart = new Date(`${newEvent.date} ${newEvent.startTime}`);
    const newEnd = new Date(`${newEvent.date} ${newEvent.endTime}`);
    const existingStart = new Date(`${event.date} ${event.startTime}`);
    const existingEnd = new Date(`${event.date} ${event.endTime}`);
    
    return (newStart < existingEnd && newEnd > existingStart);
  });
};

export const suggestOptimalTimes = (
  date: string,
  duration: number,
  existingEvents: any[]
): string[] => {
  const suggestions: string[] = [];
  const dayEvents = existingEvents.filter(event => event.date === date);
  
  // Common optimal time slots for college events
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];
  
  timeSlots.forEach(startTime => {
    const start = new Date(`${date} ${startTime}`);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);
    const endTimeString = end.toTimeString().slice(0, 5);
    
    const hasConflict = dayEvents.some(event => {
      const eventStart = new Date(`${event.date} ${event.startTime}`);
      const eventEnd = new Date(`${event.date} ${event.endTime}`);
      return (start < eventEnd && end > eventStart);
    });
    
    if (!hasConflict) {
      suggestions.push(`${formatTime(startTime)} - ${formatTime(endTimeString)}`);
    }
  });
  
  return suggestions.slice(0, 3);
};

export const getTimeUntilEvent = (eventDate: string, eventTime: string): string => {
  const now = new Date();
  const eventDateTime = new Date(`${eventDate} ${eventTime}`);
  const timeDiff = eventDateTime.getTime() - now.getTime();
  
  if (timeDiff < 0) return 'Event has passed';
  
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} away`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} away`;
  return `${minutes} minute${minutes > 1 ? 's' : ''} away`;
};