export type Workout = {
  id: string;
  title: string;
  category: 'Yoga' | 'Cardio' | 'Weightlifting' | 'Pilates';
  duration: number; // in minutes
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isPremium: boolean;
  videoUrl: string;
  thumbnailUrl: string;
  thumbnailHint: string;
};

export type Ad = {
  id: string;
  company: string;
  title: string;
  imageUrl: string;
  imageHint: string;
  isActive: boolean;
  expiresAt: string;
};

export type Payment = {
  id: string;
  amount: number;
  status: 'Pending' | 'Paid' | 'Failed';
  date: string;
  user: {
    name: string;
    email: string;
  }
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  subscription: 'Free' | 'Premium';
  createdAt: any; // Firestore Timestamp
};

export type Recipe = {
  id: string;
  title: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  calories: number;
  isPremium: boolean;
  imageUrl: string;
  imageHint: string;
};

export type Article = {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  isPremium: boolean;
  imageUrl: string;
  imageHint: string;
  content: string;
};
