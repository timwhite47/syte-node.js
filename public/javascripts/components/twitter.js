
function setupTwitter(url, el) {
  console.log(url, el)
  var href = el.href;

  if ($('#twitter-profile').length > 0) {
    window.location = href;
    return;
  }

  var params = url.attr('path').split('/').filter(function(w) {
      if (w.length)
          return true;
      return false;
  })

  if (params.length == 1) {
     var username = params[0];

     var spinner = new Spinner(spin_opts).spin();
     $('#twitter-link').append(spinner.el);
     $.get('/tweets.json', function (td) {
      twitter_data = td.data
       $.get('/templates/twitter-view.html', function (hbs) {
        console.log(twitter_data);
         if (twitter_data.error || twitter_data.length == 0) {
             window.location = href;
             return;
         }

         var template = Handlebars.compile(hbs);

         var tweets = [];
         $.each(twitter_data, function(i, t) {
           t.formated_date = moment(t.created_at).fromNow();
           // t.f_text = twitterLinkify(t.text);
           tweets.push(t);
         });

         var user = twitter_data[0].user;
         user.statuses_count = numberWithCommas(user.statuses_count);
         user.friends_count = numberWithCommas(user.friends_count);
         user.followers_count = numberWithCommas(user.followers_count);

         var template_data = {
             "user": user,
             "tweets": tweets
         }

         $(template(template_data)).modal().on('hidden', function () {
             $(this).hide();
             adjustSelection('home');
         })

         spinner.stop();
       })
     })

     return;
  }

  window.location = href;
}

function twitterLinkify(text) {
  text = text.replace(/(https?:\/\/\S+)/gi, function (s) {
    return '<a href="' + s + '">' + s + '</a>';
  });

  text = text.replace(/(^|) @(\w+)/gi, function (s) {
    return '<a href="http://twitter.com/' + s + '">' + s + '</a>';
  });

  text = text.replace(/(^|) #(\w+)/gi, function (s) {
    return '<a href="http://search.twitter.com/search?q=' + s.replace(/#/,'%23') + '">' + s + '</a>';
  });

  return text;
}

