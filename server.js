const express = require("express");
const { accessControl } = require("./middleware"); //MiddleWare yazılımı.
const PORT = 5000; // Sunucunun çalışacağı portu belirler.
const user = [ //User isimli json kodu.
    { id: 1, name: "Afkan Ozdemir", age: "18", place: "Istanbul" },
    { id: 2, name: "Ali Baran", age: "18", place: "Trakya" }];
const app = express();
app.use(express.json()); // veri eklemek için kullanılır req.body fonksiyonunu getirir.

app.use(accessControl); // Her yerde MiddleWare'ı kontrol ettirir.
app.get("/users", (req, res, next) => {
    res.json({ //res.json verisini get methoduna yansıtır.
        success: true, // get methodu çalışır ise succes'i true yapar.
        data: user //user listesini gösterir
    })
});
app.post("/users", (req, res, next) => { //Post gönderildiği zaman app.post - datayadaki veriyi alır.
    console.log(req.body);
    const newUser = req.body //eklenen veriyi newUser değişkenine atar.
    user.push(newUser); // newUser değişkenini user array'ine push eder.
    res.json({ //dönen mesajın json versiyonu.
        success: true,
        data: "post request",
    });
});
app.put("/users/:id", (req, res, next) => { // app.put - dataya veri ekler buraya eklenen id requet id'sidir örneğin localhost/users/2
    const id = parseInt(req.params.id); // string'i int yaparak id değişkenine atar.
    for (let i = 0; i < user.length; i++) { //user'ın uzunluğu kadar i++ yapar ve tüm user'ları gezer.
        if (user[i].id == id) { //gezilen uzer'ın id'si localhost/user/id ile eşleşiyor ise burayı seçer.
            user[i] = {
                ...user[i], //user'ı döner ve yapılan değişiklikleri günceller veya ekler.
                ...req.body  //req.body'i döner ve yapılan değişiklikleri günceller veya ekler.
            };
        };
    };
    res.json({ //dönen mesajın json versiyonudur.
        success: true,
        data: user,

    });
});
app.delete("/users/:id", (req, res, next) => { // app.delete - data'dan veri siler.

    const id = parseInt(req.params.id) // string'i int yaparak id değişkenine atar.
    for (let i = 0; i < user.length; i++) { //user'ın uzunluğu kadar i++ yapar ve tüm user'ları gezer.
        if (user[i].id == id) { //gezilen uzer'ın id'si localhost/user/id ile eşleşiyor ise burayı seçer. 
            user.splice(i, 1); //indexi ile belirlenen yerden 1 adet eleman silinir.
        }
    }

    res.json({
        success: true,
        data: user
    });
});
app.listen(PORT, () => { // Portu dinler.
    console.log("Sunucu Calisiyor " + PORT);
})







