import { Routes } from '@angular/router';
import { CreateNotificationComponent } from './create-notification/create-notification.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { FileNotFoundComponent } from './file-not-found/file-not-found.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
    {path: '',component:AppComponent},
    {path: 'creat-notification',component:CreateNotificationComponent},
    {path: 'notification-list',component:NotificationListComponent},
    {path: '**',component:FileNotFoundComponent}
];
