import {Injectable} from '@angular/core'
import{AngularFireAuth} from '@angular/fire/auth'

import{Store} from '../../../../../store'
import { tap } from 'rxjs/internal/operators/tap'
import { FirebaseApp } from '@angular/fire'
import { Router } from '@angular/router'

export interface User{
    email:string,
    uid:string,
    authenticated:boolean
}

@Injectable()
export class AuthService{
    constructor(private af:AngularFireAuth,private store:Store,private router:Router){}

    auth$=this.af.authState.pipe(
        tap(next=>{
            if(!next){
                this.store.set('user',null)
                return;
            }
            const user:User={
                email:next.email,
                uid:next.uid,
                authenticated:true
            };
            this.store.set('user',user)
        })
    ) //authState RETORNA O USUARIO AUTENTICADO NO MOMENTO
    get authState(){
        return this.af.authState;
    }
    get user(){
        return this.af.currentUser
    }

    createUser(email:string,password:string){
        return this.af.createUserWithEmailAndPassword(email,password);
    }
    loginUser(email:string,password:string){
        return this.af.signInWithEmailAndPassword(email,password);
    }
    logoutUser(){
        this.af.signOut().then(()=>{
            this.router.navigate(['auth/login']);
        });
    }
}