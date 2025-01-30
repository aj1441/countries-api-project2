import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDZYOYOE0oSmTmLgz4GgyMSVtpdo4MaeQQ",
    authDomain: "aj-countries-api.firebaseapp.com",
    databaseURL: "https://aj-countries-api-default-rtdb.firebaseio.com",
    projectId: "aj-countries-api",
    storageBucket: "aj-countries-api.firebasestorage.app",
    messagingSenderId: "390998346076",
    appId: "1:390998346076:web:e707aac8959ec6b6211999",
    measurementId: "G-2ERGYW2M35"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
