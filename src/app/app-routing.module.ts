import { DeleteupdateComponent } from './deleteupdate/deleteupdate.component';
import { PlayComponent } from './play/play.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { UserComponent } from './user/user.component';
import { LoadComponent } from './load/load.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'load', component: LoadComponent },
  { path: 'users', component: UserComponent },
  { path: 'play', component: PlayComponent },
  { path: 'delupd', component: DeleteupdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
