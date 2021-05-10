import { Component, Renderer2, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SelectInterface } from "../app/interfaces/select.interface";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  public sentencias: string[] = ['Select', 'Insert', 'Update', 'Delete'];
  public sentencia: string = "Seleccionar   ";
  public secciones: number = 0;

  public selects: FormGroup[] = [];
  public selectForm: FormGroup;
  public insertForm: FormGroup;
  public deleteForm: FormGroup;
  public updateForm: FormGroup;
  public selctIndice = 0;

  public resultado="";

  constructor(private formBuilder: FormBuilder) {

  }
  ngOnInit() {

    this.selectForm = new FormGroup({
      ["Columnas" + this.selctIndice]: new FormControl("", [Validators.required]),
      ["Tabla" + this.selctIndice]: new FormControl("", [Validators.required])
    });
    this.selects.push(this.selectForm);

    this.insertForm = new FormGroup({
      ["Columnas"]: new FormControl("", [Validators.required]),
      ["Tabla"]: new FormControl("", [Validators.required])
    });

    this.deleteForm = new FormGroup({
      ["Columnas"]: new FormControl("", [Validators.required]),
      ["Tabla"]: new FormControl("", [Validators.required])
    });

    this.updateForm = new FormGroup({
      ["Columnas"]: new FormControl("", [Validators.required]),
      ["Tabla"]: new FormControl("", [Validators.required])
    });
  }


  addElementSelect() {
    this.selctIndice++;
    this.selectForm = new FormGroup({
      ["Columnas" + this.selctIndice]: new FormControl("", [Validators.required]),
      ["Tabla" + this.selctIndice]: new FormControl("", [Validators.required])
    });
    this.selects.push(this.selectForm);
  }

  deleteElementSelect(index: number) {
    this.selects.splice(index, 1);
    this.selctIndice--;
  }

  onClick(index){

    if(this.selects[index].value["Columnas" + index] != this.selectForm.value["Columnas" + index] ||
    this.selects[index].value["Tabla" + index] != this.selectForm.value["Tabla" + index]){
      if(this.selects[index].value["Columnas" + index] !="" || this.selects[index].value["Tabla" + index] !=""){
        this.selectForm = this.formBuilder.group({
          ["Columnas" + index]: new FormControl(this.selects[index].value["Columnas" + index], [Validators.required]),
          ["Tabla" + index]: new FormControl(this.selects[index].value["Tabla" + index], [Validators.required])
        });
        this.selects[index] = this.selectForm;
      }
    }
  }

  onChange(index) {

    if(this.selects[index].value["Columnas" + index] !="" || this.selects[index].value["Tabla" + index] !="")
      this.selectForm = this.formBuilder.group({
        ["Columnas" + index]: new FormControl(this.selects[index].value["Columnas" + index], [Validators.required]),
        ["Tabla" + index]: new FormControl(this.selects[index].value["Tabla" + index], [Validators.required])
      });

    this.selects[index] = this.selectForm;
  }


  onSubmit() {  
    if(this.secciones == 1){

      this.resultado = "Select "
      this.selects.forEach((select,index)=>{

        if(this.selects.length == 1){
          this.resultado= this.resultado + select.value['Columnas'+index]+'\n';
        }
        if(this.selects.length >= 1 && index < this.selects.length-1){
          this.resultado= this.resultado + select.value['Columnas'+index]+',';
        }
        if(this.selects.length > 1 && index == this.selects.length-1){
          this.resultado= this.resultado + select.value['Columnas'+index]+'\n';
        }

      });
      this.resultado= this.resultado + 'From ';
      this.selects.forEach((select,index)=>{
        if(this.selects.length == 1){
          this.resultado= this.resultado + select.value['Tabla'+index]+';';
        }
        if(this.selects.length >= 1 && index < this.selects.length-1){
          this.resultado= this.resultado + select.value['Tabla'+index]+',';
        }
        if(this.selects.length > 1 && index == this.selects.length-1){
          this.resultado= this.resultado + select.value['Tabla'+index]+';';
        }
      });
    }
    if(this.secciones == 2){
      this.resultado = "Insert Into "+ this.insertForm.value['Tabla']+"("+this.insertForm.value['Columnas']+") Values ("+this.insertForm.value['Columnas']+");" 
    }
  
    if(this.secciones == 3){
      this.resultado = "Update "+ this.updateForm.value['Tabla']+" Set "+this.updateForm.value['Columnas']+" = "+this.updateForm.value['Columnas']; 
    }

    if(this.secciones == 4){
      this.resultado = "Insert Into "+ this.insertForm.value['Tabla']+"("+this.insertForm.value['Columnas']+") Values ("+this.insertForm.value['Columnas']+");" 
    }

  }

}
