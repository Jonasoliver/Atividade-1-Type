import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/tipoDocumento";
import Entrada from "./entrada";

const entrada = new Entrada();
const clientes: Cliente[] = []; // Armazena todos os clientes

function cadastrarCliente(): Cliente {
    const cliente = new Cliente();

    cliente.nome = entrada.receberTexto("Digite o nome do cliente");
    cliente.nomeSocial = entrada.receberTexto("Digite o nome social do cliente");
    cliente.dataNascimento = entrada.receberData("Digite a data de nascimento do cliente");
    cliente.dataCadastro = new Date(); // Data atual

    const documento = new Documento();
    documento.numero = entrada.receberTexto("Digite o número do documento");
    documento.tipo = TipoDocumento[entrada.receberTexto("Digite o tipo de documento (CPF, RG, Passaporte)") as keyof typeof TipoDocumento];
    documento.dataExpedicao = entrada.receberData("Digite a data de expedição do documento");
    cliente.documentos.push(documento);

    const telefone = new Telefone();
    telefone.ddd = entrada.receberTexto("Digite o DDD do telefone");
    telefone.numero = entrada.receberTexto("Digite o número do telefone");
    cliente.telefones.push(telefone);

    const endereco = new Endereco();
    endereco.rua = entrada.receberTexto("Digite a rua");
    endereco.bairro = entrada.receberTexto("Digite o bairro");
    endereco.cidade = entrada.receberTexto("Digite a cidade");
    endereco.estado = entrada.receberTexto("Digite o estado");
    endereco.pais = entrada.receberTexto("Digite o país");
    endereco.codigoPostal = entrada.receberTexto("Digite o código postal");
    cliente.endereco = endereco;

    // Cadastro de dependentes
    let cadastrarMaisDependentes: boolean;
    do {
        const dependente = new Cliente();
        
        dependente.nome = entrada.receberTexto("Digite o nome do dependente");
        dependente.nomeSocial = entrada.receberTexto("Digite o nome social do dependente");
        dependente.dataNascimento = entrada.receberData("Digite a data de nascimento do dependente");
        dependente.dataCadastro = new Date(); // Data atual

        dependente.telefones = cliente.telefones.map(telefone => telefone.clonar() as Telefone);
        dependente.endereco = (cliente.endereco.clonar() as Endereco);
        dependente.titular = cliente;

        cliente.dependentes.push(dependente);
        
        cadastrarMaisDependentes = entrada.receberNumero("Deseja cadastrar mais um dependente? (1 para sim, 0 para não)") === 1;
    } while (cadastrarMaisDependentes);

    return cliente;
}

function listarClientes() {
    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
        return;
    }

    clientes.forEach(cliente => {
        console.log(`Cliente: ${cliente.nome}, Nome Social: ${cliente.nomeSocial}`);
        console.log("Dependentes:");
        cliente.dependentes.forEach(dependente => {
            console.log(` - Dependente: ${dependente.nome}, Nome Social: ${dependente.nomeSocial}`);
        });
        console.log("----------------------------");
    });
}

function menu() {
    let op = 0;

    do {
        console.log("Menu:");
        console.log("1. Cadastrar Cliente");
        console.log("2. Listar Clientes");
        console.log("3. Sair");
        op = entrada.receberNumero("Escolha uma opção");

        switch (op) {
            case 1:
                const cliente = cadastrarCliente();
                clientes.push(cliente);
                console.log("Cliente cadastrado com sucesso:", cliente);
                break;
            case 2:
                listarClientes();
                break;
            case 3:
                console.log("Saindo...");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    } while (op !== 3);
}

menu();
