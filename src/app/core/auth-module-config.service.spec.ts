import { TestBed } from '@angular/core/testing';

import { AuthModuleConfigService } from './auth-module-config.service';

describe('AuthModuleConfigService', () => {
  let service: AuthModuleConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthModuleConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
