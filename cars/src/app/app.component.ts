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

  constructor(private contentful: ContentfulService) {}

  ngOnInit(): void {
    
    this.contentful.getContents().pipe(
      map(res => {
        console.log('initla load'); console.log(res);
      })
    );
    
    this.contentful.getContents_New()
      .then(contents => { 
        this.contents = contents
        console.log('second load'); console.log(this.contents);
      });

    this.contentful.getContent_GraphQl();
  }


}
