// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import axios from "axios";
import config from "./config";

/*
 *  callGet performs a GET request to the path with the given parameters.
 *  path => path of the API endpoint
 *  params => API request needs the parameters
 */
export function callGet(path, params) {
  console.log("Turism path = " + config.tourismAPI.API_BASE_URL + path);

  return axios
    .get(config.tourismAPI.API_BASE_URL + path, {
      params: params
    })
    .then(function(response) {
      return response.data;

    })
    .catch(function(error) {
      console.log(error.response);
      throw error;
    });
}

//fetchWebcams function fetches webcam information from the API
export async function fetchWebcams(source) {
	return callGet("/WebcamInfo", {
            pagesize: 0,
		    source: source != null ? source.toString() : '',
			origin: config.ORIGIN
		})
		.then(response => {
			this.webcams = response.Items;
      console.log('webcams = response' + this.webcams);
		})
		.catch(e => {
			console.log(e)
			throw e;
		});
}

//fetchWeathrtForecast function fetches Weather information from the API
export async function fetchWeatherForecast(source) {
	return callGet("/Weather/Forecast", {
            pagesize: 0,
			origin: config.ORIGIN
		})
		.then(response => {
			this.weather = response;
      console.log('weather = response');
		})
		.catch(e => {
			console.log(e)
			throw e;
		});
}

export async function fetchDistricts(fields) {
    return callGet("/District", {
        origin: config.ORIGIN,
        fields: fields
    })
    .then(response => {
        this.districts = response;
      console.log('district = response');
    })
    .catch(e => {
        console.log(e)
        throw e;
    });
}

//fetchMunicipality function fetches municipality information from the API
export async function fetchMunicipality(fields) {
  return callGet("/Municipality", {
    origin: config.tourismAPI.ORIGIN,
    fields: fields
  })
    .then(response => {
      this.municipalities = response;
      console.log('municipalities = response');
    })
    .catch(e => {
      console.log(e)
      throw e;
    });
}

//fetchInterestingPoints function fetches points of interest information from the API
export async function fetchInterestingPoints(fields) {
  try {
    const response = await callGet("/ODHActivityPoi?tagfilter=poi&active=true", {
      origin: config.tourismAPI.ORIGIN,
      fields: fields
    });
    console.log('interesting = response');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//fetchActivity function fetches activity information from the API
export async function fetchActivities(fields) {
  try {
    const response = await callGet("/ODHActivityPoi?tagfilter=activity&active=true", {
      origin: config.tourismAPI.ORIGIN,
      fields: fields
    });
    console.log('activities = response = ');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//fetchGastronomy function fetches gastronomy information from the API
export async function fetchGastronomy(fields) {
  try {
    const response = await callGet("/ODHActivityPoi?tagfilter=gastronomy&active=true", {
      pagesize: 0,
      origin: config.tourismAPI.ORIGIN,
      fields: fields
    });
    console.log('gastronomy = response = ');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
