import { Event, User } from '../types/Event';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'AI & Machine Learning Workshop',
    description: 'Learn the fundamentals of AI and ML with hands-on coding exercises and real-world applications.',
    venue: 'Computer Science Lab - Room 301',
    date: '2025-01-25',
    startTime: '14:00',
    endTime: '17:00',
    eventType: 'workshop',
    department: 'Computer Science',
    organizer: 'Tech Society',
    registrationLink: 'https://forms.google.com/ai-workshop',
    maxAttendees: 50,
    currentAttendees: 32,
    status: 'upcoming',
    tags: ['AI', 'Machine Learning', 'Programming', 'Technology'],
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-18T15:30:00Z'
  },
  {
    id: '2',
    title: 'Annual Cultural Fest 2025',
    description: 'Join us for three days of music, dance, drama, and cultural celebrations. Featuring performances by students and guest artists.',
    venue: 'Main Auditorium & Campus Grounds',
    date: '2025-02-05',
    startTime: '09:00',
    endTime: '22:00',
    eventType: 'cultural',
    department: 'Cultural Committee',
    organizer: 'Student Council',
    registrationLink: 'https://forms.google.com/cultural-fest',
    maxAttendees: 2000,
    currentAttendees: 1245,
    status: 'upcoming',
    tags: ['Music', 'Dance', 'Drama', 'Culture', 'Festival'],
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2025-01-10T08:00:00Z',
    updatedAt: '2025-01-20T12:00:00Z'
  },
  {
    id: '3',
    title: 'Career Guidance Seminar',
    description: 'Industry experts will share insights on career opportunities, resume building, and interview preparation.',
    venue: 'Lecture Hall B',
    date: '2025-01-28',
    startTime: '11:00',
    endTime: '13:00',
    eventType: 'seminar',
    department: 'Placement Cell',
    organizer: 'Career Services',
    registrationLink: 'https://forms.google.com/career-seminar',
    maxAttendees: 200,
    currentAttendees: 87,
    status: 'upcoming',
    tags: ['Career', 'Professional Development', 'Industry Insights'],
    imageUrl: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2025-01-12T14:00:00Z',
    updatedAt: '2025-01-17T09:30:00Z'
  },
  {
    id: '4',
    title: 'Inter-College Basketball Tournament',
    description: 'Compete against teams from across the region in this exciting basketball tournament. Registration deadline: Jan 30th.',
    venue: 'Sports Complex - Basketball Court',
    date: '2025-02-10',
    startTime: '08:00',
    endTime: '18:00',
    eventType: 'sports',
    department: 'Sports Department',
    organizer: 'Athletic Association',
    registrationLink: 'https://forms.google.com/basketball-tournament',
    maxAttendees: 300,
    currentAttendees: 156,
    status: 'upcoming',
    tags: ['Basketball', 'Sports', 'Competition', 'Tournament'],
    imageUrl: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2025-01-08T16:00:00Z',
    updatedAt: '2025-01-19T11:15:00Z'
  }
];

export const mockUser: User = {
  id: 'user1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@college.edu',
  department: 'Computer Science',
  year: 3,
  interests: ['Technology', 'AI', 'Programming', 'Cultural Events'],
  registeredEvents: ['1', '2'],
  role: 'student'
};

export const departments = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Business Administration',
  'Psychology',
  'Biology',
  'Chemistry',
  'Physics',
  'Mathematics',
  'English Literature',
  'History',
  'Economics'
];

export const eventTypes = [
  { value: 'seminar', label: 'Seminar', icon: '🎓' },
  { value: 'workshop', label: 'Workshop', icon: '🔧' },
  { value: 'fest', label: 'Festival', icon: '🎉' },
  { value: 'cultural', label: 'Cultural', icon: '🎭' },
  { value: 'sports', label: 'Sports', icon: '⚽' },
  { value: 'academic', label: 'Academic', icon: '📚' },
  { value: 'social', label: 'Social', icon: '👥' }
];