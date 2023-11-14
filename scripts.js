const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;


//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/talentfuture',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});


//criando a model de usuario
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : { type : String},
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

//configurando os roteamentos


app.post("/login", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha;

    if(  email == null || senha == null){
        return res.status(400).json({error : "preencha todos os campos"})
    }

    const emailexiste= await Usuario.findOne({email:email})
    if(emailexiste){
        return res.status(400).json({error:"o email cadastrado ja existe "})
    }

    const usuario = new Usuario({
        email : email,
        senha : senha,
    })


    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastrado com sucesso", UsuarioId : newUsuario._id});
    }
    catch(error){
        res.status(400).json((error));
    }


});




//criando a model de cadastro
const CadastroSchema = new mongoose.Schema({
    nome : {type : String},
    senha : { type : String, required : true},
    email : { type : String, required : true},
    nascimento : { type : Date},
    endereco : { type : String},
    cep : { type : String},
    telefone : { type : String}

});

const Cadastro = mongoose.model("Cadastro", CadastroSchema);

//configurando os roteamentos


app.post("/sigin", async(req, res)=>{
    const nome = req.body.nome;
    const senha = req.body.senha;
    const email = req.body.email;
    const nascimento = req.body.nascimento;
    const endereco = req.body.endereco;
    const cep = req.body.cep;
    const telefone = req.body.telefone;

    if(  nome == null || senha == null || email == null || nascimento == null|| endereco == null || cep == null ||telefone == null){
        return res.status(400).json({error : "preencha todos os campos"})
    }

    const emailexiste= await Cadastro.findOne({email:email})
    if(emailexiste){
        return res.status(400).json({error:"o email cadastrado ja existe "})
    }

    const cadastro = new Cadastro({
        nome : nome,
        senha : senha,
        email : email,
        nascimento : nascimento,
        endereco : endereco,
        cep : cep,
        telefone : telefone,
    })


    try{
        const newCadastro = await cadastro.save();
        res.json({error : null, msg : "Cadastrado com sucesso", CadastroId : newCadastro._id});
    }
    catch(error){
        res.status(400).json((error));
    }


});


//rota para o ge de cadastro

app.get("/sigin", async(req, res)=>{
    res.sendFile(__dirname +"/sigin.html");
})


app.get("/login", async(req, res)=>{
    res.sendFile(__dirname +"/login.html");
})

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})

//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})

