const User = require('./User');
const MiniSite = require('./MiniSite');

// İlişkiler
User.hasMany(MiniSite, { foreignKey: 'userId', as: 'sites', onDelete: 'CASCADE' });
MiniSite.belongsTo(User, { foreignKey: 'userId', as: 'owner' });

module.exports = { User, MiniSite };
