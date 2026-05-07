const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { MiniSite } = require('../models');
const { testConnection } = require('../config/database');

async function viewSite(siteId) {
  try {
    await testConnection();
    const site = await MiniSite.findByPk(siteId);

    if (!site) {
      console.log('Site not found');
      process.exit(1);
    }

    const data = {
      name: site.title,
      theme: site.theme,
      blocks: site.blocks
    };

    console.log(JSON.stringify(data, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

const id = process.argv[2];
if (!id) {
  console.log('Please provide a site ID');
  process.exit(1);
}

viewSite(id);
