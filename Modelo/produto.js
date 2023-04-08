import ProdutoDAO from "../Persistencia/produtoDAO.js";

export default class Produto{

    #id;  
    #descricao;
    #preco;
    #urlImagem;
   
    //método construtor que define as informações necessárias para se criar um cliente
    constructor(id=0, descricao="", preco=0.0, urlImagem){
        this.#id = id;
        this.#descricao = descricao;
        this.#preco = preco;
        this.#urlImagem = urlImagem;
        
    }


    get id(){
        return this.#id;
    }

    set id(novoIdproduto){
        if(novoIdproduto != "") //regra de negócio que impede que clientes existam com nomes vazios
            this.#id = novoIdproduto;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricaoproduto){
        this.#descricao = novaDescricaoproduto;
    }

    get preco() {
        return this.#preco;
    }

    set preco(novoPrecoproduto){
        this.#preco = novoPrecoproduto;
    }

    get urlImagem(){
        return this.#urlImagem;    
    }
    
    set urlImagem(novaurlImagemproduto){
        this.#urlImagem = novaurlImagemproduto;
    }

    
    //override ou sobrescrita do método toJSON
    toJSON(){
        return {
            "id"      : this.#id,
            "descricao" : this.#descricao,
            "preco" : this.#preco,
            "urlimagem"   : this.#urlImagem
        }
    }
    
       consultar(){
        const produtoDAO = new ProdutoDAO();
        return produtoDAO.consultar();
    }
}