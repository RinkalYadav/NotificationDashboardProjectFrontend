import { Injectable, OnDestroy } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  private stompClient: Client;
  public notificationSubject = new Subject<any>();
  private destroy$ = new Subject<void>();
  
  public notifications$ = this.notificationSubject.asObservable();

  constructor() {
    this.stompClient = new Client({
      brokerURL: '',
      webSocketFactory: () => new SockJS('https://notificationdashboardbackend.onrender.com/ws'),
      reconnectDelay: 5000,
      debug: (str) => console.log('[WebSocket]', str),
    });

    this.setupConnectionHandlers();
    this.stompClient.activate();
  }

  private setupConnectionHandlers(): void {
    this.stompClient.onConnect = (frame) => {
      console.log('[WebSocket] Connected:', frame);
      
      this.stompClient.subscribe('/topic/notifications', (message: IMessage) => {
        try {
          debugger;
          const parsed = JSON.parse(message.body);
          this.notificationSubject.next(parsed);
        } catch (e) {
          console.error('[WebSocket] Message parse error:', e);
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('[WebSocket] Error:', frame.headers['message'], frame.body);
    };

    this.stompClient.onWebSocketClose = () => {
      console.warn('[WebSocket] Connection closed');
    };
  }

  sendMessage(message: any): void {
    if (!this.stompClient.connected) {
      console.warn('[WebSocket] Not connected, message not sent');
      return;
    }

    this.stompClient.publish({
      destination: '/app/send',
      body: JSON.stringify({
        ...message,
        timestamp: new Date().toISOString() // Ensure timestamp
      }),
      headers: { 'content-type': 'application/json' }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // this.disconnect();
  }

  disconnect(): void {
    if (this.stompClient.active) {
      this.stompClient.deactivate().then(() => {
        console.log('[WebSocket] Disconnected');
      });
    }
  }
}