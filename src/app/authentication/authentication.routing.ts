import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingComponent } from './components/setting/setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BootstrapElementsComponent } from './components/bootstrap-elements/bootstrap-elements.component';
import { UiCaredComponent } from './components/ui-cared/ui-cared.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { MambersComponent } from './components/mambers/mambers.component';
import { MamberCreateComponent } from './components/mamber-create/mamber-create.component';

const RouteLists: Routes = [
    { path: '', redirectTo: AuthURL.Dashboard, pathMatch: 'full' },
    {path: AuthURL.Dashboard, component: DashboardComponent},
    {path: AuthURL.Setting, component: SettingComponent},
    {path: AuthURL.Profile, component: ProfileComponent},
    {path: AuthURL.Element, component: BootstrapElementsComponent},
    {path: AuthURL.Cared, component: UiCaredComponent},
    {path: AuthURL.Widget, component: WidgetsComponent},
    {path: AuthURL.Memder, component: MambersComponent},
    {path: AuthURL.MemberCreate, component: MamberCreateComponent}


];

export const AuthenticationRouting = RouterModule.forChild(RouteLists);
