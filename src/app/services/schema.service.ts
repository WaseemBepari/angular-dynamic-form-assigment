import { Injectable } from '@angular/core';
const schema = {
   "schema":{
      "type":"object",
      "title":"Comment",
      "properties":{
         "name":{
            "title":"Name",
            "type":"string",
            "min":3,
            "max":10,
            "validationMessage":"We greet by first name"
         },
         "gender":{
            "type":"enum",
            "title":"Gender",
            "enum":[
               "male",
               "female"
            ]
         },
         "email":{
            "title":"Email",
            "type":"email",
            "pattern":"^\\S+@\\S+$",
            "description":"",
            "validationMessage":"Invalid Email address"
         },
         "date":{
            "title":"Date",
            "description":"",
            "type":"datetime"
         },
         "comment":{
            "title":"Comment",
            "type":"string",
            "max":256,
            "validationMessage":""
         }
      },
      "required":[
         "name",
         "email",
         "date",
         "comment"
      ]
   },
   "form":[
      {
         "type":"section",
         "htmlClass":"row",
         "items":[
            {
               "type":"section",
               "htmlClass":"col-xs-6",
               "items":[
                  "name"
               ]
            },
            {
               "type":"section",
               "htmlClass":"col-xs-6",
               "items":[
                  "email"
               ]
            }
         ]
      },
      {
         "type":"submit",
         "style":"btn btn-primary",
         "title":"Submit"
      }
   ]
}
@Injectable({
  providedIn:'root'
})
export class SchemaService {

  constructor() { }
  getAllFormsElements() {
    return schema.schema.properties;
  }
  isRequired(elementName){
    return schema.schema.required.indexOf(elementName) > -1 ? true:false;
  }
  getFormLayout() {
    return schema.form;
  }
}