import path from 'path';
const Datastore = require('nedb');
const db = new Datastore({
  filename: path.join(__dirname, '../db/type.db'),
  autoload: true,
});
/**
 * 获取分类列表
 * @returns
 */
export function get() {
  return new Promise((resolve, reject) => {
    db.find({})
      .sort({ sort: 1 })
      .exec(function (err, docs) {
        if (err) reject(err);
        resolve(docs);
      });
  });
}
/**
 * 添加分类
 * @param {*} params
 * @returns
 */
export function add(params) {
  const doc = {
    ...params,
    sort: 9999,
  };
  return new Promise((resolve, reject) => {
    db.insert(doc, function (err, newDoc) {
      if (err) reject(err);
      resolve(newDoc);
    });
  });
}
/**
 * 删除分类
 * @param {*} _id
 * @returns
 */
export function remove(_id) {
  return new Promise((resolve, reject) => {
    db.remove({ _id }, {}, function (err, numRemoved) {
      if (err) reject(err);
      resolve(numRemoved);
    });
  });
}
/**
 * 更新分类
 * @param {*} _id
 * @param {*} params
 * @returns
 */
export function update(_id, params) {
  return new Promise((resolve, reject) => {
    db.update({ _id }, { $set: params }, {}, function (err, numReplaced) {
      if (err) reject();
      resolve(true);
    });
  });
}
