import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { collection, getDocs, query, where, and, or } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyAp3DjVMQPqFsbfNWVpUWPkjClbird4VI0",
    authDomain: "chat-realtime-5e9cc.firebaseapp.com",
    projectId: "chat-realtime-5e9cc",
    storageBucket: "chat-realtime-5e9cc.appspot.com",
    messagingSenderId: "535667668134",
    appId: "1:535667668134:web:b6d8482090e70a437a7067"
};

export const fbApp = initializeApp(firebaseConfig);
export const fbDB = getFirestore(fbApp);

export const fechaFormateo = (time) => {
    return (
        new Intl.DateTimeFormat('en-US',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(time)
    )
}

export const loadData = async(data) => {
    const collectionRef = collection( fbDB, 'users-chats')
    console.log(data)
    const user = data.originID
    const selectID = data.destinyID
    const env1 = where("emisorID", "==", user)
    const env2 = where("receptorID", "==", selectID)
    const rec1 = where("emisorID", "==", selectID)
    const rec2 = where("receptorID", "==", user)
    const Query = query(collectionRef, or( and(env1, env2), and(rec1, rec2) ));
    const aux = []
    const docsRec = await getDocs(Query)
    docsRec.forEach( doc => {
        const data = doc.data()
        const format = fechaFormateo(data.fecha)
        if ( data.emisorID == user ) {
            aux.push({ texto: data.texto, fecha: format, status:'enviado' })
        } else {
            aux.push({ texto: data.texto, fecha: format, status:'recibido' })    
        }
    })    
    if ( aux.length == 0 ) { return ([])
    } else { return (aux) }
}
