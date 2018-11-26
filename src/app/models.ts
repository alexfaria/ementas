import { strings } from './strings';

interface Deserializable {
  deserialize(input: any): this;
  fromJson(json: any): this;
}

export class Diaria implements Deserializable {
  id: number;
  almoco: Ementa;
  jantar: Ementa;
  observacoes: string[];
  data: Date;
  static idCounter = 0;

  fmtData(locale: string): String {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    const options = { weekday: 'short', month: 'long', day: 'numeric' };
    return this.data.toLocaleDateString(locale, options);
  }

  fmtDataShort(locale: string): String {
    const options = { month: 'long', day: 'numeric' };
    return this.data.toLocaleDateString(locale, options);
  }

  isSameDay(date: Date) {
    return (
      date.getFullYear() === this.data.getFullYear() &&
      date.getMonth() === this.data.getMonth() &&
      date.getDate() === this.data.getDate()
    );
  }

  isToday() {
    const today = new Date();
    return this.isSameDay(today);
  }

  deserialize(json: any) {
    this.data = new Date(json.Data);
    this.observacoes = json.Observacoes;
    this.almoco = new Ementa().deserialize(json.TiposRefeicao[0]);
    this.jantar = null;
    if (json.TiposRefeicao.length > 1) {
      this.jantar = new Ementa().deserialize(json.TiposRefeicao[1]);
    }
    this.id = Diaria.idCounter++;
    return this;
  }

  fromJson(json: any) {
    this.data = new Date(json.data);
    this.observacoes = json.observacoes;
    this.almoco = new Ementa().fromJson(json.almoco);
    this.jantar = new Ementa().fromJson(json.jantar);
    this.id = Diaria.idCounter++;
    return this;
  }
}

export class Ementa implements Deserializable {
  pratos: Prato[];
  info: string;
  tipo: string; // almoço, jantar

  deserialize(json: any) {
    this.info = json.InfoAdicional;
    this.tipo = json.Descricao.toLowerCase().replace(/ç/, 'c');
    this.pratos = [];
    for (let i in json.TiposPrato) {
      this.pratos.push(new Prato().deserialize(json.TiposPrato[i]));
    }
    return this;
  }

  fromJson(json: any) {
    this.info = json.info;
    this.tipo = json.tipo;
    this.pratos = [];
    for (let i in json.pratos) {
      this.pratos.push(new Prato().fromJson(json.pratos[i]));
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
    let alergenos = json.Alergenos.replace(/-/g, '').split(',');
    for (let i in alergenos) {
      alergenos[i] = alergenos[i].trim().toLowerCase();
    }
    alergenos = alergenos.filter(Boolean);
    this.nome = json.Nome;
    let tipo = json.Descricao.toLowerCase().split(' - ')[0];
    if (tipo in strings.mealTypes) {
      tipo = strings.mealTypes[tipo];
    }
    this.tipo = tipo;
    this.alergenos = alergenos;
    this.calorias = json.ValorCalorico;
    return this;
  }

  fromJson(json: any) {
    this.nome = json.nome;
    this.tipo = json.tipo;
    this.alergenos = json.alergenos;
    this.calorias = json.calorias;
    return this;
  }
}
