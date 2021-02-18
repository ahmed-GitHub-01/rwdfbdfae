import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LoginComponent } from './login/login/login.component';
import { appRoutes } from './routes';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './body/home/home.component';
import { RegisterComponent } from './login/register/register.component';
import { MyprofileComponent } from './body/myprofile/myprofile.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MaincallcenterComponent } from './body/CallCenter/maincallcenter/maincallcenter.component';
import { StatmentResolver } from './_resolvers/statment.resolver';
import { PayResolver } from './_resolvers/pay.resolver';
import { NumberResolver } from './_resolvers/number.resolver';
import { OldStatmentResolver } from './_resolvers/oldstatment.resolver';
import { AnotherFileResolver } from './_resolvers/anotherfile.resolver';
import { MapSetting, SmallDataService } from './_services/smallData.service';
import { SearchByCivilIdResolver } from './_resolvers/searchByCivilId.resolver';
import { StatetmentSecResolver } from './_resolvers/statetmentSec.resolver';
import { CustomersFileResolver } from './_resolvers/customers.resolver';
import { AutoNumberResolver } from './_resolvers/autoNumber.resolver';
import { ResomResolver } from './_resolvers/resom.resolver';
// import { DevExtremeModule } from 'devextreme-angular';
import { DevExtremeModule } from 'devextreme-angular';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UpdateUserComponent } from './login/updateUser/updateUser.component';
import { MatDialogModule } from '@angular/material/dialog';
// tslint:disable-next-line:typedef
export function tokenGetterr() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MyprofileComponent,
    MaincallcenterComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BsDatepickerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetterr,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/auth']
      }
    }
    ),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    DevExtremeModule,
    // PdfViewerModule,
    MatDialogModule
  ],
  providers: [AuthService, SmallDataService, MapSetting,
    ErrorInterceptorProvider,
    StatmentResolver,
    PayResolver,
    NumberResolver,
    OldStatmentResolver,
    AnotherFileResolver,
    SearchByCivilIdResolver,
    OldStatmentResolver,
    CustomersFileResolver,
    AutoNumberResolver, ResomResolver,
    StatetmentSecResolver,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
