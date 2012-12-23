config = {};
config.analytics = {};
config.seo = {};
config.integrations = {};

// Basic Info
config.email = "your_email@somewhere.com";
config.name =  "John Doe";

// Frontend Sidebar
config.sidebarBlurb = "This is your syte!";
config.syteTitle = 'Syte for Node JS';
config.hostName = "your-domain-name.com";

// RSS
config.rss = {
  enabled: false,
  feedUrl: "RSS_FEED_URL"
};


//// Integrations

// Twitter
config.integrations.twitter = {
  enabled: true,
  username: "twitter_handle",
  oauth: {
    consumer_key: 'consumer_key',
    consumer_secret: 'consumer_secret',
    access_token_key: 'access_token_key',
    access_token_secret: 'access_token_secret'
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
  username: 'tumblr_username',
  blogUrl: 'blog.tumblr.com',
  oauthCusumerKey: "oauth_key"
};

// Github
config.integrations.github = {
  enabled: true,
  username: 'github_username'
}

// Instagram - TODO
config.integrations.instagram = {
  enabled: false,
  username: 'instagram_username'
}

// Foursquare - TODO
config.integrations.foursquare = {
  enabled: true,
  username: "foursquare_handle",
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

config.seo.description =  "This is a syte site in Node.js";
config.seo.keywords = ['these', 'are', 'your', 'keywords'].join();

exports.config = config;