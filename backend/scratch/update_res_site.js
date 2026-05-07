require('dotenv').config();
const MiniSite = require('../models/MiniSite');

async function updateResSite() {
  try {
    const site = await MiniSite.findOne({ where: { slug: 'res' } });
    if (!site) {
      console.log('Site "res" not found');
      process.exit(1);
    }

    let blocksStr = JSON.stringify(site.blocks);
    
    // Replace broken URLs
    const replacements = [
      { old: 'https://images.unsplash.com/photo-1551632432-c735e840ca0c?q=80&w=800', new: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800' },
      { old: 'https://images.unsplash.com/photo-1550966841-3ee390234720?q=80&w=800', new: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800' },
      { old: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=800', new: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800' },
      { old: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=600', new: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600' },
      { old: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400', new: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=400' },
      { old: 'https://images.unsplash.com/photo-1577214190088-dc4357773e34?q=80&w=400', new: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=400' }
    ];

    replacements.forEach(r => {
      blocksStr = blocksStr.split(r.old).join(r.new);
    });

    site.blocks = JSON.parse(blocksStr);
    await site.save();

    console.log('Site "res" updated successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error updating site:', err);
    process.exit(1);
  }
}

updateResSite();
