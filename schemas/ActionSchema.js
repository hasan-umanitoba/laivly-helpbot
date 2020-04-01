var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var ActionSchema = new Schema(
    {
        actionType: {
            type: String,
            required: true
        },
        actionMessage: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    },
    {
        collection: 'actions'
    }
);

module.exports = mongoose.model('Action', ActionSchema);