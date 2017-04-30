var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var theasureUrl = 'https://xn--pck6bvfc.gamewith.jp/article/show/2023/';

superagent.get(theasureUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    var charactorList = [];
    var $ = cheerio.load(res.text);
    $('#tr').attr('data-col2').each(function (idx, element) {
      var $element = $(element);
      //var href = url.resolve(theasureUrl, $element.attr('href'));
      if(charactorList.length<5){charactorList.push(href);}
    });

    var ep = new eventproxy();

    ep.after('topic_html', topicUrls.length, function (topics) {
      topics = topics.map(function (topicPair) {
        var topicUrl = topicPair[0];
        var topicHtml = topicPair[1];	
        var $ = cheerio.load(topicHtml);
        return ({
          title: $('.topic_full_title').text().trim(),
          href: topicUrl,
          comment1: $('.reply_content').eq(0).text().trim(),
        });
      });

      console.log('final:');										
      console.log(topics);
    });
  });
