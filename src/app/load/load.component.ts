import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import { NotFoundError } from './../common/not-found-error';
import { BadRequest } from './../common/bad-request-error';
import { AppError } from './../common/validators/app-error';
import { CatalogServiceComponent } from './../services/catalog-service/catalog-service.component';
import { LoadServiceService } from './../services/load-service/load-service.service';
import { NotificationService } from '../services/notification/notification.service';

export interface CatalogElement {
  idSong: number;
  artistName: string;
  songTitle: string;
}

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {
  
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
    private songService: LoadServiceService,
    private catalogService: CatalogServiceComponent,
    private http: HttpClient,
    private notifyService: NotificationService,
    private formBuilder: FormBuilder
    ) { }

  CATALOG_DATA: CatalogElement[];

  ArtistName: string = '';
  SongTitle: string = '';
  theSong: string = '';

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      ArtistName: '',
      SongTitle: '',
    });
  }

  get f(){
    return this.myForm.controls;
  }

  load() {

    // load artist name and song tilte
    this.ArtistName = this.myForm.get('ArtistName').value;
    this.SongTitle = this.myForm.get('SongTitle').value;

    var file = (<HTMLInputElement>document.getElementById("myFile")).files[0];
    var fileName = (<HTMLInputElement>document.getElementById("myFile")).files[0].name;
    console.log("var fileName: ", fileName);

    if (!this.checkFileExt(fileName)) {
      this.showToasterError("Le fichier doit être un fichier texte", "Songs")
    } else {
      if (!file) {
        this.showToasterError("Le fichier est soit manquant soit corrompu", "Songs")
      } else {

        var reader = new FileReader();
        reader.onloadend = () => {
          this.theSong = reader.result.toString(),
          this.createSong();
        };
        reader.readAsText(file, 'UTF-8');
      }
    }
  }

  createSong() {

    if (!this.checkFields()) {
      this.showToasterError("L'artiste ou le titre ne peuvent être vides", "Songs")
    } else {
      // Now call the Web Service to load the song
      let song = [{ artistName: this.ArtistName, songTitle: this.SongTitle, song: this.theSong }];
      this.songService.create(song)
      .subscribe(
        response => {
            this.showToasterSuccess("Chanson ajoutée", "Song");
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

  checkFields(): boolean {
    let valid: boolean = true;
    if ((this.ArtistName == "") || (this.SongTitle == "")) {
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

  resetForm() {
    this.ArtistName = '';
    this.SongTitle = '';
    this.theSong = '';
  }

  showToasterSuccess(message, title) {
    this.notifyService.showSuccess(message, title)
  }

  showToasterError(message, title) {
    this.notifyService.showError(message, title)
  }

  showToasterInfo(message, title) {
    this.notifyService.showInfo(message, title)
  }

}