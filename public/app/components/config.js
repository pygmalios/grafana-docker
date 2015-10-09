define([
  'settings',
],
function (Settings) {
  "use strict";

  var bootData = window.grafanaBootData || { settings: {} };
  var options = bootData.settings;

  // Pygmalios custom

  options.window_title_prefix = 'Pygmalios Analytics | '

  return new Settings(options);

});