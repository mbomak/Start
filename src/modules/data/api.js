import callApi from 'shared/services/api';

const types = {
  posts: {
    default: window.Config.api.occasionposts,
    massMedia: window.Config.api.mediaPosts,
    SocialMedia: window.Config.api.socMediaPost,
  }
};

export const fetchOccasions = (params, type) => {
  return callApi(
    {
      method: 'GET',
      url: window.Config.api.occasions,
      params,
    },
    true
  );
};

function normalizePosts(data) {
  const { Items: posts, ...occasion } = data;
  const result = {
    occasion,
    posts: {
      byId: {},
      ids: [],
    },
  };

  posts.forEach(post => {
    result.posts.ids.push(String(post.Id));
    result.posts.byId[post.Id] = post;
  });

  result.occasionPosts = result.posts.ids;

  return result;
}

function normalizeOccasionAnalytics(data) {
  const { ...analytics } = data;
  const result = {
    analytics,
  };

  return result;
}

export const fetchPosts = (params, type, summaryOpen) => {

  const urlType = summaryOpen ? 'default' : type;

  return callApi(
    {
      method: 'GET',
      url: types.posts[urlType],
      params,
    },
    normalizePosts
  );
}

export const fetchOccasionAnalytics = (params) => {
  return callApi(
    {
      method: 'GET',
      url: window.Config.api.occasionAnalytics,
      params,
    },
    normalizeOccasionAnalytics,
  );
}

export const fetchOccasionIncidents = (params) => {
  return callApi(
    {
      method: 'GET',
      url: window.Config.api.occasionsIncidents,
      params,
    }
  );
}
