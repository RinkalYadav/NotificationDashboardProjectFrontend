import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NotificationlistsService {
  url = "https://notificationdashboardbackend.onrender.com/notification";
  constructor(private http:HttpClient) { }

  users(){
    return this.http.get(this.url);
  }

  submitNotification(payload: any){
    return this.http.post(this.url, payload)
  }

  updateNotification(data: any) {
    const srno = data.srno;
  const updatedData = { ...data, isUpdated: true };
    return this.http.put(`${this.url}/${srno}`, updatedData);
  }

  deleteNotification(srno: number) {
    return this.http.delete(`${this.url}/${srno}`);
  }
}
