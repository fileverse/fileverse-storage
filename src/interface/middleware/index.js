module.exports = {
  validator: require('./validator'),
  canView: require('./canView'),
  canViewAnalytics: require('./canViewAnalytics'),
  canUpload: require('./canUpload'),
  errorHandler: require('./errorHandler'),
  canCheckLimit: require('./canCheckLimit'),
  canUpdateLimit: require('./canUpdateLimit'),
  canCheckLimitUse: require('./canCheckLimitUse'),
  canListTask: require('./canListTask'),
  canCompleteTask: require('./canCompleteTask'),
  isAuthenticated: require('./isAuthenticated'),
  isPublic: require('./isPublic'),
};
