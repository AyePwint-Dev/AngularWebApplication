import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve products from the server', () => {
    const mockProductData = [
      {
        id: 1,
        name: "iPhone 15 Pro",
        price: 1399.00
      }
    ];

    component.ngOnInit();

    const req = httpMock.expectOne('https://localhost:7100/api/Product');
    expect(req.request.method).toEqual('GET');
    req.flush(mockProductData);

    expect(component.products).toEqual(mockProductData);
  });
});
