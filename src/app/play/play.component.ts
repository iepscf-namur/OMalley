import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollInstance, PageScrollService } from 'ngx-page-scroll-core';

// import { MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

// import { PageScrollService, EasingLogic } from 'ngx-page-scroll-core'

import { SongServiceService } from '../services/song-service/song-service.service';
import { SetupServiceService } from './../services/setup-service/setup-service.service';
import { NotificationService } from '../services/notification/notification.service';

export interface SetupElement {
  id: number;
  idCatalogSong: number;
  duration: number;
  fontSize: number;
}
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

  @ViewChild('containerSong')
  public containerSong: ElementRef;

  myDuration: number = 200000;
  myFontSize: number = 20;

  idCatalogSong: any;
  artistName: any;
  songTitle: any;

  constructor(
    private route: ActivatedRoute,
    private songService: SongServiceService,
    private setupService: SetupServiceService, 
    private notifyService: NotificationService,

    public pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any,
    )
  {
    // get the parameters from the parent page
    this.idCatalogSong = this.route.snapshot.paramMap.get('idCatalogSong');
    this.artistName = this.route.snapshot.paramMap.get('artistName');
    this.songTitle = this.route.snapshot.paramMap.get('songTitle');
  }
  
  ArtistName: string = '';
  SongTitle: string = '';
  theSongSing: string = '';

  //@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  //@ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });

    // set the titles
    this.ArtistName = this.artistName;
    this.SongTitle = this.songTitle;

    // Search the right song; get the parameter from the previous page
    let idCatalogSong = "\"" + this.idCatalogSong + "\"";

    // Get the parameters(setup) of the song
    this.setupService.getOne(idCatalogSong)
    .subscribe(response => {
      let result = response as SetupElement;
      this.myDuration = result.duration;
      this.myFontSize = result.fontSize;
    })

    // Get the song
    this.songService.getOne(idCatalogSong)
    .subscribe(response => {
      let result = response as SongElement;
      this.theSongSing = result.song;
      document.getElementById('containerSong').innerHTML = 
        "<p>" + "<label " + "id=" + "\"" + "start" + "\"" + ">Start</label>" + "</p>" +
        "<p>" + this.theSongSing + "</p> " +
        "<p>" + "<label " + "id=" + "\"" + "end" + "\"" + ">End</label>" + "</p>"
    });
  }

  public startDefaultNamespaceScrolls() {

    const pageScrollInstance2: PageScrollInstance = this.pageScrollService.create({
      document: this.document,
      duration: this.myDuration,
      scrollTarget: '#end',
      scrollViews: [this.containerSong.nativeElement],
    });

    this.pageScrollService.start(pageScrollInstance2);
  }

  public resetDefaultNameScrolls() {
    // Jump to the top inside each container
    const pageScrollInstance2: PageScrollInstance = this.pageScrollService.create({
      document: this.document,
      duration: 0,
      scrollTarget: '#start',
      scrollViews: [this.containerSong.nativeElement],
    });

    this.pageScrollService.start(pageScrollInstance2);
  }

  save() {
    let setup = [{idCatalogSong: this.idCatalogSong, duration: this.myDuration, fontSize : this.myFontSize}]
    let theOldIdCatalogSong = "\"" + this.idCatalogSong +"\"";
    this.setupService.update(setup, theOldIdCatalogSong)
    .subscribe(response => {
      setup['idCatalogSong'] = this.idCatalogSong;
      setup['duration'] = this.myDuration;
      setup['fontSize'] = this.myFontSize;
      this.showToasterSuccess("Setup saved", "Songs")
    })
  }

  public stopDefaultNamespaceScrolls() {
    this.pageScrollService.stopAll('default');
  }

  public stopCustomNamespaceScrolls() {
    this.pageScrollService.stopAll('customSpace');
  }

  showToasterSuccess(message, title) {
    this.notifyService.showSuccess(message, title)
  }

}