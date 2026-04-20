const slugify = require('slugify');
const MiniSite = require('../models/MiniSite');

const generateUniqueSlug = async (title) => {
  let slug = slugify(title, { lower: true, strict: true, locale: 'tr' });

  if (!slug) {
    slug = 'site-' + Date.now().toString(36);
  }

  let existingSite = await MiniSite.findOne({ slug });
  let counter = 1;
  const baseSlug = slug;

  while (existingSite) {
    slug = `${baseSlug}-${counter}`;
    existingSite = await MiniSite.findOne({ slug });
    counter++;
  }

  return slug;
};

module.exports = { generateUniqueSlug };
