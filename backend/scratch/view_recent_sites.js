require('dotenv').config({ path: './backend/.env' });
const { MiniSite } = require('../models');

async function run() {
  try {
    const sites = await MiniSite.findAll({
      order: [['updatedAt', 'DESC']],
      limit: 3
    });
    
    console.log('--- RECENT SITES ---');
    sites.forEach(site => {
      console.log(`ID: ${site.id} | Title: ${site.title} | Template: ${site.templateId} | Updated: ${site.updatedAt}`);
      // If it's a personal trainer site, show blocks
      if (site.templateId === 'personal_trainer' || site.id === 89) {
          console.log(JSON.stringify(site.blocks, null, 2));
      }
    });
    console.log('--- END ---');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
