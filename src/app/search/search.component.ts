import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Location } from '@angular/common';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  results = [];
  noResult = false;
  searchForm = new FormGroup({
    query: new FormControl(''),
  });
  constructor(private api: ApiService, public location: Location, private common: CommonService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.noResult = false;
    this.api.search(this.searchForm.value.query).subscribe((queryResult: any) => {
      const rawArray = queryResult.result.hits.hits as Array<any>;
      const reducer = (acc, currentItem, index, array) => {
        if (acc.find(item => currentItem.productId === item.productId)) {
          return acc;
        }
        return acc.slice(0).concat(Array.of(currentItem));
      };
      if (!rawArray.length) {
        this.noResult = true;
      }
      this.results = rawArray.map(item => item._source).reduce(reducer, []);
    });
  }

}
