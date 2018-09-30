import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './admin/list/list.component';
import { NewProductComponent } from './admin/new-product/new-product.component';
import { ViewProductComponent } from './admin/view-product/view-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { SearchComponent } from './search/search.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: ListComponent },
  { path: 'product/view/:id', component: ViewProductComponent },
  { path: 'product/create', component: NewProductComponent },
  { path: 'product/edit/:id', component: EditProductComponent },
  { path: 'search', component: SearchComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
