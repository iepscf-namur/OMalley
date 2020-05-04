import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { NotFoundError } from './../common/not-found-error';
import { BadRequest } from './../common/bad-request-error';
import { AppError } from './../common/validators/app-error';

import { CatalogServiceComponent } from './../services/catalog-service/catalog-service.component';
import { SongServiceService } from './../services/song-service/song-service.service';
import { NotificationService } from '../services/notification/notification.service';

export interface CatalogElement {
  idSong: number;
  artistName: string;
  songTitle: string;
}

@Component({
  selector: 'app-deleteupdate',
  templateUrl: './deleteupdate.component.html',
  styleUrls: ['./deleteupdate.component.css']
})
export class DeleteupdateComponent implements OnInit {

  constructor(
    private catalogService: CatalogServiceComponent,
    private songService: SongServiceService,
    private notifyService: NotificationService,
  ) { }

  // MatPaginator Inputs
  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  ELEMENT_DATA: CatalogElement[];
  columnsToDisplay = ['idSong', 'artistName', 'songTitle', 'actions'];
  myDataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  IdSong: number;
  ArtistName: string;
  SongTitle: string;
  OldIdSong: number = 0;
  OldArtistName: string = '';
  OldSongTitle: string = '';

  index = null;

  ngOnInit(): void {
    this.myDataSource.paginator = this.paginator;
    this.myDataSource.sort = this.sort;

    this.catalogService.getAll()
    .subscribe(response =>  {
      //this.userConnected = response.login as any;
      this.ELEMENT_DATA = response as CatalogElement[];
      this.myDataSource.data = this.ELEMENT_DATA;
    });

  }

  //onItemSelect(item: any) {
  //  console.log(item);
  //}

  // onSelectAll(items: any) {
  //   console.log(items);
  // }

  // setSelectedRow() {
   
  // }

  getIndex(song){
    let index = this.ELEMENT_DATA.indexOf(song);
    return index;
  }


  deleteCatalog(song) {
    this.songService.delete("\"" + song.songTitle + "\"")
    .subscribe(response => {
       //On va maintenant delete le secteur dans notre array
       this.ELEMENT_DATA.splice(this.getIndex(song),1);
       this.myDataSource.data = this.ELEMENT_DATA;
       this.showToasterSuccess("Chanson supprimée avec succès", "Songs");
    }, (error : AppError) => {
       if (error instanceof NotFoundError){
          this.showToasterError("Cette chanson a déjà été supprimée", "Songs");
          throw error;
       }
       else throw error;
    });
  }
  
  retrieveCatalogData(input: any) {
    this.resetForm();

    this.IdSong = input.idSong;
    this.ArtistName = input.artistName;
    this.SongTitle = input.songTitle;
    this.OldIdSong = input.idSong;
    this.OldArtistName = input.artistName;
    this.OldSongTitle = input.songTitle;

    this.index = this.getIndex(input);
  }
  
  resetForm() {
    this.IdSong = 0;
    this.ArtistName = '';
    this.SongTitle = '';
    this.OldIdSong = 0;
    this.OldArtistName = '';
    this.OldSongTitle = '';
  }

  showToasterSuccess(title, message) {
    this.notifyService.showSuccess(title, message)
  }

  showToasterError(title, message) {
    this.notifyService.showError(title, message)
  }

}