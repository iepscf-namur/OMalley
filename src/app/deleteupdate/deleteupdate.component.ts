import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  
  constructor(
    private catalogService: CatalogServiceComponent,
    private songService: SongServiceService,
    private notifyService: NotificationService
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

  SongIdSong: number;
  SongArtistName: string;
  SongSongTitle: string;
  SongOldIdSong: number = 0;
  SongOldArtistName: string = '';
  SongOldSongTitle: string = '';
  theSong: string = '';

  index = null;

  ngOnInit(): void {
    this.myDataSource.paginator = this.paginator;
    this.myDataSource.sort = this.sort;

    this.catalogService.getAll()
    .subscribe(response =>  {
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

  deleteSong(song) {
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

  prepapreSongData() {
    
    var file = (<HTMLInputElement>document.getElementById("myFile")).files[0];
    var fileName = (<HTMLInputElement>document.getElementById("myFile")).files[0].name;

    if (!this.checkFileExt(fileName)) {
      this.showToasterError("Le fichier doit être un fichier texte", "Songs")
    } else {
      if (!file) {
        this.showToasterError("Le fichier est soit manquant soit corrompu", "Songs")
      } else {

        var reader = new FileReader();
        reader.onloadend = () => {
          this.theSong = reader.result.toString(),
          this.updateSong();
        };
        reader.readAsText(file);
      }
    }
  }

  checkFields(): boolean {
    let valid: boolean = true;
    if ((this.SongArtistName == "") || (this.SongSongTitle == "")) {
      valid = false;
    }
    return valid;
  }

  checkFileExt(name: string): boolean {
    let ok = false;
    var str = name;
    var s = str.indexOf('.');
    if (s != -1) {
      var l = str.length;
      var ext = str.substr(s+1, l-s);
      if (ext == "txt") ok = true;
    }
    return ok;
  }

  updateSong() {
    if (!this.checkFields()) {
      this.showToasterError("L'artiste ou le titre ne peuvent être vides", "Songs")
    } else {
      // Now call the Web Service to load the song
      let song = [{ artistName: this.SongArtistName, songTitle: this.SongSongTitle, song: this.theSong }];
      let theOldSongTitle = "\"" + this.SongOldSongTitle + "\"";
      this.songService.update(song, theOldSongTitle)
      .subscribe(
        response => {
          song['idSong'] = this.SongIdSong;
          song['artistName'] = this.SongArtistName;
          song['songTitle'] = this.SongSongTitle;

          this.ELEMENT_DATA.splice(this.index,1);
          this.ELEMENT_DATA.splice(0, 0, song as any);
          this.myDataSource.data = this.ELEMENT_DATA;
          this.resetForm();

          this.showToasterSuccess("Chanson mise à jour", "Song");
        },
        (error: AppError) => {
          if (error instanceof BadRequest) {
              this.showToasterError("Cette chanson existe deja", "Songs");
          } else {
              throw error;
          }
        }
      )
    }
  }

  retrieveSongData(input: any) {
    this.resetForm();

    this.SongIdSong = input.idSong;
    this.SongArtistName = input.artistName;
    this.SongSongTitle = input.songTitle;
    this.SongOldIdSong = input.idSong;
    this.SongOldArtistName = input.artistName;
    this.SongOldSongTitle = input.songTitle;

    this.index = this.getIndex(input);
  }
  
  resetForm() {
    this.SongIdSong = 0;
    this.SongArtistName = '';
    this.SongSongTitle = '';
    this.SongOldIdSong = 0;
    this.SongOldArtistName = '';
    this.SongOldSongTitle = '';
  }

  showToasterSuccess(title, message) {
    this.notifyService.showSuccess(title, message)
  }

  showToasterError(title, message) {
    this.notifyService.showError(title, message)
  }

}