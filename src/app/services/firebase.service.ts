import { Injectable } from "@angular/core";
import { collection, collectionChanges, collectionData, CollectionReference, doc, Firestore, query, setDoc, where, getDocs,writeBatch } from "@angular/fire/firestore";
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { orderBy } from "firebase/firestore";
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
            dataCadastrado: new Date().getTime() / 1000,
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
            }],
            dataMov: new Date().getTime() / 1000,
        })

        return batch.commit()
    }

    saveSaida(produtos){
        const batch = writeBatch(this.afs)
        const refSaida = doc(collection(this.afs, 'movimentacoes'))

        let _produtos = []

        for (const p of produtos) {
            let ref = doc(collection(this.afs, `produtos`), p.id)
            batch.update(ref, {
                dataExcluido: new Date().getTime() / 1000,
            })

            _produtos.push({codBarras: p.codBarras, nome: p.nome})
        }

        batch.set(refSaida, {
            id: refSaida.id,
            isSaida: true,
            dataMov: new Date().getTime() / 1000,
            produtos: _produtos
        })

        return batch.commit()
    }

    getMovimentacoes(){
        return collectionData<any>(
            query<any>(
                collection(this.afs, 'movimentacoes') as CollectionReference<any>,
                orderBy('dataMov', 'desc')
            ), { idField: 'id' }
        );
    }

    async getProduto(codBarras: string){
        let produtosQuery = query<any>(
            collection(this.afs, 'produtos') as CollectionReference<any>,
            where('codBarras', '==', codBarras),
            where('dataExcluido', '==', null)
        )

        let produtosCod = await getDocs(produtosQuery)

        if(produtosCod.docs.length === 0) throw new Error('Produto não encontrado')

        return produtosCod.docs[0].data()
    }

    getProdutos(){
        return collectionData<any>(
            query<any>(
                collection(this.afs, 'produtos') as CollectionReference<any>,
                where('dataExcluido', '==', null),
                orderBy('dataCadastrado', 'desc')
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