//ANTIGO
//const express = require("express")
//NOVO
//import express from 'express'

//NOVO

/*
    GET - leitura
    POST - criação
    PUT - atualização
    DELETE - Deletação
    PATCH - atualização parcial

    dica para não ter que ficar desligando e ligando servidor a cada alteração.
    Comando: node --watch server.js

    Iniciando o projeto - npm init -y
    Instalando pacotes - npm i pacote (ex: npm i express)

    query parms (GET) consulta - tem variaveis e valores ex: ?name=luiz&age=29
    route params (GET, PUT, DELETE) buscar, deletar, editar - A variavel é seguido por : - ex: usuarios/id
    body params (POST e PUT) - manda por json na aba body do post

    express precisa saber que tem arquivos json para ler o codigo, use:
    app.use(express.json()) 

    promisses: essa ação de ir gravar um dado no banco de dados, ir ao servidor pegar alguma coisase chama
    Promisses ou requisições assincronas.
    
    toda vez que saio do computador, precisamos pedir po javascript esperar o servidor mandar uma resposta,
    pra ele continuar.

    usa-se o await - porem quando usamos dentro uma funão, precisamos usar async
    
*/
import express from "express"
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express() //colocando o xpress dentro de app

app.use(express.json())
app.use(cors())


app.get('/usuarios', async (req, res) => {
    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.post('/usuarios', async (req, res) => {

    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })


    res.status(201).json(user)
})

app.put('/usuarios/:id', async (req, res) => {


    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })


    res.status(200).json(user)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "usuário deletado com sucesso!" })
})

app.listen(3000)

//porta
//req - requisição
//res - resposta
//http://localhost:3000/usuarios

/*mongodb

luuizpaes - TBPBfWtpJqXxJerZ 

Para conectar o mongo a nossa aplicação, vamos instalar outra biblioteca - Prisma.io
instalação - npm install prisma --save-dev (--save-dev são dependencias de desenvolvimento)
comando - npx prisma
edita schema.prisma, .env seguindo documentação
comando: npx prisma db push para consolidar os dados.

Conseguimos ver como está nossa tabela, mesmo estando vazia.
Comando: npx prisma studio

posso criar scripts para usar para os comandos repetidos, como parar servidor e ligar servidor. (package.json)
ex: node --watch server.js
comando: npm run dev

EDITANDO USUARIO:

ok - CRIAR
0k - LER
ok - DELETAR
ok - EDITAR

CRUD inteiro ok
CREATE
READ
UPDATE
DELETE

ORM - interfaces que nos auxliam a lider com ancos de dados
requisições assincronas. 

*/