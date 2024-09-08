import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  chapter: {
    type: String,
    required: true
  },
  datestart: {
    type: Date,  // Changed to Date
    required: true
  },
  dateend: {
    type: Date,  // Changed to Date
    required: true
  },
  person: {
    type: String,
    required: true
  },
  rate: {
    type: Number,  // Changed to Number
    required: true
  },
  useremail: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export default Review;
