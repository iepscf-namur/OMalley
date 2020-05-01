import { Component, OnInit, ViewChild } from '@angular/core';
import { SongServiceService } from '../services/song-service/song-service.service';
import { ScrollToBottomDirective } from '../services/scroll-to-bottom.directive';
import { NotificationService } from '../services/notification/notification.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Routes, RouterModule, Router } from "@angular/router";

export interface SongElement {
  id: number;
  idCatalogSong: number;
  song: string;
}

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  @ViewChild(ScrollToBottomDirective)
  scroll: ScrollToBottomDirective;

  idCatalog: any;

  constructor(
    private router: Router,
    private songService: SongServiceService,
    private notifyService: NotificationService,
    )
  {
    this.idCatalog = this.router.getCurrentNavigation().extras.state;
  }
  
  ArtistName: string = 'Jacques Brel';
  SongTitle: string = 'Ne me quitte pas';
  mySong: string = '';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    // Search the right song; get the parameter from the previous page
    let idCatalogSong = "\"" + this.idCatalog.idCatalogSong + "\"";

    // Get the song
    this.songService.getOne(idCatalogSong)
    .subscribe(response => {
      let result = response as SongElement;
      this.mySong = result.song;
    });
  }

  showToasterSuccess(title, message) {
    this.notifyService.showSuccess(title, message)
  }

// ---------------------------------
  // TO BE TESTED SOMETHING LIKE THIS
// ---------------------------------
// ---------------------------------
// ---------------------------------
// ---------------------------------
// ---------------------------------
scrollToLine($textarea, lineNumber) {
    var lineHeight = parseInt($textarea.css('line-height'));
    $textarea.scrollTop(lineNumber * lineHeight);      
  }

}
