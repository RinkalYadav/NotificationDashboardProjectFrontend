import { RouterModule, Routes } from '@angular/router';
import { CreateNotificationComponent } from './create-notification/create-notification.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { FileNotFoundComponent } from './file-not-found/file-not-found.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    {path: '',component:AppComponent},
    {path: 'create-notification',component:CreateNotificationComponent},
    {path: 'notification-list',component:NotificationListComponent},
    {path: '**',component:FileNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],  // enable hash-based routing here
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
