import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss']
})
export class ModalDetailsComponent implements OnInit {

  public authores:any[]=[];

  public arreglo:number[] = [1,2,3,2];

  constructor(
    public dialogRef: MatDialogRef<ModalDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.authores = this.data.author;
    console.log(this.authores);
  }

}
