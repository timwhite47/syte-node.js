
function setupGithub(url, el) {
  var spinner = new Spinner(spin_opts).spin();
  $('#github-link').append(spinner.el);

  $.get('/github.json', function (github_data) {
    $.get('/templates/github-profile.html', function (github_view) {
      if (github_data.error || github_data.length == 0) {
          window.location = href;
          return;
      }

      var template = Handlebars.compile(github_view);
      console.log(github_data)
      github_data.user.following = numberWithCommas(github_data.user.following)
      github_data.user.followers = numberWithCommas(github_data.user.followers)
      
      $(template(github_data)).modal().on('hidden', function () {
          $(this).remove();
          adjustSelection('home');
      })

      spinner.stop();
    })
  })

  return;
}
