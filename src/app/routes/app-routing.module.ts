import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/page/home/home.component';
import { ProfileComponent } from '../components/user/profile/profile.component';
import { ProfileEditComponent } from '../components/user/profile-edit/profile-edit.component';
import { ListPublicationsComponent } from '../components/admin/list-publications/list-publications.component';
import { UsersComponent } from '../components/admin/users/users.component';
import { Page404Component } from '../components/page/page404/page404.component';
import { NoticeOfPrivacyComponent } from '../components/page/notice-of-privacy/notice-of-privacy.component';
import { DetailPublicactionComponent } from '../components/page/detail-publicaction/detail-publicaction.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'mis-publicaciones/:id', component: ProfileComponent },
  { path: 'ver-publicacion/:id', component: DetailPublicactionComponent },
  // { path: 'buscar'},
  { path: 'politicas-de-privacidad', component: NoticeOfPrivacyComponent },
  { path: 'user/perfil/:id', component: ProfileComponent },
  { path: 'user/editar-perfil/:id', component: ProfileEditComponent },
  { path: 'admin/lista-publicaciones', component: ListPublicationsComponent },
  { path: 'admin/usuarios', component: UsersComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
