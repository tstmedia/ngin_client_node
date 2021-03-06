"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Roster Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Roster = SportsModel.extend({

    url: function(options){
      var options = options || {}
      var team_id = options.team_id || this.team_id
      var season_id = options.season_id || this.season_id
      var base = config.urls && config.urls.sports || config.url
      base = Url.resolve(base, '/seasons/' + season_id + '/teams/' + team_id + '/rosters' )
      if (!this.id) return base
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id)
    },

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/rosters')
    }

  })

  // wrap the inheirited list function with arg checking
  Roster.list = _.wrap(Roster.list, function(list, options, callback) {
    if (!options.url && !(options.season_id && options.team_id))
      return callback(new Error('season_id and team_id are required'))
    list.call(TeamInstance, options, callback)
  })

  return Roster

}
