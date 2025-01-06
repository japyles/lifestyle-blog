import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  location: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    required: [true, 'Image URL is required']
  },
  thumbnail: {
    type: String
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  metadata: {
    width: Number,
    height: Number,
    format: String,
    size: Number
  }
}, {
  timestamps: true
})

export default mongoose.models.Image || mongoose.model('Image', imageSchema)

