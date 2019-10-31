const request = require("request");

const forecast = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/8703f2ae944f79c49735df8d3f4383f4/${lat},${lng}`;

  request({ url, json: true }, (error, { body }) => {
    const data = body;
    if (error) {
      callback("Unabale to connect to the weather service", undefined);
    } else if (data.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${data.daily.data[0].summary} Temprature is currently ${data.currently.temperature} degress fahrenheit, with ${data.currently.precipProbability}% chance of rain. Today's High will be ${data.daily.data[0].temperatureHigh} with a Low of ${data.daily.data[0].temperatureLow}`
      );
    }
  });
};
module.exports = forecast;
