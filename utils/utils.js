function covertToStarsArray(stars){
  let result = [];

  let score = Math.floor(stars * 2) / 2;

  let hasDecial = score % 1 !== 0;

  let integer = Math.floor(score);

  for (let i = 0; i < integer; i++) {

    result.push('on');

  }

  if (hasDecial) {

    result.push('half');

  }

  while (result.length < 5) {

    result.push('off');

  }

  return result;
};
function http (url,callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'content-type': 'json'
    },
    success: function (res) {
      callBack(res.data)
    },
    fail: function (error) {

    },


  })
}
module.exports = {
  covertToStarsArray: covertToStarsArray,
  http:http
}