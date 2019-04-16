const db = require('../_helpers/db');
const Favorite = db.Favorite;

module.exports = {
    getAll,
    create,
    delete: _delete,
    getAllByUserId,
}

async function getAll() {
    return await Favorite.find();
}

async function create(param) {
    const favorite = new Favorite(param);
    await favorite.save();
    return favorite;
}

async function _delete(id) {
    await Favorite.findOneAndDelete(id);
}

async function getAllByUserId(userid) {
    return await Favorite
        .where('user', userid)
        .populate({ 'path': 'attractions', 'select': 'id' })
}