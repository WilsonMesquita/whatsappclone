const firebase = require('firebase');
require('firebase/firestore/dist/index.cjs');

export class Firebase {

    constructor() {

        this._config = {
                apiKey: "AIzaSyD2Wwgx1OKWK3nwqVflhr2hBUcXIwxX198",
                authDomain: "whatsapp-clone-b5d11.firebaseapp.com",
                databaseURL: "https://whatsapp-clone-b5d11.firebaseio.com",
                projectId: "whatsapp-clone-b5d11",
                storageBucket: "gs://whatsapp-clone-b5d11.appspot.com",
                messagingSenderId: "181908400230"
                //gs://whatsapp-clone-b5d11.appspot.com
                //whatsapp-clone-b5d11.appspot.com
        };

        this.init();
    }

    init() {

            if (!window._initializedFirebase) {
                firebase.initializeApp(this._config);

                firebase.firestore().settings({
                    timestampsInSnapshots: true
                });

                window._initializedFirebase = true;
            }

    }

    static db() {

        return firebase.firestore();

    }

    static hd() {

        return firebase.storage();

    }

    initAuth() {

        return new Promise((s, f) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            
            .then(result => {
                let token = result.credential.accessToken;
                let user = result.user;
                s({user, token});
            }).catch(err => {
                f(err);
            });
        });
    }
}