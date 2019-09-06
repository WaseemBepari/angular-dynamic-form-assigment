import { Injectable } from '@angular/core';
import {Validators } from '@angular/forms';
import { SchemaService } from './schema.service';

const _validationMessages = {
  'required' : 'field name is required',
  'min' : '$$ characters minumum',
  'max' : '$$ characters maximum',
}

const errorsKeyMap = new Map();
errorsKeyMap.set('max','maxlength')
errorsKeyMap.set('min','minlength')

@Injectable({
  providedIn : 'root'
})
export class ValidationHelperService {

  constructor(
    private sch: SchemaService
  ) {
  }

   getValidators(formInput, elementName) {
    let validators = [];
    if (formInput.min) {
      validators.push(Validators.minLength(formInput.min));
    }
    if (formInput.max) {
      validators.push(Validators.maxLength(formInput.max));
    }
    if (this.isRequired(elementName)) {
      validators.push(Validators.required);
    }
    if (formInput.pattern) {
      validators.push(Validators.pattern(formInput.pattern));
    }
    return validators;
  }

  getValidationMessages(formInput) {
   let messages = {};
    Object.keys(formInput).forEach((key)=> {
      if(_validationMessages[key]){
        messages[this.getErrorKeys(key)] = this.createValidationMeessage( _validationMessages[key],formInput[key]);
      }
      if( key === 'validationMessage') {
        messages.required = formInput[key] || _validationMessages.required
      }
    })
    return messages;
  }

  getErrorKeys(key) {
    return errorsKeyMap.get(key) || key;
  }
  createValidationMeessage(message,requiredValue) {
    return message.replace('$$',requiredValue);
  }

  isRequired(elementName) {
    return this.sch.isRequired(elementName);
  }

}