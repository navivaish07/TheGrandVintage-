import mongoose from 'mongoose';

const mongoURI = process.env['MONGO_URI'] || 'mongodb://localhost:27017/grand-vintage';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Reservation Schema
const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  message: { type: String },
  table: { type: String },
  reservationType: { type: String, enum: ['room', 'table', 'both'], default: 'room' },
  roomType: { type: String, enum: ['single', 'double'], default: 'single' },
  tableCapacity: { type: String, default: '2 persons' }
});

export const Reservation = mongoose.model('Reservation', reservationSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
});

export const Contact = mongoose.model('Contact', contactSchema);

// Review Schema
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Review = mongoose.model('Review', reviewSchema);

// Menu Item Schema
const menuItemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true } // Image URL or path
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// User Schema for Auth
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

export const User = mongoose.model('User', userSchema);
