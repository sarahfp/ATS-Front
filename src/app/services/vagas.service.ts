import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Vaga } from "../components/model/vaga.model";

@Injectable({
    providedIn: 'root'
})

export class VagasService{
    constructor(private http: HttpClient){}

    private urlBackEnd = "https://localhost:44353/api/vagas";

    getVagas():Observable<any>{
        return this.http.get(this.urlBackEnd);
    }

    setVagas(vaga:Vaga):Observable<any>{
        return this.http.post(this.urlBackEnd, vaga);
    }

    updateVagas(vaga:Vaga):Observable<any>{
        return this.http.put(this.urlBackEnd+'/'+vaga.id, vaga);
    }

    deleteVagas(vaga:Vaga):Observable<any>{
        return this.http.delete(this.urlBackEnd+'/'+vaga.id);
    }
}