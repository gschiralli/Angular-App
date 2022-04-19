import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  public releases: any;
  private releaseSub: any;

  constructor(private data: MusicDataService) {}

  ngOnInit(): void {
    this.releaseSub = this.data
      .getNewReleases()
      .subscribe((data) => (this.releases = data.albums.items));
  }

  ngOnDestroy(): void {
    this.releaseSub.unsubscribe();
  }
}
