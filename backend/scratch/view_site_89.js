require('dotenv').config({ path: './backend/.env' });
const { MiniSite } = require('../models');

async function run() {
  try {
    const site = await MiniSite.findByPk(89);
    if (!site) {
      console.log('Site 89 not found');
      return;
    }
    console.log('--- SITE 89 DATA ---');
    console.log(JSON.stringify({
      theme: site.theme,
      blocks: site.blocks
    }, null, 2));
    console.log('--- END DATA ---');
  } catch (e) {
    console.error(e);
  }
}

run();
