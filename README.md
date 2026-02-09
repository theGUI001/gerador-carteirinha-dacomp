# Gerador de carteirinha

Projeto feito em [Next.js 16](https://nextjs.org/) com [Tailwind CSS](https://tailwindcss.com/). Um gerador de carteirinhas para os estudantes da UTFPR, campus Cornélio Procópio, em parceria com o diretório [DACOMP](https://www.instagram.com/dacompcp/).

## Deploy no Github Pages

O projeto está disponível nessa [página](https://mateusmcamargo.github.io/gerador-carteirinha/)

## Como executar localmente

Para executar o projeto localmente:

```bash
# Instalar as dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Ou fazer o build e executar em produção
npm run build
npm start
```

Acesse `http://localhost:3000/gerador-carteirinha/generator` no seu navegador.

## Funcionalidades

Gera uma imagem em alta qualidade para impressão da carteirinha, com foto, nome, curso e número de Registro do Aluno (RA), além de um código QR e um código de barras com o valor do RA.

**Nota: o projeto também recebia um número de matrícula, que era impreesso na carteira como código QR. Porém, mudanças foram feitas por parte do diretório e o número de matrícula deixou de ser utilizado**
