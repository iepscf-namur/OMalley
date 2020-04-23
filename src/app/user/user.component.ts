import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl } from '@angular/forms';

import { NotFoundError } from './../common/not-found-error';
import { BadRequest } from './../common/bad-request-error';
import { AppError } from './../common/validators/app-error';
import { UserServiceComponent } from './../services/user-service/user-service.component';
import { TypeRoleService } from './../services/type-role/type-role.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NotificationService } from '../services/notification/notification.service';
import { element } from 'protractor';

// Naming from the html (matColumnDef=)
export interface UserElement {
   login: string;
   userName: string;
   password: string;
   idRoleUser: number;
}

// Naming from the html
export interface TypeRoleElement {
   id: number;
   name: string;
   description: string;
}

@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

   constructor(
     private service: UserServiceComponent,
     private notifyService: NotificationService,
     private typeRoleService: TypeRoleService
   ) { }

   //Used to get Tab Index
   selected = new FormControl(0);

   // Dropdown
   dropdownRolesList = [];
   selectedRolesItems = [];
   dropdownRolesSettings:IDropdownSettings = {};

   // MatPaginator Inputs
   length = 1000;
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10, 25, 100];

   // MatPaginator Output
   pageEvent: PageEvent;

   ELEMENT_DATA: UserElement[];
   columnsToDisplay = ['login', 'userName', 'idRoleUser', 'actions'];
   myDataSource = new MatTableDataSource(this.ELEMENT_DATA);

   TYPEROLE_DATA: TypeRoleElement[];
   columnsToDisplayTypeRole = ['id','name','description'];
   myDataSourceTypeRole = new MatTableDataSource(this.TYPEROLE_DATA);

   TYPEROLE_DATA_ONE: TypeRoleElement[];
   columnsToDisplayTypeRoleOne = ['id','name','description'];
   myDataSourceTypeRoleOne = new MatTableDataSource(this.TYPEROLE_DATA_ONE);

   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatPaginator, {static: true}) paginator2: MatPaginator;

   @ViewChild(MatSort, {static: true}) sort: MatSort ;
   
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
   OldUserLogin: string = '';
   OldUserUserName: string = '';
   OldUserPassword: string = '';
   OldUserIdRoleUser: string = '';

   id: string = '';
   name: string = '';
   description: string = '';
   oldRoleId: string = '';
   oldRoleName: string = '';
   oldRoleDescription: string = '';

   button = "btn btn-danger";
   buttonText = "Ajouter";
   method = "createUser";

   index = null;

   ngOnInit(): void {
      this.myDataSource.paginator = this.paginator;
      this.myDataSource.sort = this.sort;

      this.service.getAll()
      .subscribe(response =>  {
         this.ELEMENT_DATA = response as UserElement[];
         this.myDataSource.data = this.ELEMENT_DATA;
      })

      this.dropdownRolesSettings = {
         singleSelection: true,
         idField: 'id',
         textField: 'name',
         selectAllText: 'Select All',
         unSelectAllText: 'UnSelect All',
         itemsShowLimit: 3,
         allowSearchFilter: false
      };

      // Populate dropbox for Role
      this.typeRoleService.getAll()
      .subscribe(response => {
         this.TYPEROLE_DATA = response as any;
         this.myDataSourceTypeRole.data = this.TYPEROLE_DATA;

         let dropdown = [];
         this.myDataSourceTypeRole.data.forEach(element => {
            dropdown.push({id: element.id, name: element.name, description: element.description});
         })
         this.dropdownRolesList = dropdown;
      });
   
   }

   onItemSelect(item: any) {
   
   }

   onSelectAll(items: any) {

   }

   methodSwitch(form){
      if (this.method == "createUser"){
         this.createUser(form);
      } else {
         this.updateUser(form);
      }
   }    
  
   getIndex(user){
      let index = this.ELEMENT_DATA.indexOf(user);
      return index;
   }

   createUser(input: HTMLInputElement){
      if ((input.value['login'] == "") || (input.value['password'] == "")) {
         this.showToasterError("Le nom ou le mot de passe ne peuvent être vides", "Users")
      } else {
         // Create the array to pass. e.g. :
         // [{"login": "titi@hotmail.be","password": "mytiti123","userName": "titi","idRoleUser": 0}]
         let theLogin = input.value['login'];
         let thePassword = input.value['password'];
         let theUserName = input.value['userName'];

         let theRole = this.selectedRolesItems[0];
         let theIdRoleUser = theRole.id;
         let user = [{ login: theLogin, password: thePassword, userName: theUserName, idRoleUser: theIdRoleUser }];

         this.service.create(user)
         .subscribe(
            response => {
               user['login'] = theLogin;
               user['userName'] = thePassword;
               user['password'] = theUserName;
               user['idRoleUser'] = theIdRoleUser;
        
               this.ELEMENT_DATA.splice(0, 0, user as any);
               this.myDataSource.data = this.ELEMENT_DATA;
               this.resetForm();
               this.showToasterSuccess("Utilisateur ajouté", "Users");
            },
            (error: AppError) => {
               if (error instanceof BadRequest) {
                  this.showToasterError("Cet utilisateur existe deja", "Users");
               } else {
                  throw error;
               }
            }
         )
      }
   }

   deleteUser(user) {
      
      this.service.delete("\"" + user.login + "\"")
      .subscribe(response => {
         //On va maintenant delete le secteur dans notre array
         this.ELEMENT_DATA.splice(this.getIndex(user),1);
         this.myDataSource.data = this.ELEMENT_DATA;
         this.showToasterSuccess("Utilisateur supprimé avec succès", "Users");
      }, (error : AppError) => {
         if (error instanceof NotFoundError){
            this.showToasterError("Cet utilisateur a déjà été supprimé", "Users");
            throw error;
         }
         else throw error;
      });
   }

   updateUser(input: HTMLInputElement) {

      if ((input.value['login'] != this.OldUserLogin) || (input.value['userName'] != this.OldUserUserName) ||
      (input.value['password'] != this.OldUserPassword) || (input.value['idRoleUser'] != this.OldUserIdRoleUser)) {
      
         let theLogin = input.value['login'];
         let thePassword = input.value['password'];
         let theUserName = input.value['userName'];
         let theRole = this.selectedRolesItems[0];
         let theIdRoleUser = theRole.id;
         
         let theOldLogin = "\"" + this.OldUserLogin +"\"";
         let user = [{ login: theLogin, password: thePassword, userName: theUserName, idRoleUser: theIdRoleUser }];

         this.service.update(user, theOldLogin)
         .subscribe(response => {
            user['login'] = theLogin;
            user['password'] = thePassword;
            user['userName'] = theUserName;
            user['idRoleUser'] = theIdRoleUser;

            this.ELEMENT_DATA.splice(this.index,1);
            this.ELEMENT_DATA.splice(0, 0, user as any);
            this.myDataSource.data = this.ELEMENT_DATA;
            this.resetForm();

            this.showToasterSuccess("Utilisateur mis à jour", "Users");
         },
         (error: AppError) => {
            this.showToasterError("Cet utilisateur a été supprimé. Il ne peut pas être mis à jour","Users")
         });
      } else {
         this.showToasterInfo("Aucun changement détecté","Users")
      }
   }

   retrieveUserData(input: any){
      this.resetForm();

      this.UserLogin = input.login;
      this.UserUserName = input.userName;
      this.UserPassword = input.password;
      this.UserIdRoleUser = input.idRoleUser;
      this.OldUserLogin = input.login;
      this.OldUserUserName = input.userName;
      this.OldUserPassword = input.password;
      this.OldUserIdRoleUser = input.idRoleUser;

      let myRole = this.findOneRole(input.idRoleUser);
      this.selectedRolesItems.push({name: myRole});

      this.button = "btn btn-info";
      this.buttonText = "Editer";
      this.method = "updateUser";

      this.index = this.getIndex(input);
   }
   
   findOneRole(myId: number): string {
      let myName = "";
      this.myDataSourceTypeRole.data.forEach(element => {
         if (element.id == myId) {
            myName = element.name;
         }
      })
      return myName;
   }
  
   resetForm() {
      this.UserLogin = "";
      this.UserUserName = "";
      this.UserPassword = "";
      this.OldUserLogin = "";
      this.OldUserUserName = "";
      this.OldUserPassword = "";
      this.OldUserIdRoleUser = "";

      this.selectedRolesItems = [];

      this.button = "btn btn-danger";
      this.buttonText = "Ajouter";
      this.method = "createUser";
   }

   showToasterSuccess(title, message) {
      this.notifyService.showSuccess(title, message)
   }

   showToasterError(title, message) {
      this.notifyService.showError(title, message)
   }

   showToasterInfo(title, message) {
      this.notifyService.showInfo(title, message)
   }

}