import express from 'express';
import rotaDlgFlow from './Rotas/rotaDlgFlow.js';

const host = "0.0.0.0";
const porta = 5001;

const app = express();
app.use(express.json());
app.use('/webhook', rotaDlgFlow);

app.listen(porta, host, ()=>{
    console.log("Webhook em execução");
});