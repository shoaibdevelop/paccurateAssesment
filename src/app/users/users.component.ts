import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { User } from '../models/user';
import * as data from '../shared/data.json';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  usersSnap: User[] = [];
  usersSelected: User[] = [];
  allUsersSelected = false;

  pSupplier: number = 1;
  pageSize: number = 5;

  search = new FormControl('');

  dropdownSettings:IDropdownSettings = {};
  coloumns = [ {colName: "s_no"},  {colName: "first_name"},  {colName: "last_name"},  {colName: "address"},  {colName: "email"},  {colName: "gender"},  {colName: "zip_code"},  {colName: "contact_number"}, {colName: "qualification"},  {colName: "experience"}, {colName: "hobbies"}, {colName: "Remarks"}];
  selectedColoumns = [ {colName: "s_no"},  {colName: "first_name"},  {colName: "last_name"},  {colName: "address"},  {colName: "email"},  {colName: "gender"},  {colName: "zip_code"},  {colName: "contact_number"}, {colName: "qualification"},  {colName: "experience"}];

  constructor() { }

  ngOnInit(): void {
    this.getUsers();
    this.configureMultiselect();
  }

  //----------------------------------------------------// read json to get data //----------------------------------------------------//
  getUsers() {
    const usersDict = data;
    for (let i=0; i<usersDict.length; i++) {
      this.users.push(usersDict[i] as User);
    }
    this.usersSnap = this.users;
  }

  //----------------------------------------------------// Configure multiselect //----------------------------------------------------//
  configureMultiselect() {
    this.dropdownSettings = {
      idField: 'colName',
      textField: 'colName',
      enableCheckAll: false,
      allowSearchFilter: false,
      clearSearchFilter: false,
      closeDropDownOnSelection: false,
    };
  }

  //----------------------------------------------------// Sorting //----------------------------------------------------//
  key: string = "supplierName";
  reverse: boolean = false;

  sortSup(key: string) {
    this.key = key
    this.reverse = !this.reverse;
  }

  //----------------------------------------------------// Select/ Deselect rows //----------------------------------------------------//
  selectAll(event: any) {
    var isChecked: boolean = event.target.checked;

      this.usersSelected = [];
      if (isChecked) {
        this.usersSelected = this.users;
      }

      this.allUsersSelected = isChecked;
  }

  selectUser(event: any, user: User) {
    var isChecked: boolean = event.target.checked;

    if (isChecked) {
      this.usersSelected.push(user);
    } else {
      this.usersSelected = this.usersSelected.filter( x => x != user);
    }
  }

  //----------------------------------------------------// Searching //------------------------------a----------------------//
  applySearch() {
    this.users = this.usersSnap;
    const key = this.search.value.toLowerCase();

    if (key != null && key != "") {
      this.users = this.users.filter(item => {
        const a = item.first_name?.toLowerCase().indexOf(key) !== -1 || !key;
        const b = item.last_name?.toLowerCase().indexOf(key) !== -1 || !key;
        const c = item.address?.toString().toLowerCase().indexOf(key) !== -1 || !key;
        const d = item.email?.toString().toLowerCase().indexOf(key) !== -1 || !key;
        const e = item.gender?.toString().toLowerCase().indexOf(key) !== -1 || !key;
        const f = item.city?.toString().toLowerCase().indexOf(key) !== -1 || !key;
        const g = item.zip_code?.toString().toLowerCase().indexOf(key) !== -1 || !key;
        const h = item.contact_number?.toString().toLowerCase().indexOf(key) !== -1 || !key;
        const i = item.qualification?.toString().toLowerCase().indexOf(key) !== -1 || !key;
        const j = item.experience?.toString().toLowerCase().indexOf(key) !== -1 || !key;
        const k = item.hobbies?.toString().toLowerCase().indexOf(key) !== -1 || !key;
        const l = item.Remarks?.toString().toLowerCase().indexOf(key) !== -1 || !key;
        return a ||  b || c || d || e || f || g || h || i || j || k || l;
      });
    }
  }

  //----------------------------------------------------// Page Size changine //----------------------------------------------------//
  onPageSizeChaned(event: any) {
    this.pageSize = parseInt(event.target.value);
  }

  //----------------------------------------------------// Multiselect //----------------------------------------------------//
  onItemSelect() {
    // TODO
  }
  onItemDeSelect() {
    // TODO
  }
  onSelectAll() {
    // TODO
  }

  getColoumnVisibility(colName: string) {
    if (this.selectedColoumns.filter(e => e.colName === colName).length > 0) {
      return true;
    }
    return false;
  }
}
