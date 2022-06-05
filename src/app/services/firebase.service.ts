import { Injectable } from "@angular/core";
import { collection, collectionChanges, collectionData, CollectionReference, doc, Firestore, query, setDoc, where, getDocs,writeBatch } from "@angular/fire/firestore";
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { first, switchMap, take } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})

export class FirebaseService{
    
    constructor(
        private afs: Firestore,
        private storage: Storage
    ) {}

    async saveProduto(produto){
        let produtosQuery = query<any>(
            collection(this.afs, 'produtos') as CollectionReference<any>,
            where('codBarras', '==', produto.codBarras)
        )

        let produtosCod = await getDocs(produtosQuery)

        if(produtosCod.docs.length > 0) throw new Error('Produto igual/com mesmo código de barras já cadastrado')

        let refProduto = doc(collection(this.afs, 'produtos'))
        let batch = writeBatch(this.afs)

        batch.set(refProduto, {
            dataExcluido: null,
            nome: produto.nome,
            codBarras: produto.codBarras,
            categoria: produto.categoria,
            info: produto.info,
            foto: produto.foto,
            id: refProduto.id
        })

        let refEntrada = doc(collection(this.afs, 'movimentacoes'))
        batch.set(refEntrada, {
            id: refEntrada.id,
            isSaida: false,
            produtos: [{
                codBarras: produto.codBarras,
                nome: produto.nome,
            }]
        })

        return batch.commit()
    }

    saveSaida(saida){
        let ref = doc(collection(this.afs, 'movimentacoes'))

        return setDoc(ref, {
            id: ref.id,
            isSaida: true,
            produtos: saida.produtos
        })
    }

    getMovimentacoes(){
        return collectionData<any>(
            query<any>(
                collection(this.afs, 'movimentacoes') as CollectionReference<any>,
            ), { idField: 'id' }
        );
    }

    getProdutos(){
        return collectionData<any>(
            query<any>(
                collection(this.afs, 'produtos') as CollectionReference<any>,
                where('dataExcluido', '==', null)
            ), { idField: 'id' }
        );
    }

    async uploadFile(file) {
        if (file) {
            const ext = file.name.split('.').pop();
            const path = `imgStorage/${file.name}.${ext}`;

            try {
                const storageRef = ref(this.storage, path);
                const task = uploadBytesResumable(storageRef, file);
                await task;
                return await getDownloadURL(storageRef);
            } catch(e: any) {
                console.error(e);
                throw new Error(e)
            }   
        } else {
            return false
        }
    }
}