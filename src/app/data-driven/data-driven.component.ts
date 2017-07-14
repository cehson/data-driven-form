import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray, FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";


@Component({
    moduleId: module.id,
    selector: 'data-driven',
    templateUrl: 'data-driven.component.html',
    styles: [
         `
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}

input.ng-invalid  {
  border-left: 5px solid #a94442; /* red */
}
`

        ]
})
export class DataDrivenComponent {
    myForm: FormGroup;

    constructor(private formBuilder: FormBuilder){
        //
        // this.myForm = new FormGroup({
        //
        // });
        let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.myForm = formBuilder.group(
            {
                'username' : ['', [Validators.required, this.exampleValidator]],
                'email' : ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
                'password': ['', [Validators.required, Validators.minLength(3)]],
                'pero': formBuilder.array([
                    ['', Validators.required, this.asyncExampleValidator]
                ])
            });
    }
    get hobbies() { return this.myForm.get('pero') as FormArray; }
    addNewHobbie(){
        this.hobbies.push(new FormControl('', Validators.required, this.asyncExampleValidator));
    }
    onSubmit(){
    console.log(this.myForm);
    }


    // CUSTOM VALIDATOR

        exampleValidator(control: FormControl):{
        [s: string]: boolean
        }{
        if(control.value === "Example"){ // ako je control.value jednak "Example" onda vraća
            return {example: true};      // objekt. Ovdje validacija PADA ! Mozemo vratiti i false svejedno je imamo li false ili true
        }
        else { return null }             // Kako bi validacija PROSLA objekt mora vratiti NULL !
        }


        // ASINKRONI VALIDATOR

        /* NPR. Provjera jeli neki username zauzet, te se stoga moramo spojiti na neki backend server kako bi to provjerili. Response NECE BIT instant !
         *  - Asinkroni validator mozemo dodati kao treci argument na "new FormControl() konstruktor"
          *
          * */

        asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
            const promise = new Promise<any>(
                (resolve, reject) => {
                    setTimeout(() => {
                        if(control.value === 'Example') {
                          resolve({'invalid': true});
                        } else{
                           resolve(null);
                        }
                    }, 1500);
                 }
            );
            return promise;
        }
}
