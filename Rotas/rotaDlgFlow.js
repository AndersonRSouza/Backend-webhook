import { Router } from "express";
import ProdutoCtrl from "../Controle/ProdutoCtrl.js";

const rotaDlgFlow = new Router();
const produtoCtrl = new ProdutoCtrl();

rotaDlgFlow.post("/", produtoCtrl.processarIntents);

export default rotaDlgFlow;