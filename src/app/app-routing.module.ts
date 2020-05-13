import { DeleteupdateComponent } from './deleteupdate/deleteupdate.component';
import { PlayComponent } from './play/play.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { UserComponent } from './user/user.component';
import { LoadComponent } from './load/load.component';
import { AuthGuard } from './guards/auth-guard.component';
import { AdminGuard } from './guards/admin-guard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent, canActivate: [AuthGuard] },
  { path: 'load', component: LoadComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [AdminGuard] },
  { path: 'play', component: PlayComponent, canActivate: [AuthGuard] },
  { path: 'delupd', component: DeleteupdateComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
