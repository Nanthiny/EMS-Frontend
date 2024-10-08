import {  Directive} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
export enum State {
  CREATE = 0,
  EDIT = 1,
}
@Directive({})
export abstract class FormTemplate{
    form:FormGroup;
   formData:any;
       constructor(
        protected fb:FormBuilder,protected toastr: ToastrService,protected spinner: NgxSpinnerService){
    }
    showSuccess(msg:string) {
      this.toastr.success(msg, 'Success');
    }

    showError(msg:string) {
      this.toastr.error(msg, 'Error');
    }
  showSpinner(){
    this.spinner.show()
  }
  hideSpinner(){
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
    get valid(){
        return this.form?.valid;
    }
    get data(){
        return this.form?.value;
    }
    get controls() {
        return this.form.controls;
    }
    formatDate(date){
      return moment(date).format('YYYY-MM-DD'); // or any format you prefer

    }
    validateNum(event) {
        const events = ['Backspace','Delete','Home','End','Insert','ArrowUp','ArrowRight','ArrowDown','ArrowLeft','.'];
        const num = Number(event.key);

        if(isNaN(num) && !events.find(x=> x == event.key))
          event.preventDefault();
    }
    evaluateInputWarning(controlName: string): any {
        return {
            'border border-danger': (
            this.controls[controlName]?.invalid &&
            (this.controls[controlName]?.dirty || this.controls[controlName].touched)
            )
        }
    }
  //   get showError(): boolean {
  //     let ret = false;
  //     for(let i=0 ; i < Object.keys(this.form.controls).length ; i++) {
  //       const con = Object.values(this.form.controls)[i];
  //       if (!con.valid && con.dirty)
  //         return true;
  //     }
  //     return ret;
  // }
    charLimitClass(value, limit){
        return value > limit ? 'text-danger' : '';
    }
  //   abstract castToObject(values:any);
  //   initForm(def:any,formData?:any,extra?:any){
  //     this.form = this.fb.group({},extra);
  //     let keys = Object.keys(def);
  //     keys.forEach(key => {
  //         this.form.addControl(key,new FormControl(
  //             formData && formData[key] ? formData[key] : '',def[key]));
  //     });
  //     this.cd.detectChanges();
  // }
  // setFormData(data){
  //     let keys = Object.keys(data);
  //     keys.forEach(key => {
  //         if (this.form.controls[key])
  //             this.form.controls[key].setValue(data[key]);
  //     });
  // }

  // getValueListener(key){
  //     if (this.form.controls[key])
  //         return this.form.controls[key].valueChanges;
  //     else
  //         throw new Error(`No FormControl exists with key:${key}`);
  // }

}
