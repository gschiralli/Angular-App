import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  public id: any;
  public albums: any;
  public artist: any;

  private artistSub: any;
  private albumsSub: any;
  constructor(private route: ActivatedRoute, private data: MusicDataService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => (this.id = param.get('id')));

    this.artistSub = this.data
      .getArtistById(this.id)
      .subscribe((d) => (this.artist = d));

    this.albumsSub = this.data
      .getAlbumsByArtistId(this.id)
      .subscribe(
        (data) =>
          (this.albums = data.items.filter(
            (curValue, index, self) =>
              self.findIndex(
                (t) => t.name.toUpperCase() === curValue.name.toUpperCase()
              ) === index
          ))
      );
  }

  ngOnDestroy(): void {
    this.artistSub.unsubscribe();
    this.albumsSub.unsubscribe();
  }
}
