const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'hero', 'image', 'button', 'link_list', 'social_icons', 'text',
      'numbered_list', 'image_gallery', 'video', 'profile', 'countdown',
      'coupon', 'contact_form', 'map', 'divider', 'product_card',
      'faq', 'menu', 'vcard', 'spotify_embed', 'cover', 'timeline', 'checklist', 'spotify'
    ]
  },
  order: {
    type: Number,
    required: true
  },
  visible: {
    type: Boolean,
    default: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { _id: false });

const miniSiteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  templateId: {
    type: String,
    enum: [
      'blank', 'linktree', 'digital_card', 'restaurant', 'event', 'portfolio', 
      'e_commerce', 'pdf_lead', 'coupon_page', 'travel_itinerary', 
      'simple_download', 'podcast_launch', 'digital_rsvp', 'real_estate', 
      'course_registration', 'faq_support', 'personal_trainer'
    ],
    default: 'blank'
  },
  theme: {
    primaryColor: { type: String, default: '#6366f1' },
    backgroundColor: { type: String, default: '#ffffff' },
    fontFamily: { type: String, default: 'Inter' },
    backgroundType: { type: String, enum: ['solid', 'gradient', 'image'], default: 'solid' },
    backgroundImage: { type: String, default: '' }
  },
  blocks: [blockSchema],
  settings: {
    favicon: { type: String, default: '' },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    customDomain: { type: String, default: '' },
    isPublished: { type: Boolean, default: false },
    passwordProtected: { type: Boolean, default: false },
    password: { type: String, default: '' },
    analytics: {
      views: { type: Number, default: 0 },
      uniqueViews: { type: Number, default: 0 }
    }
  },
  qrCode: {
    generated: { type: Boolean, default: false },
    imageUrl: { type: String, default: '' },
    color: { type: String, default: '#000000' },
    bgColor: { type: String, default: '#ffffff' },
    logo: { type: String, default: '' }
  }
}, { timestamps: true });

miniSiteSchema.index({ userId: 1 });
miniSiteSchema.index({ slug: 1 }, { unique: true });

module.exports = mongoose.model('MiniSite', miniSiteSchema);
