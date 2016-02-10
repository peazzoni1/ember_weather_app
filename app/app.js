import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    var that = this;
    that.localWeather = " ";
    that.lat = "0";
    that.lon = "0";

    that.getWeather = function(position) {
        that.lat = position.coords.latitude;
        that.lon = position.coords.longitude;
        Ember.$.getJSON('http://api.openweathermap.org/data/2.5/weather', {
          lat: that.lat,
          lon: that.lon,
          units: 'imperial',
          APPID: 'c2845ce628770f05c0ea1650fb1e66fe'}).then(function(data) {
          //that.localWeather = data;
          that.store.push('weather', that.store.normalize(JSON.stringify(data)));
          //that.payload.save();
          console.log(JSON.stringify(data));
        });
      }
    that.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(that.getWeather);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    that.getLocation();
  }
  });

loadInitializers(App, config.modulePrefix);

export default App;
