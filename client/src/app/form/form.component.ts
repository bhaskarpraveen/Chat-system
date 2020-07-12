import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute) { }

  handleFormSubmit(username,room){
    this.router.navigate(['/chat',username,room]);
  }
  ngOnInit() {
  }

}
