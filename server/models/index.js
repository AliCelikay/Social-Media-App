const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');
const Likes = require('./Likes');
const Relationships = require('./Relationships')
const Stories = require('./Stories')

Posts.belongsTo(User,{
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Posts.hasMany(Comments,{
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Posts.hasMany(Likes,{
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Comments.belongsTo(User,{
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});




