import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "src/app/shared/shared.module"
import {ModalDetailsComponent} from "./modal-details/modal-details.component";

@NgModule({
  declarations: [ModalDetailsComponent],
  imports: [
    CommonModule,
    SharedModule
    
  ],
  exports: [
    ModalDetailsComponent

  ]
})
export class ModalModule {}
