import Prototipo from "../interfaces/prototipo"

export default class Telefone implements Prototipo {
    public ddd: string
    public numero: string

    public clonar(): Telefone {
        let telefones = new Telefone()
        telefones.ddd = this.ddd
        telefones.numero = this.numero
        return telefones
    }
}