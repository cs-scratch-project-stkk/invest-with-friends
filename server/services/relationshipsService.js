const db = require('../db/investWithFriendsDb');

const relationshipsService = {};

relationshipsService.addRelationship = async (user_id, follow_id) => {
    const query = ('INSERT INTO relationships (user_id,follow_id) VALUES ($1,$2)');

    const params = [user_id, follow_id];

    const relationship = await db.query(query, params);
    return relationship.rowCount === 1;
}

relationshipsService.getRelationships = async (id) => {
    const query = ('SELECT u.user_id, u.first_name, u.last_name, u.email FROM relationships r LEFT JOIN users u ON r.follow_id=u.user_id WHERE r.user_id=$1');
    const params = [id];

    const relationships = await db.query(query, params);
    return relationships.rows;
}

module.exports = relationshipsService;
