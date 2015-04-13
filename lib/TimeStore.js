var Reflux = require('reflux');
var TimeActions = require('./TimeActions');
var _ = require('lodash');

var padZero = function (str) {
    return _.padLeft(str, 2, '0')
}

var TimeStore = Reflux.createStore({
    listenables: TimeActions,
    init: function () {
        this._time = '00:00:00';
    },
    onTick: function () {
        var currentTime = new Date();

        // 2.4
        var hours = currentTime.getHours();

        // 1.44
        var minutes = currentTime.getMinutes();

        // 0.864
        var seconds = currentTime.getSeconds();

        // Build output for metric clock
        var daySeconds = 3600 * hours + 60 * minutes + seconds;
        var metricSeconds = daySeconds * 100000 / 86400;
        var metricHours = Math.floor(metricSeconds / 10000);
        metricSeconds = metricSeconds - 10000 * metricHours;
        var metricMinutes = Math.floor(metricSeconds / 100);
        metricSeconds = Math.floor(metricSeconds - 100 * metricMinutes);


        this._time = padZero(metricHours) + ":" + padZero(metricMinutes) + ":" + padZero(metricSeconds);
        this.trigger();
    },

    // Getters
    getDecimalTime: function () {
        return this._time;
    }
});

module.exports = TimeStore;
