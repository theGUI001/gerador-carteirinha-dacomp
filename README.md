# Gerador de carteirinha

Projeto feito em [Next.js 16](https://nextjs.org/) com [TypeScript](https://www.typescriptlang.org/) e [Tailwind CSS](https://tailwindcss.com/). Um gerador de carteirinhas para os estudantes da UTFPR, campus Cornélio Procópio, em parceria com o diretório [DACOMP](https://www.instagram.com/dacompcp/).

## Deploy no Github Pages

O projeto está disponível nessa [página](https://mateusmcamargo.github.io/gerador-carteirinha/)

## Como executar localmente

Para executar o projeto localmente:

### Com Bun (recomendado)

```bash
# Instalar as dependências
bun install

# Executar em modo de desenvolvimento
bun dev

# Ou fazer o build e executar em produção
bun run build
bun start
```

### Com npm

```bash
# Instalar as dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Ou fazer o build e executar em produção
npm run build
npm start
```

Acesse `http://localhost:3000` no seu navegador (em desenvolvimento) ou `http://localhost:3000/gerador-carteirinha/generator` (em produção).

## Tecnologias

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utility-first
- **Bun** - Runtime JavaScript moderno e rápido (opcional, mas recomendado)
- **QRCode** - Geração de códigos QR
- **JsBarcode** - Geração de códigos de barras

## Funcionalidades

Gera uma imagem em alta qualidade para impressão da carteirinha, com foto, nome, curso e número de Registro do Aluno (RA), além de um código QR e um código de barras com o valor do RA.

**Nota: o projeto também recebia um número de matrícula, que era impreesso na carteira como código QR. Porém, mudanças foram feitas por parte do diretório e o número de matrícula deixou de ser utilizado**
