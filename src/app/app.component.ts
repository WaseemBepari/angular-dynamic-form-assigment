import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchemaService } from './services/schema.service';
import { ValidationHelperService } from './services/validation-helper.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  myForm: FormGroup;

  CommentArray: {
    id: string;
    title: string;
    type: string;
    options: string;
    validationMessages: object;
  }[];
  constructor(
    private fb: FormBuilder,
    private vh: ValidationHelperService,
    private sch: SchemaService
  ) {
  }

  ngOnInit() {
    this.CommentArray = [];
    this.myForm = this.fb.group(this.buildFormGroup());
  }

  buildFormGroup() {
    let formGroup = {};
    let forms = this.sch.getAllFormsElements();
    for (let key in forms) {
      this.CommentArray.push({
        id: key,
        title: forms[key].title,
        type: this.getTypeOfInput(forms[key].type,forms[key]),
        options: forms[key].enum,
        validationMessages : this.vh.getValidationMessages(forms[key])
      })
      formGroup[key] = ['', this.vh.getValidators(forms[key], key)]
    }

    return formGroup
  }

  getErrorMessage(errorsMessages,error){
    return errorsMessages[Object.keys(error)[0]];
  }


  isRequired(elementName) {
    return this.sch.isRequired(elementName);
  }

  getTypeOfInput(type,control) {
    var inputTypes = new Map();
    inputTypes.set('string', 'text');
    inputTypes.set('datetime', 'date');
    inputTypes.set('longstring', 'textarea');
    inputTypes.set('enum', 'select');
    if(type == 'string'){
      return (control.max >= 64) ? inputTypes.get('longstring') : inputTypes.get('string');
    }
    return inputTypes.get(type) || inputTypes.get('string');
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }
}
