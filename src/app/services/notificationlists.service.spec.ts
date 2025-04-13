import { TestBed } from '@angular/core/testing';

import { NotificationlistsService } from './notificationlists.service';

describe('NotificationlistsService', () => {
  let service: NotificationlistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationlistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
