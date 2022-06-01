import { Injectable } from "@angular/core";
import { collection, doc, Firestore, setDoc } from "@angular/fire/firestore";

@Injectable({
    providedIn: "root"
})

export class FirebaseService{
    
    constructor(
        private afs: Firestore
    ) {}

    saveProduto(produto){
        let ref = doc(collection(this.afs, 'produtos'))
        return setDoc(ref, {
            nome: produto.nome,
            codBarras: produto.codBarras,
            categoria: produto.categoria,
            info: produto.info,
            // foto: produto.foto,
            id: ref.id
        })
    }
}