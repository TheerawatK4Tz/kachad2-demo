import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { AuthSidebarComponent } from './components/auth-sidebar/auth-sidebar.component';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
import { AccountService } from './services/account.service';
import { ValidatorsService } from './services/validator.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedsService } from './services/shareds.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipeModule } from 'ngx-filter-pipe';

//เพิ่มภาษาไทยให้ dataPicker
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { thLocale } from 'ngx-bootstrap/locale';


defineLocale('th', thBeLocale);


@NgModule({
  declarations: [
    AuthNavbarComponent,
    AuthSidebarComponent,
    AuthContentComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FilterPipeModule
    
    // BrowserAnimationsModule
  ],
  exports: [
    AuthNavbarComponent,
    BsDropdownModule,
    AuthSidebarComponent,
    AuthContentComponent,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    PaginationModule,
    BsDatepickerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FilterPipeModule
    // BrowserAnimationsModule
  ],
  providers: [
    AlertService,
    // AccountService,
    ValidatorsService,
    SharedsService
  ]
})
export class SharedModule { }
