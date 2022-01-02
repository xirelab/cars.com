import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentfulService } from './services/contentful.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cars.com';
  lessons$: Observable<any> | undefined;
  contents: any;
  isVisible = false;
  selectedCar: any;

  constructor(private contentful: ContentfulService) {}

  ngOnInit(): void {
    
    this.contentful.getContents().pipe(
      map(res => {
        console.log('initla load'); console.log(res);
      })
    );

    this.contentful.getContents_New()
      .then(contents => { 
        console.log('second load'); console.log(contents);
      });

    this.contentful.getContent_GraphQl().then(res => {
      this.contents = res;
    });
  }

  get home() {
    console.log(this.contents.data.homeCollection.items[0])
    return this.contents.data.homeCollection.items[0];
  }

  get cars() {
    return this.home.carsCollection.items;
  }

  onClick(name: any) {
    console.log("clicked " + name);
    this.isVisible = true;
    this.selectedCar = this.cars.find((x: { name: any; }) => x.name === name);
    console.log("selected car is " + this.selectedCar.name);
  }

  getImage(name: any) {
    return this.cars.find((x: { name: any; }) => x.name === name).model.imagesCollection.items[0].url;
  }
}
