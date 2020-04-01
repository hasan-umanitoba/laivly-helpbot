var ActionSchema = require('../schemas/ActionSchema');

async function findAll() {
    // Find all clients
    return await ActionSchema.find({ isActive: true }).exec();
}

async function findById(id) {
    return await ActionSchema.findById(id).exec();
}

async function create(actions) {
    // Save multiple actions
    return await ActionSchema.create(actions);
}

async function update(data) {
    // Always return the new Model
    return ActionSchema.findOneAndUpdate({ _id: data._id }, data, { new: true }).exec();
}

module.exports = {
    findAll, findById, create, update
}