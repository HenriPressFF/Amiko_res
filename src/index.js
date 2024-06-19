const express = require('express') //framework web para Node.js.
const mongoose = require('mongoose'); //biblioteca para trabalhar com MongoDB em Node.js.


const app = express() //cria uma instância do aplicativo Express.
app.use(express.json()) //middleware para que o Express possa entender JSON no corpo das requisições.
const port = 3000 //define a porta em que o servidor vai escutar.

const Patient = mongoose.model('Patient', { //Define um modelo Patient com os campos Id, name, hospital name e hospital roomnumber.
    id: String,
    name: String,
    hospital: {
        name: String,
        roomNumber: Number
    }
});

app.get('/calls', async (req, res) =>{ 
    /*
    Recupera todos os documentos da coleção Patient e os envia como resposta.
    */
    const pacientes = await Patient.find({}, 'name'); // Busca apenas o campo name.
    const calls = pacientes.map(paciente => ({ name: paciente.name })); //faz um "for" para ler todos names chamados e armazena em calls 
    return res.send({ calls }); // retorna nomes chamados

});

app.delete('/:id', async(req,res)=> { 
    /*
    Deleta um documento Patient pelo seu ID (req.params.id) e retorna o documento deletado como resposta.
    */
    const paciente = await Patient.findByIdAndDelete(req.params.id)
    return res.send(paciente)
});

app.put('/:id',async(req,res)=>{ // parametro id
    /*
    Atualiza um documento Patient pelo seu ID com os dados fornecidos no corpo da requisição (req.body)
     e retorna o documento atualizado como resposta. A opção { new: true } faz com que o método retorne o documento atualizado.
    */
    const paciente = await Patient.findByIdAndUpdate(req.params.id,{
        id: req.body.id,
        name: req.body.name,
        hospital: {
            name: req.body.hospital.name,
            roomNumber: req.body.hospital.roomNumber
        }
    },{
        new: true
    })
    return res.send(paciente)
});

app.post('/calls', async (req,res)=>{  //rota call
    /*
    publica uma nova chamada de um paciente, checa se o numero é válido, salva na nuvem e retorna mensagem status 201 (sucesso)
    */
    const { id, name, hospital } = req.body;

    if (hospital.roomNumber <= 0) {
        return res.status(400).send({
            message: "O número do quarto deve ser maior ou igual a 1"
        });
    }

    const paciente = new Patient({
        id: id,
        name: name,
        hospital: {
            name: hospital.name,
            roomNumber: hospital.roomNumber
        }
    });

    await paciente.save()

    return res.status(201).send({
        message: "Chamado criado com sucesso"
    });

});


app.listen(port, async () => {
    /*
    -Conecta ao banco de dados MongoDB usando a URI fornecida.
    -Inicia o servidor Express na porta definida (3000).
    -Exibe uma mensagem "app Running" no console quando o servidor estiver em execução.
    */
    await mongoose.connect('link_de_conexão_MongoDB'); //Escreva aqui o link de conexão com seu banco de dados MongoDB
    console.log("app Running")
}); 