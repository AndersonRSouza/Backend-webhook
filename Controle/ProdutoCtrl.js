import { obterCardsProdutos } from "../DialogFlow/funcoes.js";
import ProdutoDAO from "../Persistencia/produtoDAO.js";

export default class ProdutoCtrl{
    

    processarIntents(requisicao, resposta){
        var listaProdutos = [];
        var listaQtds = [];
        const payload = requisicao.body;
        const produtoDAO = new ProdutoDAO();
        const intencao = payload['queryResult']['intent']
        if (intencao){
            if (intencao['displayName'] === 'Precos - yes'){
                const source = payload["originalDetectIntentRequest"]["source"]
                let resp = {fulfillmentMessages:[]};
                let produtoCards = [];
                if(source){
                    if (source === "DIALOGFLOW_CONSOLE" || source === "telegram"){
                        produtoCards=obterCardsProdutos('custom');
                        for (const card of produtoCards){
                            resp['fulfillmentMessages'].push(card)
                        }
                    }
                }
                else{

                    produtoCards=obterCardsProdutos('messenger');
                    resp['fulfillmentMessages'].push({
                        "payload":{
                            "richContent":[]
                        }
                    })
                    resp['fulfillmentMessages'][0]["payload"]["richContent"].push(produtoCards);
                }

                return resposta.json(resp);
            }
            else if (intencao['displayName'] === 'Pedido'){
                if (payload['queryResult']['action'] == 'PedidoParametros'){
                    listaProdutos = payload['queryResult']['parameters']['produtos'];
                    listaQtds = payload['queryResult']['parameters']['qtds'];
                    let response = {
                        "fulfillmentMessages": []
                    }
                    
                    let produtosPedidos = "";
                    for(let i=0; i<listaProdutos.length; i++){
                        produtosPedidos+=listaQtds[i] + " unidades de " + listaProdutos[i]+", ";
                    }
                    response['fulfillmentMessages'].push({
                        "text": {
                            "text":[
                                "O seu pedido é "+ produtosPedidos +"." +" Você confirma o pedido?"
                            ]
                        }
                    });

                    resposta.json(response);
                }
                
            }
            else if (intencao['displayName'] === 'Pedido - yes'){
                let numPedido = parseInt(Math.random() * 123546);
                let resPedido = {
                    "fulfillmentMessages": []
                }
                resPedido['fulfillmentMessages'].push({
                    "text": {
                        "text":[
                            "Pedido confirmado nº"+ numPedido +". Por favor, informe o endereço de entrega."
                        ]
                    }
                });

                resposta.json(resPedido);

            }
        }
    }
}

