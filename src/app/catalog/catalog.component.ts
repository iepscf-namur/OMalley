import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { CatalogServiceComponent } from '../services/catalog-service/catalog-service.component';
import { NotificationService } from '../services/notification/notification.service';

export interface CatalogElement {
  idSong: number;
  artistName: string;
  songTitle: string;
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(
     private service: CatalogServiceComponent,
     private notifyService: NotificationService,
     private router: Router
  ) { }

  // MatPaginator Inputs
  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  ELEMENT_DATA: CatalogElement[];
  columnsToDisplay = ['idSong', 'artistName', 'songTitle', 'play'];
  myDataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.myDataSource.paginator = this.paginator;
    this.myDataSource.sort = this.sort;

    this.service.getAll()
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

  retrieveSongData(song) {
    // pass the parameter to the child page
    let theIdCatalogSong = song.idSong;
    let theArtistName = song.artistName; 
    let theSongTitle = song.songTitle;
    this.router.navigate(['/play', { idCatalogSong: theIdCatalogSong, artistName: theArtistName, songTitle: theSongTitle }]);
  }
  
  showToasterSuccess(title, message) {
    this.notifyService.showSuccess(title, message)
  }

}