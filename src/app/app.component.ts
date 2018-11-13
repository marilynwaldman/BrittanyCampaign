import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
declare var google;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  lat = 48.471589;
  lng = -3.077999;
  zoom = 7;
  markers = [];
  filteredMarkers = [];

  constructor(
    private mapsAPILoader: MapsAPILoader
  ) { }

  getLocations(): Array<{ latitude: number, longitude: number, label: String, draggable: boolean }> {


    let newVar = [
      {
        'latitude': 49.4230, 'longitude': -1.1819,
        'label': 'D Day',
        'place': 'Utah Beach',
        'date' : 'June 6, 1944',
        'draggable': true,
      },
      {
        'latitude': 49.1869, 'longitude': -1.4610,
        'label': ' ',
        'place': 'Millieres',
        'date' : 'July 27, 1944',
        'draggable': true,
      },
      {
        'latitude': 49.0478, 'longitude': -1.4453,
        'label': ' ',
        'place': 'Coutances',
        'date' : 'July 28, 1944',
        'draggable': true,
      },
      {
        'latitude': 48.8376, 'longitude': -1.5973,
        'label': '',
        'place': 'Granville',
        'date' : 'July 29, 1944',
        'draggable': true,
      },

      {'latitude': 48.23, 'longitude': -4.29, 'label': 'Brest France', draggable: true},

    ];
    return newVar;
  }

  ngOnInit() {
    this.markers = this.getLocations();

    this.mapsAPILoader.load().then(() => {
      const center = new google.maps.LatLng(this.lat, this.lng);
      this.filteredMarkers = this.markers.filter(m => {
        const markerLoc = new google.maps.LatLng(m.latitude, m.longitude);
        const  distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center) / 1000;
        if (distanceInKm < 10000.0) {
          return m;
        }
      });
    });
  }
}

