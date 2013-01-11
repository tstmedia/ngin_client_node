var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Standings Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Standings = SportsModel.extend({

    urlRoot: function(options) {
      options = options || {}
      var route = ''
      if (options.subseason_id || this.subseason_id) {
        var subseasonID = options.subseason_id || this.subseason_id
        delete options.subseason_id
        route = 'subseasons/' + subseasonID
      } else if (options.pool_id || this.pool_id) {
        var poolID = options.pool_id || this.pool_id
        delete options.pool_id
        route = 'pools/' + poolID
      }

      var scope = ''
      if (options.team_id || this.team_id) {
        var teamID = options.team_id || this.team_id
        scope = '/teams/' + teamID
        delete options.team_id
      } else if (options.division_id || this.division_id) {
        var divisionID = options.division_id || this.division_id
        scope = '/divisions/' + divisionID
        delete options.division_id
      }

      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, route + scope + '/standings')
    }

  },{
    parseList: function(data, resp) {
      if (data.result) data = data.result
      return [data]
    }
  })

  // wrap the inheirited list function with arg checking
  Standings.list = _.wrap(Standings.list, function(list, options, callback) {
    if (!options.subseason_id && !options.pool_id) return callback(new Error('subseason_id or pool_id required'))
    list.call(Standings, options, callback)
  })

  return Standings

}