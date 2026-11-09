# Enade Compass

Cria uma aplicação web progressiva (PWA) interativa de estudo para o ENADE 2026 - Formação Geral em Engenharia de Produção, baseada na cartilha oficial da Universidade Federal do Ceará - Campus Russas (Autoria: GEPRO / Marcela Costa Araújo, Érica Freire da Silva e Emerson Rodrigues Sabino).

### Design & Identidade Visual
- Estilo moderno, limpo e académico, com suporte a Modo Claro / Modo Escuro.
- Paleta de cores inspirada na UFC: azul institucional (#004B87), verde sustentável (#2E7D32) e cinza neutro (#F4F6F8).
- Layout responsivo com menu lateral expansível no desktop e barra de navegação inferior no telemóvel.

### Estrutura de Navegação & Módulos da Aplicação

1. Dashboard / Início:
   - Apresentação da cartilha e mensagem motivacional.
   - Contador regressivo para a data do ENADE 2026.
   - Barra de progresso geral de estudo do utilizador.

2. Guia de Véspera (Checklist Interativo):
   - Checklist interativo de preparação (alimentação, descanso, documentos e caneta preta).
   - Card de alerta sobre o horário limite de fecho dos portões às 13:00 (horário de Brasília).

3. Estratégia de Prova & Descodificador de Comandos:
   - Guia visual interativo sobre os verbos de comando ("Identifique", "Explique", "Compare", "Analise", "Proponha", "Discuta").
   - Módulo de leitura analítica de gráficos e tabelas com dicas contra pegadinhas da banca (distinção entre aparência e realidade, variáveis cruzadas).
   - Guia de argumentação discursiva: Fato vs. Opinião vs. Tese vs. Evidência.

4. Trilhas de Conhecimento (Os 4 Eixos da Portaria INEP nº 154/2026):
   - Eixo I: Socioambiental, Clima e Território (Mudanças climáticas, justiça climática, mobilidade ativa, ODS 11).
   - Eixo II: Direitos, Equidade e Inclusão (Direitos humanos, ações afirmativas, LBI e Desenho Universal).
   - Eixo III: Trabalho, Saúde e Estado (Uberização, NR-17, Burnout, ergonomia e políticas públicas).
   - Eixo IV: Inovação, Globalização e Tecnologia (Governança de IA, LGPD, viés algorítmico e cadeias globais de valor).

5. Matriz ESG, Economia Circular & ODS:
   - Esquema interativo da Matriz ESG integrada aos 12 Objetos de Conhecimento.
   - Diagrama explicativo do Triple Bottom Line e Economia Circular (Reduzir, Reutilizar, Reparar, Reciclar, Logística Reversa).
   - Relação dos ODS (8, 9, 12 e 13) com a Engenharia de Produção.

6. Simulados Interativos:
   - Questões de múltipla escolha com temporizador opcional.
   - Feedback imediato após a resposta com gabarito fundamentado nas competências H1.1 e H2.2 da Portaria INEP nº 154/2026.
   - Sistema de armazenamento do histórico de desempenho no localStorage do navegador.

### Requisitos Técnicos
- Utiliza React, Tailwind CSS e componentes Shadcn UI / Lucide Icons.
- Implementa um sistema de pesquisa global para encontrar termos-chave rápidos (ex.: "NR-17", "LGPD", "Logística Reversa", "Greenwashing").

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://enade-compass-2026.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/20e145da-b1f4-4b2b-81be-5e7bd21182b5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
