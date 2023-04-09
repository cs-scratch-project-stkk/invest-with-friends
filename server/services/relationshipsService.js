const db = require('../db/investWithFriendsDb');

const relationshipsService = {};

relationshipsService.addRelationship = async (user_id, follow_id) => {
    const query = ('INSERT INTO relationships (user_id,follow_id) VALUES ($1,$2)');

    const params = [user_id, follow_id];

    const relationship = await db.query(query, params);
    console.log(relationship.rowCount)
    return relationship.rowCount === 1;
}

relationshipsService.getRelationships = async (id) => {
    const query = ('SELECT user_id, follow_id FROM "relationships" WHERE user_id=$1');
    const params = [id];

    const relationships = await db.query(query, params);
    return relationships.rows;
}

module.exports = relationshipsService;
