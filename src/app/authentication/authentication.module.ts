import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationRouting } from './authentication.routing';
import { SharedsModule } from '../shareds/shareds.module';
import { SettingComponent } from './components/setting/setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BootstrapElementsComponent } from './components/bootstrap-elements/bootstrap-elements.component';
import { UiCaredComponent } from './components/ui-cared/ui-cared.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { MambersComponent } from './components/mambers/mambers.component';
import { MamberCreateComponent } from './components/mamber-create/mamber-create.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRouting,
    SharedsModule
  ],
  declarations: [DashboardComponent,
    SettingComponent,
    ProfileComponent,
    BootstrapElementsComponent,
    UiCaredComponent,
    WidgetsComponent,
    MambersComponent,
    MamberCreateComponent,
    ChangePasswordComponent
    ]
})
export class AuthenticationModule { }
