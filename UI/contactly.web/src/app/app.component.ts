import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,AsyncPipe,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  http = inject(HttpClient);
  contactsform = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(null),
    phoneNumber:new FormControl<string>(''),
    favorite:new FormControl<boolean>(false)
  });
  contacts$ = this.getContacts(); 

  onFormSubmit(){
    const contactRequest={
      name:this.contactsform.value.name,
      email:this.contactsform.value.email,
      phoneNumber:this.contactsform.value.phoneNumber,
      favorite:this.contactsform.value.favorite
    }
    return this.http.post("https://localhost:7209/api/Contacts",contactRequest)
    .subscribe({
      next:(value)=>{
        console.log(value);
        this.contacts$ = this.getContacts();   
        this.contactsform.reset();      
      }
    });
  }

  onDelete(id:string){
    this.http.delete(`https://localhost:7209/api/Contacts/${id}`)
    .subscribe({
      next: (value)=>{
        alert('Item Deleted')
        this.contacts$ = this.getContacts();   
      }
    })
  }

  private getContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>("https://localhost:7209/api/Contacts")
  }
}


