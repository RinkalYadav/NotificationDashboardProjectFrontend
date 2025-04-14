import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationlistsService } from '../services/notificationlists.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../services/websocket.service';
import { ChangeDetectorRef } from '@angular/core';
import { delay, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css',
})
export class NotificationListComponent implements OnInit, OnDestroy {
  message: string = '';
  category: string = '';
  listNotification: any = [];
  isclicked: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private notificationlistsService: NotificationlistsService,
    private datePipe: DatePipe,
    private websocketService: WebsocketService
  ) {}

  ngOnInit() {
    this.loadInitialNotifications();
    this.websocketService.notificationSubject.subscribe((newNotification: any) => {
      if (newNotification.type === 'DELETE') {
        // Remove the notification from the list on delete
        this.listNotification = this.listNotification.filter((n: any) => n.srno !== newNotification.srno);
      } else if (newNotification.type === 'UPDATE') {
        // Update the specific notification
        this.listNotification = this.listNotification.map((n: any) =>
          n.srno === newNotification.srno ? newNotification : n
        );
      } else {
        // Default: Add new notification at the top
        this.listNotification = [newNotification, ...this.listNotification];
      }
    });
  }

  private loadInitialNotifications() {
    this.notificationlistsService.users().subscribe(
      (data: any) => {
        console.log('[HTTP] Notifications:', data);
        this.listNotification = data;
        this.listNotification.sort((a:any, b: any) =>  b.srno - a.srno);
      },
      (error) => {
        console.error('[HTTP] Error:', error);
      }
    );
  }


  updateNotification(data: any) {
    if (this.isclicked) {
      this.notificationlistsService.updateNotification(data).subscribe(
        (response) => {
          console.log('Notification updated:', response);
          this.listNotification = response;
          this.listNotification.sort((a:any, b: any) =>  b.srno - a.srno);
        },
        (error) => {
          console.error('Update failed:', error);
        }
      );
    }
    this.isclicked = !this.isclicked;
  }

  deleteNotification(srno: number) {
    if (confirm('Are you sure you want to delete this notification?')) {
      this.notificationlistsService.deleteNotification(srno).subscribe(
        (response) => {
          console.log('Deleted:', response);
          this.refreshNotifications();
        },
        (error) => {
          console.error('Delete failed:', error);
        }
      );
    }
  }

  refreshNotifications() {
    this.notificationlistsService.users().subscribe(
      (data: any) => {
        this.listNotification = data;
      },
      (error) => {
        console.error('Refresh failed:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // this.websocketService.disconnect();
  }
}