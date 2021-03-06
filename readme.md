# Leaflet.ZoomPanel

A Zoom Panel Plugin Of Leaflet.

![](https://img.shields.io/npm/l/express.svg)

[DEMO](https://will4906.github.io/leaflet-zoompanel/)

![](./doc/toggle.png)

## Installation

### Install via npm

`npm install leaflet.zoompanel`

### Install Manually

Download L.Control.ZoomPanel.css and L.Control.ZoomPanel.js and include them in your project.

### Include as ES6 Module

```javascript
import "leaflet.zoompanel";
import "leaflet.zoompanel/src/L.Control.ZoomPanel.css";
```

## Development

Install the needed dependencies:

`npm install`

## Getting Started

```javascript
var layer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

// You can add the control via the settings object
var map = L.map("map", {
  layers: [layer]
}).setView([57.7, 11.9], 8);

new L.zoompanel({
  labels: [
    {
      zoom: 2,
      label: "X2"
    },
    {
      zoom: 4,
      label: "X4"
    },
    {
      zoom: 6,
      label: "X6"
    },
    {
      zoom: 8,
      label: "X8"
    },
    {
      zoom: 10,
      label: "X10"
    }
  ]
}).addTo(map);
```
