const relationshipsService = require('../services/relationshipsService')

const relationshipsController = {};

relationshipsController.addRelationship = async (req, res, next) => {
    try {
        const {user_id, follow_id}  = req.body;        
        res.locals.addRelationshipSuccess = await relationshipsService.addRelationship(user_id, follow_id);
        return next();
    } catch(err) {
        return next(err)
    }
}

relationshipsController.getRelationships = async (req, res, next) => {
    try {
        const user_id  = req.params.id;
        res.locals.relationships = await relationshipsService.getRelationships(user_id);
        return next();
    } catch(err) {
        return next(err)
    }
}

module.exports = relationshipsController;
