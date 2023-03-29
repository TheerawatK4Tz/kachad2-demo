import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationRouting } from './authentication.routing';
import { SharedModule } from '../shared/shared.module';
import { SettingComponent } from './components/setting/setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BootsrapElementComponent } from './components/bootsrap-element/bootsrap-element.component';
import { UiCardsComponent } from './components/ui-cards/ui-cards.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientsCreateComponent } from './components/patients-create/patients-create.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SettingComponent,
    ProfileComponent,
    BootsrapElementComponent,
    UiCardsComponent,
    WidgetsComponent,
    PatientsComponent,
    PatientsCreateComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRouting,
    SharedModule
  ]
})
export class AuthenticationModule { }
