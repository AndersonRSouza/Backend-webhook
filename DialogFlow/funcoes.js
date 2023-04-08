import Produto from "../Modelo/produto.js"

export function criarMessengerCard(){
    return {
        type:"info",
        title:"",
        subtitle:"",
        image: {
            src:{
                "rawUrl":""
            }
        },
        "actionLink":""
    }
}

export function criarCustomCard(){
    return{
        card: {
                title: "card title",
                subtitle: "card text",
                imageUri: "https://example.com/images/example.png",
                buttons: [
                    {
                        "text":"Informações do produto",
                        "postback": "https://example.com/path/for/end-user/to/follow"
                    }
                ]

        }

    }
}

export function obterCardsProdutos(tipo="custom"){
    const produto = new Produto();

    const listaProdutos = produto.consultar();
    let listaCards = [];
    for (const produto of listaProdutos){
        let card;
        if (tipo === "custom"){
            card = criarCustomCard();
            card['card']['title'] = produto.descricao;
            card['card']['subtitle'] = "Valor R$ " + produto.preco;
            card['card']['imageUri'] = produto.urlImagem;
            card['card']['buttons']['text'] = "Informações sobre o produto";
            card['card']['buttons']['postback'] = "http://sitedaloja/"+produto.descricao+".html";
            
        }
        else if (tipo === "messenger"){
            card = criarMessengerCard();
            card['title'] = produto.descricao;
            card['subtitle'] = "Valor R$ " + produto.preco;
            card['image']['src']['rawUrl'] = produto.urlImagem;
            card['actionLink'] = "http://sitedaloja/"+produto.descricao+".html"
        }

        listaCards.push(card);

    }

    return listaCards;

}