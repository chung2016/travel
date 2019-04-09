const db = require('../_helpers/db');
const Comment = db.Comment;

module.exports = {
    getAll,
    create,
    update,
    delete: _delete,
}

async function getAll() {
    return await Comment.find();
}

async function create(param) {
    const comment = new Comment(param);
    await comment.save();
    return comment;
}

async function update(id, param) {
	const comment = await Comment.findById(id);
	if (!comment) throw 'Comment not found';
	Object.assign(comment, param);
	await comment.save();
	return comment;
}

async function _delete(id) {
    await Comment.findOneAndDelete(id);
}
