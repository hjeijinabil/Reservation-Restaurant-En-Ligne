import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { DasboardComponent } from './Components/dasboard/dasboard.component';
import { ConfirmMailComponent } from './Components/confirm-mail/confirm-mail.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { ListUserComponent } from './Components/list-user/list-user.component';
import { UserPrivacySettingComponent } from './Components/user-privacy-setting/user-privacy-setting.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { LogoComponent } from './Components/logo/logo.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { DasboarddComponent } from './Components/dasboardd/dasboardd.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { ListProductComponent } from './Components/list-product/list-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { UpdateUserComponent } from './Components/update-user/update-user.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { ListCommandesComponent } from './Components/list-commandes/list-commandes.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Components/header/header.component';
import { SlidesComponent } from './Components/slides/slides.component';
import { MenuComponent } from './Components/menu/menu.component';
import { CategoryComponent } from './Components/category/category.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { HeaderrComponent } from './Components/headerr/headerr.component';
import { FooterComponent } from './Components/footer/footer.component';
import { OrderConfirmationModalComponent } from './Components/order-confirmation-modal/order-confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DasboardComponent,
    ConfirmMailComponent,
    ResetPasswordComponent,
    AddUserComponent,
    ListUserComponent,
    UserPrivacySettingComponent,
    UserProfileComponent,
    LoadingComponent,
    LogoComponent,
    SidebarComponent,
    DasboarddComponent,
    AddProductComponent,
    ListProductComponent,
    UpdateUserComponent,
    UpdateProductComponent,
    ListCommandesComponent,
    HeaderComponent,
    SlidesComponent,
    MenuComponent,
    CategoryComponent,
    CategoriesComponent,
    HeaderrComponent,
    FooterComponent,
    OrderConfirmationModalComponent
 
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule,
    
    TranslateModule.forRoot(
      {
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }
    ),
    BrowserAnimationsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
