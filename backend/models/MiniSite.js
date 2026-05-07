const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MiniSite = sequelize.define('MiniSite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    set(value) {
      this.setDataValue('title', value ? value.trim() : value);
    }
  },
  slug: {
    type: DataTypes.STRING(255),
    unique: 'mini_sites_slug_unique',
    set(value) {
      this.setDataValue('slug', value ? value.toLowerCase().trim() : value);
    }
  },
  templateId: {
    type: DataTypes.STRING(50),
    defaultValue: 'blank',
    validate: {
      isIn: [[
        'blank', 'linktree', 'digital_card', 'restaurant', 'event', 'portfolio',
        'e_commerce', 'pdf_lead', 'coupon_page', 'travel_itinerary',
        'simple_download', 'podcast_launch', 'digital_rsvp', 'real_estate',
        'course_registration', 'faq_support', 'personal_trainer'
      ]]
    }
  },
  theme: {
    type: DataTypes.JSON,
    defaultValue: {
      primaryColor: '#6366f1',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter',
      backgroundType: 'solid',
      backgroundImage: ''
    }
  },
  blocks: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  settings: {
    type: DataTypes.JSON,
    defaultValue: {
      favicon: '',
      metaTitle: '',
      metaDescription: '',
      customDomain: '',
      isPublished: false,
      passwordProtected: false,
      password: '',
      analytics: {
        views: 0,
        uniqueViews: 0
      }
    }
  },
  qrCode: {
    type: DataTypes.JSON,
    defaultValue: {
      generated: false,
      imageUrl: '',
      color: '#000000',
      bgColor: '#ffffff',
      logo: ''
    }
  }
}, {
  tableName: 'mini_sites',
  timestamps: true
});

module.exports = MiniSite;
