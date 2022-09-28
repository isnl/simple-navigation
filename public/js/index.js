$(function () {
  $('.go-search-btn').click(function () {
    const val = $('.search-input').val();
    if (val) {
      window.open(`https://www.baidu.com/s?ie=UTF-8&wd=${val}`);
    }
  });
});
