const TIME_TIPS = {
  morning: [
    '早上好>_<',
    '早安o(^▽^)o',
    '新的一天开始啦',
    '多喝热水哦_(:з」∠)_',
  ],
  rest: ['午休午休-_-'],
  afternoon: ['中午好_(:з」∠)_'],
  evening: ['晚上好(￣▽￣)'],
};
/**
 * @description 初始化日期
 */
function getDate() {
  let todayDate = {};
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let week = date.getDay();
  todayDate.year = `${year}`;
  todayDate.month = month < 10 ? '0' + month : month;
  todayDate.day = day < 10 ? '0' + day : day;
  let vWeek = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ];
  todayDate.week = vWeek[week];
  return todayDate;
}
/**
 * @description 初始化时间
 */
function getNowTime() {
  const { hours, minutes, seconds } = this.getTime();
  return `${hours}:${minutes}:${seconds}`;
}
function getTime() {
  const date = new Date();
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return { hours, minutes, seconds };
}
function getTimeTips() {
  const { hours } = this.getTime();
  const hour = parseInt(hours);
  if (hour >= 6 && hour < 12) {
    return TIME_TIPS.morning[Math.floor(Math.random() * TIME_TIPS.morning.length)];
  } else if (hour >= 12 && hour < 14) {
    return TIME_TIPS.rest[Math.floor(Math.random() * TIME_TIPS.rest.length)];
  } else if (hour >= 14 && hour < 18) {
    return TIME_TIPS.afternoon[
        Math.floor(Math.random() * TIME_TIPS.afternoon.length)
      ];
  } else if (hour >= 18 && hour < 24) {
    return TIME_TIPS.evening[Math.floor(Math.random() * TIME_TIPS.evening.length)];
  }
}
const date = getDate();
const time = getNowTime();
const timeTips = getTimeTips();
const { month, day } = date;
$('.month').text(month);
$('.day').text(day);
$('.time').text(time);
$('.time-tips').text(timeTips);
setInterval(() => {
  const time = getNowTime();
  $('.time').text(time);
}, 1000);
