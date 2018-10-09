import { Deserializable } from './deserializable.model';

export class Diaria implements Deserializable {
  id: number;
  almoco: Ementa;
  jantar: Ementa;
  observacoes: string[];
  data: Date;
  static idCounter = 0;

  fmtData(): String {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    const options = { weekday: 'short', month: 'long', day: 'numeric' };
    return this.data.toLocaleDateString('pt-PT', options);
  }

  deserialize(json: any) {
    this.data = new Date(json.Data);
    this.observacoes = json.Observacoes;
    this.almoco = new Ementa().deserialize(json.TiposRefeicao[0]);
    this.jantar = new Ementa().deserialize(json.TiposRefeicao[1]);
    this.id = ++Diaria.idCounter;
    return this;
  }
}

export class Ementa implements Deserializable {
  pratos: Prato[];
  info: string;
  tipo: string; // almoço, jantar

  deserialize(json: any) {
    this.info = json.InfoAdicional;
    this.tipo = json.Descricao;
    this.pratos = [];
    for (let i in json.TiposPrato) {
      this.pratos.push(new Prato().deserialize(json.TiposPrato[i]));
    }
    return this;
  }
}

export class Prato implements Deserializable {
  nome: string;
  tipo: string; // sopa, peixe, carne, dieta, vegetariano
  calorias: number;
  alergenos: string[];

  deserialize(json: any) {
    this.nome = json.Nome;
    this.tipo = json.Descricao;
    this.alergenos = json.Alergenos;
    this.calorias = json.ValorCalorico;
    return this;
  }
}
