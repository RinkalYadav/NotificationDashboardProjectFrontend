import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { NavigationExtras, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { NotificationlistsService } from '../services/notificationlists.service';
import {WebsocketService } from '../services/websocket.service';


@Component({
  selector: 'app-create-notification',
  standalone: true, 
  imports: [CommonModule,FormsModule, RouterOutlet],
  templateUrl: './create-notification.component.html',
  styleUrl: './create-notification.component.css'
})
export class CreateNotificationComponent implements OnInit {
  notifymsg: string ='';
  selectedCategory: string ='';
  isSubmitted: boolean = false;

  constructor(private router: Router, private notificationlistsService: NotificationlistsService, private websocketService: WebsocketService) {}

  ngOnInit(): void {
  
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.notifymsg && this.selectedCategory) {
        const payloadData = {
          message: this.notifymsg,
          category: this.selectedCategory
        }  
      this.notificationlistsService.submitNotification(payloadData).subscribe((data: any) => {
        console.log(data);
       this.router.navigate(['/notification-list']);
      }, (error: any) => {
        console.log(error);
      })
      
      }
    else {
      console.error("Notification message or category is missing!");
    }
  }

}
