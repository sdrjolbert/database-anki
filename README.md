# Para a utilização dos scripts em Node.js basta realizar os seguintes comandos

```bash
npm run extract <caminho_do_apkg>
```
- Extrai o(s) arquivo(s) de dentro do arquivo .apkg

</br>

```bash
npm run show ./decks/<nome_do_deck>/collection.anki21
```
- Mostra as tabelas disponíveis naquele collection.anki21 selecionado

</br>

```bash
npm run get ./decks/<nome_do_deck>/collection.anki21 <nome_da_tabela>
```
- Mostra as linhas da tabela selecionada do collection.anki21

</br>

```bash
npm run all ./decks/<nome_do_deck>/collection.anki21
```
- Mostra todas as linhas de todas as tabelas do collection.anki21

</br>

> **Observações:**
>
> - Por padrão de projeto é ideal manter os arquivos `.apkg` na pasta `./apkgs/` na raiz do projeto.
> - Não é necessário definir o local de extração do arquivo `.apkg` pois ele será extraído automaticamente dentro da pasta `./decks/` na raiz do projeto.

  


