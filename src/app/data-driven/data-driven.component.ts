import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";


@Component({
    moduleId: module.id,
    selector: 'data-driven',
    templateUrl: 'data-driven.component.html',
    styles: [
         `
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}
`

        ]
})
export class DataDrivenComponent {
    myForm: FormGroup;

    constructor(){
        let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.myForm = new FormGroup({
            'username' : new FormControl('Max', Validators.required),
            'email' : new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEXP)]),
            'password': new FormControl('', Validators.required)
        });
    }

    onSubmit(){

    console.log(this.myForm);


    }


}
