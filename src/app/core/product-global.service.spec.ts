import { TestBed } from '@angular/core/testing';

import { ProductGlobalService } from './product-global.service';

describe('ProductGlobalService', () => {
  let service: ProductGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
