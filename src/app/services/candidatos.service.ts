import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Candidato } from "../components/model/candidato.model";
import { Curriculo } from "../components/model/curriculo.model";

@Injectable({
    providedIn: 'root'
})

export class CandidatosService{
    constructor(private http: HttpClient){}

    private urlBackEnd = "https://localhost:44353/api/candidatos";

    getCandidatos():Observable<any>{
        return this.http.get(this.urlBackEnd);
    }

    setCandidatos(candidato:Candidato):Observable<any>{
        return this.http.post(this.urlBackEnd, candidato);
    }

    downloadCurriculo(curriculo:Curriculo):Observable<any>{
        return this.http.post("https://localhost:44353/download", curriculo);
    }
}