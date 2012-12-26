config = {};
config.analytics = {};
config.seo = {};
config.integrations = {};

// Basic Info
config.email = "tim@tenacioustimi.com";
config.name =  "Tim White";

// Frontend Sidebar
config.sidebarBlurb = "This is your syte!";
config.syteTitle = 'Welcome to my Syte!';
config.hostName = "tenacioustimi.com";

// RSS
config.rss = {
  enabled: false,
  feedUrl: "RSS_FEED_URL"
};


//// Integrations

// Twitter
config.integrations.twitter = {
  enabled: true,
  username: "tenacioustimi",
  oauth: {
    consumer_key: 'HDEJiTYhOkNjC1S7JFE2g',
    consumer_secret: 'R7Vf9gFgisyTjnsfIygflPPJEk8HcNFjJqFUE24BLs',
    access_token_key: '17106780-iPiFkGkgbV3vqvZkTo1b2mzsxEIjvnNPvyfL6uBDk',
    access_token_secret: 'cOnO72ArXnrobVtYplndvzllkMlcA6h89a38BQTA'
  }
};

// Disqus - TODO
config.integrations.disqus = {
  enabled: false,
  shortName: "DISQUS_SHORTNAME"
};

// Tumblr
config.integrations.tumblr = {
  enabled: true,
  username: 'tenacioustimi',
  blogUrl: 'tenacioustimi.tumblr.com',
  oauthCusumerKey: "CJ9gY3DKKAV0xmSxnBZPzKrUygY1ESecxsU7uuGNKBsZpZ26Ya"
};

// Github
config.integrations.github = {
  enabled: true,
  username: 'timwhite47'
}

// Instagram - TODO
config.integrations.instagram = {
  enabled: true,
  username: 'tenacioustimi',
  uid: '27657730',
  client_id: "b67a71a81a754cc29aeb5ee716105b50", 
  client_secret: "05713e446cd44c97a9467cfbb2757c28"
}

// Foursquare
config.integrations.foursquare = {
  enabled: true,
  username: "tenacioustimi",
  uid: '8760932',
  client_id: "X0JLKJTNGHEN4BVFDOYPBQEJMQYVWZPCSBJSZJ3ZE14IAVLO", 
  client_secret: "EPPIR0ITAHPZUDCRFFCDEK1XAVNEUQW1LJ0ZBH5BMAHIDRR5"
};

// Last FM - TODO
config.integrations.last_fm = {
  enabled: false,
  username: 'last_fm_username'
};

// Tent.io
config.integrations.tentio = {
  enabled: false, 
  entity_uri: "TENT_ENTITY_URI", 
  feed_url: "TENT_FEED_URL"
};

config.integrations.dribble = {
  username: 'username',
  enabled: false
};
config.integrations.soundcloud = {
  username: 'username',
  enabled: false
}
config.integrations.bitbucket = {
  username: 'username',
  enabled: false
}

//// Analtytics

config.analytics.woopra = {
  enabled: false, 
  trackingDomain: "WOOPRA_TRACKING_DOMAIN",
  idleTimeout: 30,
  includeQuery: false
}

config.analytics.googleAnalytics = {
  enabled: false,
  trackingId: "GOOGLE_ANALYTICS_TRACKING_ID" 
}

config.seo.description =  "Tim White's place on the interwebs";
config.seo.keywords = ['Tim', 'White', 'Bellingham', 'WA', 'Web Development', 'programming', 'ruby', 'node.js', 'hacker'].join();

exports.config = config;