/**
 * 
 * @file Utility for sidebar
 * @author Box
 */

/**
 * Determines if we should bother rednering the sidebar
 *
 * @private
 * @param {string} id - file id
 * @param {Boolean|void} [forceFetch] - To void cache
 * @return {Boolean} true if we should fetch or render
 */
var shouldRenderDetailsSidebar = function shouldRenderDetailsSidebar(_ref) {
  var hasProperties = _ref.hasProperties,
      hasNotices = _ref.hasNotices,
      hasAccessStats = _ref.hasAccessStats,
      hasClassification = _ref.hasClassification,
      hasVersions = _ref.hasVersions;
  return !!hasProperties || !!hasAccessStats || !!hasClassification || !!hasVersions || !!hasNotices;
};

/**
 * Determines if we should bother rednering the sidebar
 *
 * @private
 * @param {string} id - file id
 * @param {Boolean|void} [forceFetch] - To void cache
 * @return {Boolean} true if we should fetch or render
 */
var shouldRenderSidebar = function shouldRenderSidebar(props) {
  var hasActivityFeed = props.hasActivityFeed,
      hasSkills = props.hasSkills,
      hasMetadata = props.hasMetadata;

  return !!shouldRenderDetailsSidebar(props) || !!hasActivityFeed || !!hasSkills || !!hasMetadata;
};

export { shouldRenderDetailsSidebar, shouldRenderSidebar };