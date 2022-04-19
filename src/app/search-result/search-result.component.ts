import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  results: any;
  searchQuery: string = '';

  private searchArtist: any;

  constructor(private route: ActivatedRoute, private data: MusicDataService) {}
  ngOnInit(): void {
    this.searchArtist = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      this.data.searchArtists(this.searchQuery).subscribe((data) => {
        this.results = data.artists.items.filter(
          (item) => item.images.length > 0
        );
      });
    });
  }

  ngOnDestroy(): void {
    this.searchArtist.unsubscribe();
  }
}
