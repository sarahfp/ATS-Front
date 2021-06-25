import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CandidatosService{
    constructor(private http: HttpClient){}

    private urlBackEnd = "https://localhost:44353/download";

    downloadCurriculo():Observable<any>{
        return this.http.post(this.urlBackEnd,"");
    }
}