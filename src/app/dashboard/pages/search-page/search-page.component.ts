import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent implements OnInit {
  //TODO: IMPLEMENTAR
  //? Aquí irá para cuando busquén algo
  public searchQuery: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
    });
    console.log({ param: this.searchQuery });
  }
}
