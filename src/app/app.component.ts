import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
declare var google;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  lat = 40.0150;
  lng = -105.2705;
  zoom = 10;
  markers = [];
  filteredMarkers = [];

  constructor(
    private mapsAPILoader: MapsAPILoader
  ) { }

  getLocations(): Array<{ latitude: number, longitude: number, label: String, draggable: boolean }> {
    return [
      { 'latitude': 40.0150, 'longitude': -105.2705, 'label' : 'Mountains',  draggable: true},
      { 'latitude': 40.0150, 'longitude': -105.99,   'label' : 'Boulder', draggable: true},
      { 'latitude': 39.7392, 'longitude': -104.9903, 'label' : 'Denver', draggable: true },
      { 'latitude': 38.7392, 'longitude': -104.9903, 'label' : 'Springs', draggable: true },
    ];
  }

  ngOnInit() {
    this.markers = this.getLocations();

    this.mapsAPILoader.load().then(() => {
      const center = new google.maps.LatLng(this.lat, this.lng);
      this.filteredMarkers = this.markers.filter(m => {
        const markerLoc = new google.maps.LatLng(m.latitude, m.longitude);
        const  distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center) / 1000;
        if (distanceInKm < 100.0) {
          return m;
        }
      });
    });
  }
}

