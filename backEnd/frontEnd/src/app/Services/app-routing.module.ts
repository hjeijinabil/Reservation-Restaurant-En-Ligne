import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../Components/sign-in/sign-in.component';
import { SignUpComponent } from '../Components/sign-up/sign-up.component';
import { DasboardComponent } from '../Components/dasboard/dasboard.component';
import { ConfirmMailComponent } from '../Components/confirm-mail/confirm-mail.component';
import { ResetPasswordComponent } from '../Components/reset-password/reset-password.component';
import { UserProfileComponent } from '../Components/user-profile/user-profile.component';
import { UserPrivacySettingComponent } from '../Components/user-privacy-setting/user-privacy-setting.component';
import { AddUserComponent } from '../Components/add-user/add-user.component';
import { ListUserComponent } from '../Components/list-user/list-user.component';
import { LoadingComponent } from '../Components/loading/loading.component';
import { LogoComponent } from '../Components/logo/logo.component';
import { SidebarComponent } from '../Components/sidebar/sidebar.component';
import { DasboarddComponent } from '../Components/dasboardd/dasboardd.component';
import { ListProductComponent } from '../Components/list-product/list-product.component';
import { AddProductComponent } from '../Components/add-product/add-product.component';
import { UpdateUserComponent } from '../Components/update-user/update-user.component';
import { UpdateProductComponent } from '../Components/update-product/update-product.component';
import { ListCommandesComponent } from '../Components/list-commandes/list-commandes.component';
import { HeaderComponent } from '../Components/header/header.component';
import { SlidesComponent } from '../Components/slides/slides.component';
import { MenuComponent } from '../Components/menu/menu.component';
import { CategoryComponent } from '../Components/category/category.component';
import { HeaderrComponent } from '../Components/headerr/headerr.component';

const routes: Routes = [
  {path:"login", component:SignInComponent},
  {path:"registre", component:SignUpComponent},
  {path:"admin", component:DasboardComponent},
  {path:"confirm-mail", component:ConfirmMailComponent},
  {path:"reset password", component:ResetPasswordComponent},
  {path:"user-profile", component:UserProfileComponent},
  {path:"user-privacy-setting", component:UserPrivacySettingComponent},
  {path:"add-user", component:AddUserComponent},
  {path:"list-user", component:ListUserComponent},
  {path:"loading", component:LoadingComponent},
  {path:"logo", component:LogoComponent},
  {path:"sidebar", component:SidebarComponent},
  {path:"dashboard" , component:DasboarddComponent},
  {path:"list-product" , component:ListProductComponent},
  {path:"add-product", component:AddProductComponent},
  {path:'update-user/:id', component:UpdateUserComponent},
  {path:'update-product/:id', component:UpdateProductComponent},
  {path:"list-commande", component: ListCommandesComponent},
  {path:"header", component : HeaderComponent},
  {path:"slides", component:SlidesComponent},
  {path:"menu", component:MenuComponent},
  {path:"galeroy", component:CategoryComponent},
  {path:"headerr", component:HeaderrComponent},
  {path:""  , component:HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
