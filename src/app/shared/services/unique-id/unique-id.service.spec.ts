import { UniqueIdService } from "./unique-id.service";

// .spec.ts: convenção do test-runner Karma, usado pelo Angular CLI
// Jasmine: framework de testes usado por padrão
// O Karma é agnóstico ao framework de testes. É configurado na raiz do projeto (karma.conf.js)

// describe: artefato testado, função
describe('artefato', () => {

  // it: condição que queremos testar
  // convenção: xxxx should yyyy when zzzz
  it('liquidificador faz bolinhos quando colocado no forno', () => {

  });
});

// Obtendo os nomes dos próprios elementos para em caso de mudança o IDE renomear tudo
describe(UniqueIdService.name, () => {

  let service: UniqueIdService;

  beforeEach(() => {
    service = new UniqueIdService();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
      should generate id when called with prefix`, () => {
    const id = service.generateUniqueIdWithPrefix('app');

    // Expectativa
    expect(id).toMatch(/^app-/);
    expect(id.length).toBeGreaterThan('app-'.length);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
      should not generate duplicated ids when called multiple times`, () => {
    const ids = new Set();
    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }
    expect(ids.size).toBe(50);
  });

  it(`#${UniqueIdService.prototype.getNumberOfGeneratedIds.name}
      should return the number of generated ids when called`, () => {
    const firstId = service.generateUniqueIdWithPrefix('app');
    const secondId = service.generateUniqueIdWithPrefix('app');
    expect(service.getNumberOfGeneratedIds()).toBe(2);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
      should throw exception when called with empty`, () => {

    // A chamada que lança exceção deve estar contida em uma função
    // No modo strict já não posso passar null ou undefined aqui
    expect(() => service.generateUniqueIdWithPrefix('')).toThrow();
  })

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
      should throw exception when called with a string starting with digit`, () => {

    // withContext: útil em loops como este, acrescentamos como informação no teste
    // Podemos saber qual valor exato fez o teste falhar :)
    for (let i = 0; i < 10; i++) {
      expect(() => service.generateUniqueIdWithPrefix(i.toString()))
        .withContext(i.toString()).toThrow();
      expect(() => service.generateUniqueIdWithPrefix(`${i}a`))
        .withContext(`${i}a`).toThrow();
    }
  })

});
