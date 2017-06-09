import { PokemonJsPage } from './app.po';

describe('pokemon-js App', function() {
  let page: PokemonJsPage;

  beforeEach(() => {
    page = new PokemonJsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
