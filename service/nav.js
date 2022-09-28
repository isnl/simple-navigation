import path from 'path';
import moment from 'moment';
const Datastore = require('nedb');
const db = new Datastore({
  filename: path.join(__dirname, '../db/nav.db'),
  autoload: true,
});

/**
 * 获取导航数据
 * @returns
 */
export async function get() {
  return new Promise((resolve, reject) => {
    db.find({})
      .sort({ sort: 1 })
      .exec(function (err, docs) {
        if (err) reject(err);
        docs = docs.map((item) => ({
          ...item,
          time: moment(item.time).format('YYYY-MM-DD HH:mm:ss'),
        }));
        resolve(docs);
      });
  });
}

/**
 * 添加一条导航数据
 * @param {*} data
 * @returns
 */
export function add(data) {
  const doc = {
    ...data,
    time: Date.now(),
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
 * 删除一条导航数据
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
 * 更新一条导航数据
 * @param {*} _id
 * @param {*} params
 * @returns
 */
export function update(_id, params) {
  return new Promise((resolve, reject) => {
    db.update({ _id }, { $set: params }, {}, function (err, numReplaced) {
      if (err) reject(err);
      resolve(true);
    });
  });
}
