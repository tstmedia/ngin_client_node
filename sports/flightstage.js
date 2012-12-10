
module.exports = init

var Url = require('url')
var _ = require('underscore')
var Model = require('../modelbase')

var config = {}

/**
 * The entry point for the FlightStage api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  _.extend(config, conf)
  return FlightStage
}

/**
 * FlightStage Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var FlightStage = Model.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/flights/'+this.flight_id+'/flight_stages')
  },

  initialize: function(attr, options) {

  },

  validate: function() {
    return ~['pool', 'bracket'].indexOf(this.type) ? false : 'Property "type" has an invalid value'
  }

})
