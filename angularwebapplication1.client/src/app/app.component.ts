import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface Product {
  id: number
  name: string;
  price: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public products: Product[] = [];
  public apiUrl: string = 'https://localhost:7100/api/Product'; //how to get this
  isShowSaveBtn = false;
  isShowUpdateBtn = false;
  personForm = new FormGroup({
    name: new FormControl('APP '),
    email: new FormControl('app@gmail.com')
  });
    //form: FormGroup<{ name: FormControl<string | null>; email: FormControl<string | null>; }>;
  constructor(private http: HttpClient) {    
}

  ngOnInit() {
    this.getproducts();
    this.personForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('')
    });
  }
  getproducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      (result) => {
        this.products = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  displayStyle = "none";
  /**
   * onSubmit(form)
   */
  onSubmit() {
    console.log('Form Submitted!', this.personForm.value);
    alert("Reactive form active");
  }
  openPopup() {
    this.displayStyle = "block";
    this.isShowSaveBtn = true;
    this.isShowUpdateBtn = false;
    (document.getElementById("ProductModalLabel") as HTMLInputElement).innerHTML = "Save Product";
  }
  openPopupUpdate() {
    this.displayStyle = "block";
    this.isShowSaveBtn = false;
    this.isShowUpdateBtn = true;
    (document.getElementById("ProductModalLabel") as HTMLInputElement).innerHTML = "Update Product";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  getProduct(val: any) {
    this.isShowSaveBtn = false;
    this.isShowUpdateBtn = true;
    this.http.get<Product>(this.apiUrl + '/' + val).subscribe(
      (result) => {
        (document.getElementById("ProductId") as HTMLInputElement).value = result.id.toString();
        (document.getElementById("ProductName") as HTMLInputElement).value = result.name;
        (document.getElementById("Price") as HTMLInputElement).value = result.price.toString();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateProduct() {
    let Product = {
      id: (document.getElementById("ProductId") as HTMLInputElement).value,
      name: (document.getElementById("ProductName") as HTMLInputElement).value,
      price: (document.getElementById("Price") as HTMLInputElement).value
    }
    return this.http.put(this.apiUrl, Product).subscribe(response => {
      if (response) {
        alert("Product is Updated");
      }
      else {
        alert("Product is not updated");
      }
    });
  }

  deleteProduct(val: any) {
    return this.http.delete(this.apiUrl + '/' + val).subscribe(response => {
      if (response) {
        alert("Product is deleted");
      }
      else {
        alert("Product is not deleted");
      }
    });
  }

  createProduct() {
    let Product = {
      name: (document.getElementById("ProductName") as HTMLInputElement).value,
      price: (document.getElementById("Price") as HTMLInputElement).value
    }

    this.http.post(this.apiUrl, Product)
      .subscribe(response => {
        if (response) {
          alert("Product is Saved");
        }
        else {
          alert("Product is not saved");
        }
      });
  }

  title = 'angularapplication.client';
}
