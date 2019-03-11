/**
Copyright (C) 2019 MD. Ibrahim Khan

Project Name: Hyperledger Burrow Test Application
Author: MD. Ibrahim Khan
Author's Email: ib.arshad777@gmail.com

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this
   list of conditions and the following disclaimer in the documentation and/or
   other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of the contributors may
   be used to endorse or promote products derived from this software without
   specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTIONS) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
OF THE POSSIBILITY OF SUCH DAMAGE.
**/

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FunctionInfo, ReturnData, ReturnResult, StringStorage } from './interfaces'
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  errMessage: string;
  errMessage2: string;
  returnedData: ReturnData;

  inputStorage: StringStorage = {dob:"",email:"",id:"",name:"",phone:""};
  outputStorage: StringStorage;

  constructor(private httpClient: HttpClient) {}

  storeData(): void {
    this.errMessage = "";
    if(
      this.inputStorage.name != "" &&
      this.inputStorage.id != "" &&
      this.inputStorage.dob != "" &&
      this.inputStorage.email != "" &&
      this.inputStorage.phone != ""
    ) {
      let funcInfo: FunctionInfo = {
        name:"setString",
        param: JSON.stringify(this.inputStorage)
      };
      let url: string = "http://localhost:3000/?data=" + encodeURIComponent(btoa(JSON.stringify(funcInfo)));
      this.httpClient.get(url).subscribe(
        (value) => {
          this.errMessage = "Value stored successfully";
        }, (err) => {
          this.errMessage = "Error storing value !";
          console.log(err);
        }
      );
    } else {
      this.errMessage = "Fields can not be empty !";
    }
  }

  getData(): void {
    let funcInfo: FunctionInfo = {name:"getString"};
    let url: string = "http://localhost:3000/?data=" + encodeURIComponent(btoa(JSON.stringify(funcInfo)));
    this.httpClient.get<ReturnResult>(url).subscribe(
      (value) => {
        this.outputStorage = JSON.parse(<string>value.result.data);
        this.outputStorage.hash = value.result.hash;
      }, (err) => {
        this.errMessage2 = "Connectivity Error !";
        console.log(err);
      }
    );
  }

  processResult(result: ReturnResult, type: string) {
    if(result.status) {
      this.returnedData = {hash: result.result.hash,type: type};
      if(result.result.data) {
        this.returnedData.value = result.result.data;
      }
    } else {
      if(result.err) {
        this.errMessage2 = result.err;
      }
    }
  }

  test(param:any): void {
    console.log(param);
  }
}
