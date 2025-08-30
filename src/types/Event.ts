export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  startTime: string;
  endTime: string;
  eventType: 'seminar' | 'fest' | 'workshop' | 'sports' | 'cultural' | 'academic' | 'social';
  department: string;
  organizer: string;
  registrationLink: string;
  maxAttendees?: number;
  currentAttendees: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  year: number;
  interests: string[];
  registeredEvents: string[];
  role: 'student' | 'organizer' | 'admin';
}

export interface Reminder {
  id: string;
  eventId: string;
  userId: string;
  type: '1day' | '1hour' | '30min';
  sent: boolean;
  scheduledAt: string;
}