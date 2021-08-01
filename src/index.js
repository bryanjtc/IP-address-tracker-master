import './style.css';
const api_key = String(process.env.IPIFY_KEY);
const api_uri = "https://geo.ipify.org/api/";
const bypass_cors_url = "https://cors-anywhere.herokuapp.com/";
let current_version = "v1";

const form = document.getElementById("searchinput");
let current_ip = document.getElementById("my_ipAddress");
let current_location = document.getElementById("my_location");
let current_timeZone = document.getElementById("my_timezone");
let current_isp = document.getElementById("my_isp");
var entered_ip = document.getElementById("search");

var blackIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
});

const headers_option = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

const map = L.map("mapid", {
  center: [0, 0],
  zoom: 0,
  layers: [
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }),
  ],
});

updateMarker = (updateMarker = [50.5, 30.5]) => {
  map.setView(updateMarker, 13);
  L.marker(updateMarker, { icon: blackIcon }).addTo(map);
};

getIPDetails = (default_ip) => {
  if (default_ip == undefined) {
    var ip_url = `${bypass_cors_url}${api_uri}${current_version}?apiKey=${api_key}`;
  } else {
    console.log(default_ip);
    var ip_url = `${bypass_cors_url}${api_uri}${current_version}?apiKey=${api_key}&ipAddress=${default_ip}`;
  }

  fetch(ip_url, headers_option)
    .then((results) => results.json())
    .then((data) => {
      current_ip.innerHTML = data.ip;
      current_location.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`;
      current_timeZone.innerHTML = "UTC " + data.location.timezone;
      current_isp.innerHTML = data.isp;

      updateMarker([data.location.lat, data.location.lng]);
    })
    .catch((error) => {
      console.log(error);
    });
};

document.addEventListener("load", updateMarker());

window.onload = () => {
  getIPDetails();
  form.onsubmit = (e) => {
    e.preventDefault();
    console.log(entered_ip.value);
    if (entered_ip.value != "" && entered_ip.value != null) {
      getIPDetails(entered_ip.value);
      return;
    }
    alert("Please enter a valid IP address");
  };
};
