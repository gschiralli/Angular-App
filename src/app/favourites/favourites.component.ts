import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any> = [];
  private favouritesSub: any;
  private removedSub: any;
  constructor(private data: MusicDataService) {}

  ngOnInit(): void {
    this.favouritesSub = this.data.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

  removeFromFavourites(trackID: string) {
    this.removedSub = this.data
      .removeFromFavourites(trackID)
      .subscribe((data) => (this.favourites = data.tracks));
  }

  ngOnDestroy(): void {
    this.favouritesSub.unsubscribe();
    if (this.removedSub) this.removedSub.unsubscribe();
  }
}
