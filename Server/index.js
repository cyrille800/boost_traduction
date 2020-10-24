const express = require('express')
const bodyParses = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "boostvocabulary",
})

app.use(cors())
app.use(express.json())
app.use(bodyParses.urlencoded({extended: true}))

app.post('/chechMail', (req,res)=>{

    const mail = req.body.mail;
    const sqlInsert = "select count(*) as nbr from users where mail=?"
    db.query(sqlInsert, [mail] ,(err,result)=> {
        res.send(result)
    })
    
})

app.post('/addSentence', (req,res)=>{

    const english = req.body.english;
    const french = req.body.french;
    const idUser = req.body.id;
    const sqlInsert = "INSERT INTO phrase(idUser,englishVersion,frenchVersion) VALUES(?,?,?)"
    db.query(sqlInsert, [idUser,english,french] ,(err,result)=> {
        res.send({operation: "ok"})
    })
    
})


app.post('/checkSentence', (req,res)=>{

    const english = req.body.english;
    const sqlInsert = "select count(*) as nbr from phrase where englishVersion=?"
    db.query(sqlInsert, [english] ,(err,result)=> {
        res.send({nombre: result[0].nbr})
    })
    
})

app.post('/chooseId', async (req,res)=>{

    const id = req.body.id;
    const sqlInsert = "select MIN(id) as min,MAX(id) as max from phrase"
    db.query(sqlInsert ,(err,result)=> {
        let nb=-1;

        do{
            nb= Math.floor(Math.random() * (result[0].max - result[0].min + 1)) + result[0].min;
        }while(nb===id);
        res.send({nb})
    })
    
})

app.post('/checkId', async (req,res)=>{

    const id = req.body.id;
    const sqlInsert = "select count(*) as nb from phrase where id=?"
    db.query(sqlInsert,[id] ,(err,result)=> {
        let nb=result[0].nb
        res.send({nb})
    })
    
})
app.post('/getSentece', async (req,res)=>{

    const id = req.body.id;
    const sqlInsert = "select * from phrase where id=?"
    db.query(sqlInsert,[id] ,(err,result)=> {
        res.send(result)
    })
    
})


app.post('/deleteSentence', async (req,res)=>{

    const id = req.body.idPhrase;
    const sqlInsert = "delete from phrase where id=?"
    db.query(sqlInsert,[id] ,(err,result)=> {
        res.send({reponse:true})
    })
    
})

app.post('/checkSentenceDifficile', async (req,res)=>{

    const idUser = req.body.idUser;
    const idPhrase = req.body.idPhrase
    const sqlInsert = "select listePhrase from phrasedifficile where idUser=?"
    let reponse=false;
    await db.query(sqlInsert,[idUser] ,(err,result)=> {
        let tab = result[0].listePhrase
        tab.split(";").forEach(val => {
            if(parseInt(val)==parseInt(idPhrase)) {
                reponse=true;
            }  
        })
        res.send({reponse})
        
    })
    
})



app.post('/addDifficile', async (req,res)=>{

    const idUser = req.body.idUser;
    const idPhrase = req.body.idPhrase
    const sqlInsert = "select listePhrase from phrasedifficile where idUser=?"
    let nouveau="";
    db.query(sqlInsert,[idUser] ,(err,result)=> {
        let tab = result[0].listePhrase
        nouveau+=tab+idPhrase+";"

        const sql1 = "update phrasedifficile set listePhrase='"+nouveau+"' where idUser="+idUser;
        db.query(sql1, (err2,result2) => {
            res.send({reponse:true})
        } )
        
    })
    
})


app.post('/deleteDifficile', async (req,res)=>{

    const idUser = req.body.idUser;
    const idPhrase = req.body.idPhrase
    const sqlInsert = "select listePhrase from phrasedifficile where idUser=?"
    let nouveau="";
    db.query(sqlInsert,[idUser] ,(err,result)=> {
        let tab = result[0].listePhrase
        tab.split(";").forEach(val => {
            if(val!=""){
                if(parseInt(val)!==parseInt(idPhrase)) {
                    nouveau+=val+";";
                }  
            }
        })

        const sql1 = "update phrasedifficile set listePhrase='"+nouveau+"' where idUser="+idUser;
        db.query(sql1, (err2,result2) => {
            res.send({reponse:true})
        } )
        
    })
    
})


app.post('/search', (req,res)=>{

    const text = req.body.text;
    const sqlInsert = "select * from phrase where englishVersion like '%"+text+"%'"
    db.query(sqlInsert,(err,result)=> {
        res.send(result)
    })
    
})

app.post('/addUser', (req,res)=>{

    const mail = req.body.mail;
    const name = req.body.name;
    const password = req.body.password;

    const sqlInsert = "INSERT INTO users(name,mail,password) values(?,?,?) "
    db.query(sqlInsert, [name,mail,password] ,(err,result)=> {
        const sql = "SELECT id from users where mail=? ";
        db.query(sql,[mail], (err2,result2) => {
            res.send(result)
        } )
    })
    
})

app.post('/checkUser', (req,res)=>{

    const mail = req.body.mail;
    const password = req.body.password;

    const sqlInsert = "SELECT count(*) as nbr from users where mail=? and password=? "
    db.query(sqlInsert, [mail,password] ,(err,result)=> {
        if(parseInt(result[0].nbr)!=0) {
            const sql = "SELECT id from users where mail=? ";
            db.query(sql,[mail], (err2,result2) => {
                res.send({id: result2[0].id})
            } )
        }else{
            res.send({id: -1})
        }
    })
    
})

app.listen(3001, () => {
    console.log("running express 3001")
})