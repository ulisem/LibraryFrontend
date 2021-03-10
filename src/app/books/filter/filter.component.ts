import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';

export interface Book {
  publicationYear: string;
  description: string;
  edition: number;
  img: string,
  isbn: string,
  location:string,
  quantity: number,
  title: string
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  stateCtrl = new FormControl();
  filteredStates: Observable<Book[]>;
  public books:any;
  public data:any=[];
  public charge:boolean=false;
  public showTable:boolean=false;

  public readerSearch: FormGroup;


  constructor(
    private booksService:BookService,
    private fb:FormBuilder,
        ) {
  
  }

  ngOnInit(){
    this.readerSearch = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', [Validators.required]]
    });
    this.getAllbooks();
 
  }

  async getAllbooks(){
    try {
   this.books =  await this.booksService.getAllBooks();
   console.log(this.books);
   this.filteredStates = this.stateCtrl.valueChanges
   .pipe(
     startWith(''),
     map(book => book ? this._filterStates(book) : this.books.slice())
   );
    } catch (error) {
      
    }
  }

  private _filterStates(value: string): Book[] {
    const filterValue = value.toLowerCase();

    return this.books.filter(book => book.title.toLowerCase().indexOf(filterValue) === 0);
  }

  public async getFilterBook(){
    console.log(this.readerSearch.value);
    this.charge = true;
    this.showTable = false;

    try {
      if(this.readerSearch.value.type == "title"){

        this.data = await this.booksService.getBooksByTitle(this.readerSearch.value.search);

      }else {

        this.data = await this.booksService.getBooksByAuthors(this.readerSearch.value.search);
      }

    setTimeout(() => {
      this.charge = false;
      this.showTable = true;
    }, 2000);
      console.log(this.data);
    } catch (error) {
      
    }

  }

}
