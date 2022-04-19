import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  public id: any;
  public album: any;

  private albumSub: any;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private data: MusicDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      this.id = p.get('id');
    });

    this.albumSub = this.data
      .getAlbumById(this.id)
      .subscribe((data) => (this.album = data));
  }

  addToFavourites(trackID: string) {
    this.data.addToFavourites(trackID).subscribe({
      next: (data) => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      error: (err) => {
        this.snackBar.open('Unable to add song to Favourites...', 'Done', {
          duration: 2500,
        });
      },
    });
  }

  ngOnDestroy(): void {
    if (this.albumSub) {
      this.albumSub.unsubscribe();
    }
  }
}
