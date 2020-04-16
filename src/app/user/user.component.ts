import { Component, OnInit, ViewChild } from '@angular/core';

import { NotFoundError } from './../common/not-found-error';
import { BadRequest } from './../common/bad-request-error';
import { AppError } from './../common/validators/app-error';
import { UserServiceComponent } from './../services/user-service/user-service.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NotificationService } from '../services/notification/notification.service';

// Naming from the html (matColumnDef=)
export interface UserElement {
   login: string;
   userName: string;
   password: string;
   idRoleUser: number;
}

@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

   constructor(
     private service: UserServiceComponent,
     private notifyService: NotificationService
   ) { }

   // MatPaginator Inputs
   length = 1000;
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10, 25, 100];

   // MatPaginator Output
   pageEvent: PageEvent;

   ELEMENT_DATA: UserElement[];
   columnsToDisplay = ['login', 'userName', 'idRoleUser', 'actions'];
   myDataSource = new MatTableDataSource(this.ELEMENT_DATA);

   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort: MatSort;
   
   applyFilter(filterValue: string) {
      this.myDataSource.filter = filterValue.trim().toLowerCase();

      if (this.myDataSource.paginator) {
         this.myDataSource.paginator.firstPage();
      }
   }

//   users: any[];
   UserLogin: string = '';
   UserUserName: string = '';
   UserPassword: string = '';
   UserIdRoleUser: string ='';
//   OldUserLogin: string = '';
//   OldUserUserName: string = '';
//   OldUserPassword: string = '';
//   OldUserIdRoleUser: string = '';

   button = "btn btn-danger";
   buttonText = "Ajouter";
//   method = "createUser";

//   index = null;

   ngOnInit(): void {
      this.myDataSource.paginator = this.paginator;
      this.myDataSource.sort = this.sort;

      this.service.getAll()
      .subscribe(response =>  {
         console.log(response);
         this.ELEMENT_DATA = response as UserElement[];
         this.myDataSource.data = this.ELEMENT_DATA;
         // this.showToasterSuccess("Data loaded successfully", "Users")
      });
   }

//   onItemSelect(item: any) {
//     console.log(item);
//   }

//   onSelectAll(items: any) {
//     console.log(items);
//   }

   methodSwitch(form){
//     console.log("switch form");
//     if (this.method == "createUser"){
//       this.createUser(form);
//     } else {
//       this.updateUser(form);
//     }
   }    
  
//   getIndex(user){
//     let index = this.ELEMENT_DATA.indexOf(user);
//     return index;
//   }

//   createUser(input: HTMLInputElement){

//     let user = input.value;

//     this.service.create(user)
//       .subscribe(
//         response => {
//           user['login'] = response['log'];
//           user['userName'] = response['userN'];
//           user['password'] = response['pass'];
//           user['idRoleUser'] = response['idRoleU'];
        
//           this.ELEMENT_DATA.splice(0, 0, user as any);
//           this.myDataSource.data = this.ELEMENT_DATA;
//           console.log(response);
//           this.resetForm();
//         },
//         (error: AppError) => {
//           if (error instanceof BadRequest) {
//             //this.form.setErrors(error.originalError);
// //            this.sharedSnackBarMessage.changeMessage("Cet utilisateur existe deja");
// //            this.snackBarService.openDangerSnackBar(SnackbarMessageComponent);
//           } else {
//             throw error;
//           }
//         }
//       )
//   }

   deleteUser(user) {

//     this.service.delete(user.login)
    
//     .subscribe(response => {
//          console.log(response);
//          //On va maintenant delete le secteur dans notre array
//          this.ELEMENT_DATA.splice(this.getIndex(user),1);
//          this.myDataSource.data = this.ELEMENT_DATA;

//          //this.sharedSnackBarMessage.changeMessage("Utilisateur supprimé avec succes !");
//          //this.snackBarService.openSuccessSnackBar(SnackbarMessageComponent);
//     }, (error : AppError) => {
//         if (error instanceof NotFoundError){
//           //this.sharedSnackBarMessage.changeMessage("Cet utilisateur a déjà été supprimé");
//           //this.snackBarService.openDangerSnackBar(SnackbarMessageComponent);
//           throw error;
//         }
//         else throw error;
//     });

   }

//   updateUser(input: HTMLInputElement) {

//     let user = input.value;

//     if (user['login'] != this.OldUserLogin)
//       {
//       this.service.update(user,this.OldUserLogin)
//         .subscribe(
//           response => {
//             console.log(response);

//             user['login'] = this.OldUserLogin;
//             user['password'] = this.OldUserPassword;
//             user['userName'] = this.OldUserUserName;
//             user['idUserRole'] = this.OldUserIdRoleUser;

//             this.ELEMENT_DATA.splice(this.index,1);
//             this.ELEMENT_DATA.splice(0, 0, user as any);
//             this.myDataSource.data = this.ELEMENT_DATA;
//             this.resetForm();

//             //this.sharedSnackBarMessage.changeMessage("Utilisateur mis à jour avec succes !");
//             //this.snackBarService.openSuccessSnackBar(SnackbarMessageComponent);
//           },
//           (error: AppError) => {
//             //this.posts.splice(0, 1);
//             //this.sharedSnackBarMessage.changeMessage("Cet utilisateur a été supprimé. Il ne peut pas être mis à jour.");
//             //this.snackBarService.openDangerSnackBar(SnackbarMessageComponent);
//           });
//       } else {
//         //throw error
//         //this.sharedSnackBarMessage.changeMessage("Le nom de l'utilisateur existant est identique à la proposition de changement");
//         //this.snackBarService.openWarningSnackBar(SnackbarMessageComponent);
//       }
//   }

   retrieveUserData(input: any){
//     this.resetForm();
//     this.UserLogin = input.UserLogin;
//     this.UserUserName = input.UserUserName;
//     this.UserPassword = input.UserPassword;
//     this.OldUserLogin = input.UserOldLogin;
//     this.OldUserUserName = input.UserOldUserName;
//     this.OldUserPassword = input.UserOldPassword;
//     this.OldUserIdRoleUser = input.UserOldIdUserRole;

//     this.button = "btn btn-info";
//     this.buttonText = "Editer";
//     this.method = "createUser";

//     this.index = this.getIndex(input);
   }  
  
   resetForm() {
//     this.UserLogin = "";
//     this.UserUserName = "";
//     this.UserPassword = "";
//     this.OldUserLogin = "";
//     this.OldUserUserName = "";
//     this.OldUserPassword = "";
//     this.OldUserIdRoleUser = "";

//     this.button = "btn btn-danger";
//     this.buttonText = "Ajouter";
//     this.method = "createUser";
   }

   showToasterSuccess(title, message) {
      this.notifyService.showSuccess(title, message)
   }

}
