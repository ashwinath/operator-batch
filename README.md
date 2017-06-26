# Operator Batch Server

[![Build Status](https://travis-ci.org/ashwinath/operator-batch.svg?branch=master)](https://travis-ci.org/ashwinath/operator-batch)
[![codecov](https://codecov.io/gh/ashwinath/operator-batch/branch/master/graph/badge.svg)](https://codecov.io/gh/ashwinath/operator-batch)

This project is part of an overall bigger project called Operator. This is the batch server that downloads information from public apis to cache them in memory (Redis).

Operator aims to be a personal assistant for Singaporeans, helping out with daily life activities like taking public transportation, getting weather information etc.

Other functionalities will be added along the way.

## Documentation
Redis data schema will conform to the contract given in `Contracts/`

### Weather (OpenWeatherMap API)

* Storing of data from OpenWeatherMap will be stored in a Redis instance.
* Job runs every 5 minutes, lower than the api call limit of 60 per minute.
* Contract: `Contracts/WeatherContract.js`.

### Bus Services (LTA DataMall API)

* Work in progress.
