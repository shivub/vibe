import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from '../../material.module';
import { ShowcardComponent } from './showcard/showcard.component';
import { ShowlistComponent } from './showlist/showlist.component';
import { BannerComponent } from './banner/banner.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SearchComponent,
    ShowcardComponent,
    ShowlistComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[MaterialModule, SearchComponent, ShowcardComponent, ShowlistComponent, BannerComponent]
})
export class SharedModule { }
