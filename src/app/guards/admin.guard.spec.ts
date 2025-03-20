import { TestBed } from "@angular/core/testing";
import { AdminGuard } from "./admin.guard";

describe('AdminGuard', () => {
  let adminGuard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    adminGuard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(adminGuard).toBeTruthy();
  });
});
