import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInviteModalComponent } from './user-invite-modal.component';

describe('UserInviteModalComponent', () => {
  let component: UserInviteModalComponent;
  let fixture: ComponentFixture<UserInviteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInviteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInviteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
