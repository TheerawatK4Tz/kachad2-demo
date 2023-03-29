import { Routes, RouterModule } from '@angular/router';
import { UserRoleGuard } from '../guards/user-role.guard';
import { IRoleAccount } from '../shared/services/account.service';
import { AuthURL } from './authentication.url';
import { BootsrapElementComponent } from './components/bootsrap-element/bootsrap-element.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsCreateComponent } from './components/patients-create/patients-create.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';
import { UiCardsComponent } from './components/ui-cards/ui-cards.component';
import { WidgetsComponent } from './components/widgets/widgets.component';

const RouteLists: Routes = [
    { path: '', redirectTo: AuthURL.Patients, pathMatch: 'full'},
    { path: AuthURL.Dashboard, component: DashboardComponent , canActivate: [UserRoleGuard], data: { roles: [IRoleAccount.Admin] }},
    { path: AuthURL.Setting, component: SettingComponent },
    { path: AuthURL.Profile, component: ProfileComponent },
    { path: AuthURL.Element, component: BootsrapElementComponent },
    { path: AuthURL.Cards, component: UiCardsComponent },
    { path: AuthURL.Widget, component: WidgetsComponent },
    { path: AuthURL.Patients, component: PatientsComponent , canActivate: [UserRoleGuard], data: { roles: [IRoleAccount.Admin, IRoleAccount.Employee, IRoleAccount.Member] } },
    { path: AuthURL.PatientsCreate, component: PatientsCreateComponent , canActivate: [UserRoleGuard], data: { roles: [IRoleAccount.Admin, IRoleAccount.Employee] }  },
    { path: AuthURL.PatientsCreate + '/:idcard', component: PatientsCreateComponent , canActivate: [UserRoleGuard], data: { roles: [IRoleAccount.Admin, IRoleAccount.Employee] }   },
];

export const AuthenticationRouting = RouterModule.forChild(RouteLists);