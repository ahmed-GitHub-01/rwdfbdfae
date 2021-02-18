import { Routes } from '@angular/router';
import { MaincallcenterComponent } from './body/CallCenter/maincallcenter/maincallcenter.component';
import { ShowPdfComponent } from './body/CallCenter/showPdf/showPdf.component';
import { HomeComponent } from './body/home/home.component';
import { MyprofileComponent } from './body/myprofile/myprofile.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { UpdateUserComponent } from './login/updateUser/updateUser.component';
import { AuthGuard } from './_guards/auth.guard';
import { AnotherFileResolver } from './_resolvers/anotherfile.resolver';
import { AutoNumberResolver } from './_resolvers/autoNumber.resolver';
import { CustomersFileResolver } from './_resolvers/customers.resolver';
import { NumberResolver } from './_resolvers/number.resolver';
import { OldStatmentResolver } from './_resolvers/oldstatment.resolver';
import { PayResolver } from './_resolvers/pay.resolver';
import { ResomResolver } from './_resolvers/resom.resolver';
import { SearchByCivilIdResolver } from './_resolvers/searchByCivilId.resolver';
import { StatetmentSecResolver } from './_resolvers/statetmentSec.resolver';
import { StatmentResolver } from './_resolvers/statment.resolver';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'update', component: UpdateUserComponent },
  { path: 'profile', component: MyprofileComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'register', component: RegisterComponent },

      {
        path: 'calls', component: MaincallcenterComponent,
        resolve: {
          statment: StatmentResolver, pay: PayResolver,
          numberPhone: NumberResolver, oldStatment: OldStatmentResolver,
          anotherFile: AnotherFileResolver, searchByCivilId: SearchByCivilIdResolver,
          secStatment: StatetmentSecResolver, customers: CustomersFileResolver,
          autonumber: AutoNumberResolver, resom: ResomResolver
        }
      },
      { path: 'showPdf', component: ShowPdfComponent },
    ],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];
