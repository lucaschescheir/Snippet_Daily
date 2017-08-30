const mongoose = require('mongoose');





const snippetSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    notes: String,
    language: {type: String, required: true},
    tags: {type: String }


})

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
