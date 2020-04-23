import { TestBed } from '@angular/core/testing';

import { TypeRoleService } from './type-role.service';

describe('TypeRoleService', () => {
  let service: TypeRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
