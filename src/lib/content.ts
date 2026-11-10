// Conteúdo baseado na cartilha "Aprenda a gabaritar o ENADE sem enrolação" (GEPRO / UFC Russas, 2026)

// Prova: 29/11/2026 às 12:00 (horário de Brasília, UTC-3).
// A contagem regressiva encerra 1 h antes, às 11:00.
export const ENADE_DATE = "2026-11-29T11:00:00-03:00";
export const ENADE_EXAM_LABEL = "29/11/2026, 12:00 (Brasília)";

export const checklist = [
  { id: "c1", group: "Alimentação", text: "Jantar leve na véspera e café da manhã reforçado" },
  { id: "c2", group: "Alimentação", text: "Separar água e lanche leve (em embalagem transparente)" },
  { id: "c3", group: "Descanso", text: "Dormir pelo menos 7–8 horas na noite anterior" },
  { id: "c4", group: "Descanso", text: "Evitar estudar conteúdo novo na véspera — só revisão leve" },
  { id: "c5", group: "Documentos", text: "Documento oficial com foto, original e válido" },
  { id: "c6", group: "Documentos", text: "Cartão de confirmação de inscrição impresso ou no celular" },
  { id: "c7", group: "Documentos", text: "Conferir o local de prova e o trajeto com antecedência" },
  { id: "c8", group: "Material", text: "Caneta esferográfica de tinta preta, de material transparente" },
  { id: "c9", group: "Material", text: "Sair de casa com folga — estar no local de prova até as 11:00" },
];

export const verbos = [
  { verbo: "Identifique", cor: "primary", acao: "Localize e nomeie o elemento pedido, sem desenvolver.", dica: "Resposta curta e objetiva. Não explique o que não foi pedido.", exemplo: "Identifique dois impactos da uberização sobre a saúde do trabalhador." },
  { verbo: "Explique", cor: "primary", acao: "Mostre o porquê ou o como: relação de causa e efeito.", dica: "Use conectivos: 'porque', 'pois', 'o que leva a'.", exemplo: "Explique por que a mobilidade ativa reduz emissões urbanas." },
  { verbo: "Compare", cor: "secondary", acao: "Aponte semelhanças E diferenças entre dois ou mais elementos.", dica: "Estruture em paralelo: critério → A → B.", exemplo: "Compare economia linear e economia circular." },
  { verbo: "Analise", cor: "secondary", acao: "Decomponha o problema, relacione as partes e avalie.", dica: "Separe dados, interpretação e conclusão.", exemplo: "Analise o gráfico de emissões por setor." },
  { verbo: "Proponha", cor: "warning", acao: "Apresente uma solução viável, com agente, ação e meio.", dica: "Quem faz? O quê? Como? Com que finalidade? Respeite os direitos humanos.", exemplo: "Proponha uma intervenção para reduzir o viés algorítmico em contratações." },
  { verbo: "Discuta", cor: "warning", acao: "Debata pontos de vista, prós e contras, e posicione-se.", dica: "Apresente tese + argumentos + contra-argumento + conclusão.", exemplo: "Discuta os limites éticos do uso de IA em serviços públicos." },
];

export const pegadinhas = [
  { titulo: "Aparência × realidade", texto: "Escalas truncadas no eixo Y fazem pequenas variações parecerem enormes. Sempre leia os valores do eixo antes de concluir." },
  { titulo: "Variáveis cruzadas", texto: "Correlação não é causalidade. Duas séries que sobem juntas podem ser influenciadas por uma terceira variável." },
  { titulo: "Absoluto × relativo", texto: "Crescimento de 100% pode ser de 1 para 2. Verifique se o dado é absoluto, percentual ou per capita." },
  { titulo: "Recorte temporal", texto: "Uma série curta pode esconder sazonalidade. Observe início, fim e picos da série temporal." },
  { titulo: "Fonte e unidade", texto: "Confira fonte, ano e unidade de medida. A banca troca 'mil' por 'milhões' nas alternativas." },
  { titulo: "Generalização indevida", texto: "Alternativas com 'sempre', 'nunca', 'todos' costumam extrapolar o que os dados mostram." },
];

export const argumentacao = [
  { termo: "Fato", def: "Informação verificável, objetiva, comprovável.", ex: "O transporte responde por parcela relevante das emissões urbanas." },
  { termo: "Opinião", def: "Juízo pessoal, não necessariamente sustentado.", ex: "Andar de bicicleta é melhor que andar de carro." },
  { termo: "Tese", def: "A posição central que você defende na resposta.", ex: "Investir em mobilidade ativa é estratégico para cidades sustentáveis (ODS 11)." },
  { termo: "Evidência", def: "Dados, exemplos ou referências que sustentam a tese.", ex: "Dados do texto-base, legislação (ex.: Lei 12.587/2012) ou relatórios oficiais." },
];

export type Eixo = {
  id: string; numero: string; titulo: string; objetos: string; cor: string;
  resumo: string; topicos: { nome: string; texto: string }[]; fontes: string[];
};

export const eixos: Eixo[] = [
  {
    id: "eixo-1", numero: "I", titulo: "Socioambiental, Clima e Território", objetos: "Objetos IV, IX e X", cor: "secondary",
    resumo: "Integra mudanças climáticas, qualidade de vida urbana e rural e diversidade territorial.",
    topicos: [
      { nome: "Mudanças climáticas", texto: "Aquecimento global causado por emissões de gases de efeito estufa. A Engenharia de Produção atua na eficiência energética, descarbonização de processos e inventário de emissões." },
      { nome: "Justiça climática", texto: "Os impactos climáticos atingem de forma desigual populações vulneráveis, que menos contribuíram para o problema. Políticas de adaptação devem priorizar esses grupos." },
      { nome: "Mobilidade ativa", texto: "Deslocamentos a pé e de bicicleta. Reduz emissões, melhora a saúde e democratiza o espaço urbano. Base legal: Política Nacional de Mobilidade Urbana (Lei 12.587/2012)." },
      { nome: "ODS 11 e direito à cidade", texto: "Cidades e comunidades sustentáveis: acesso a moradia, transporte, espaços públicos e resiliência a desastres. Direito à cidade = usufruto equitativo do espaço urbano." },
    ],
    fontes: ["Acordo de Paris", "Relatórios do IPCC", "Estatuto da Cidade (Lei 10.257/2001)", "Agenda 2030 – ODS 11 e 13"],
  },
  {
    id: "eixo-2", numero: "II", titulo: "Direitos, Equidade e Inclusão", objetos: "Objetos I, V e XI", cor: "primary",
    resumo: "Ética, democracia, direitos humanos, equidade étnico-racial, geracional e de gênero, e acessibilidade.",
    topicos: [
      { nome: "Direitos humanos", texto: "Universais, indivisíveis e inalienáveis (Declaração Universal de 1948). Toda proposta de intervenção no ENADE deve respeitá-los." },
      { nome: "Ações afirmativas", texto: "Políticas temporárias para corrigir desigualdades históricas, como a Lei de Cotas (Lei 12.711/2012). Equidade ≠ igualdade: tratar desigualmente os desiguais." },
      { nome: "LBI – Lei Brasileira de Inclusão", texto: "Lei 13.146/2015: garante acessibilidade e combate barreiras urbanísticas, arquitetônicas, comunicacionais, atitudinais e tecnológicas." },
      { nome: "Desenho Universal", texto: "Projetar produtos, ambientes e serviços utilizáveis por todos, sem adaptação. No digital, o eMAG orienta a acessibilidade de sites públicos." },
    ],
    fontes: ["Constituição Federal de 1988", "Declaração Universal dos Direitos Humanos", "LBI (Lei 13.146/2015) e eMAG", "Estatuto da Igualdade Racial"],
  },
  {
    id: "eixo-3", numero: "III", titulo: "Trabalho, Saúde e Estado", objetos: "Objetos II, III e XII", cor: "warning",
    resumo: "Estado, sociedade e trabalho; educação cidadã; saúde ocupacional e bem-estar.",
    topicos: [
      { nome: "Uberização", texto: "Trabalho mediado por plataformas digitais, com gestão algorítmica, ausência de vínculo e transferência de riscos ao trabalhador. Gera precarização e jornadas extensas." },
      { nome: "NR-17 – Ergonomia", texto: "Norma Regulamentadora que estabelece parâmetros para adaptar as condições de trabalho às características psicofisiológicas dos trabalhadores, incluindo organização do trabalho e Análise Ergonômica do Trabalho (AET)." },
      { nome: "Burnout", texto: "Síndrome do esgotamento profissional, reconhecida pela OMS (CID-11) como fenômeno ocupacional. Ligada a metas abusivas, sobrecarga e falta de autonomia." },
      { nome: "Políticas públicas", texto: "Ações do Estado para garantir direitos sociais: SUS, previdência, fiscalização do trabalho. O ENADE cobra o papel do Estado na proteção social." },
    ],
    fontes: ["NR-17 (Ministério do Trabalho)", "CID-11 / OMS", "CLT", "Constituição Federal – arts. 6º e 7º"],
  },
  {
    id: "eixo-4", numero: "IV", titulo: "Inovação, Globalização e Tecnologia", objetos: "Objetos VI, VII e VIII", cor: "chart-4",
    resumo: "Cultura e comunicação, ciência, tecnologia e IA, e relações internacionais.",
    topicos: [
      { nome: "Governança de IA", texto: "Conjunto de princípios e regras para uso ético da inteligência artificial: transparência, explicabilidade, responsabilização e supervisão humana." },
      { nome: "LGPD", texto: "Lei Geral de Proteção de Dados (Lei 13.709/2018): regula o tratamento de dados pessoais, exige base legal, finalidade e consentimento, e garante direitos ao titular. Fiscalizada pela ANPD." },
      { nome: "Viés algorítmico", texto: "Algoritmos treinados com dados históricos podem reproduzir discriminações (raça, gênero, território). Exige auditoria e diversidade nos dados." },
      { nome: "Cadeias globais de valor", texto: "Produção fragmentada entre países. Gera eficiência, mas também dependência, vulnerabilidade logística e desigualdade entre Norte e Sul global." },
    ],
    fontes: ["LGPD (Lei 13.709/2018)", "Marco Civil da Internet (Lei 12.965/2014)", "Recomendação da UNESCO sobre Ética da IA", "Lei Anticorrupção (12.846/2013)"],
  },
];

export const objetos = [
  "I. Ética, Democracia, Cidadania e Direitos Humanos",
  "II. Estado, Sociedade e Trabalho",
  "III. Educação e Desenvolvimento Humano e Social",
  "IV. Mudanças Climáticas e Questões Socioambientais",
  "V. Equidade nas Relações Étnico-Raciais, Geracionais, de Classe e de Gênero",
  "VI. Cultura, Arte e Comunicação",
  "VII. Ciência, Tecnologia e Inovação",
  "VIII. Processos de Globalização e Política Internacional",
  "IX. Campo, Cidade e Qualidade de Vida",
  "X. Territórios, Sociodiversidade e Diversidade Cultural",
  "XI. Acessibilidade e Inclusão Social",
  "XII. Saúde e Bem-Estar",
];

export const esg = [
  { letra: "E", nome: "Environmental (Ambiental)", objetos: [3, 8, 9], itens: ["Emissões e eficiência energética", "Gestão de resíduos e logística reversa", "Uso de água e recursos naturais"] },
  { letra: "S", nome: "Social", objetos: [1, 2, 4, 10, 11], itens: ["Saúde e segurança do trabalho (NR-17)", "Diversidade e inclusão", "Relação com comunidades"] },
  { letra: "G", nome: "Governance (Governança)", objetos: [0, 5, 6, 7], itens: ["Ética e compliance (Lei Anticorrupção)", "Proteção de dados (LGPD)", "Transparência — evitar greenwashing"] },
];

export const circular = [
  { r: "Reduzir", t: "Diminuir consumo de matéria-prima e energia na origem (ecodesign, lean)." },
  { r: "Reutilizar", t: "Usar novamente o produto ou componente sem reprocessamento." },
  { r: "Reparar", t: "Prolongar a vida útil por manutenção e conserto." },
  { r: "Reciclar", t: "Transformar resíduos em nova matéria-prima." },
  { r: "Logística Reversa", t: "Retorno de produtos pós-consumo ao ciclo produtivo (PNRS – Lei 12.305/2010)." },
];

export const ods = [
  { n: 8, nome: "Trabalho decente e crescimento econômico", ep: "Gestão de pessoas, ergonomia, produtividade com condições dignas." },
  { n: 9, nome: "Indústria, inovação e infraestrutura", ep: "Indústria 4.0, automação, P&D e infraestrutura resiliente." },
  { n: 12, nome: "Consumo e produção responsáveis", ep: "Economia circular, produção mais limpa, ciclo de vida do produto." },
  { n: 13, nome: "Ação contra a mudança global do clima", ep: "Inventário de emissões, eficiência energética, descarbonização." },
];

export const glossario = [
  { termo: "Greenwashing", def: "Prática de se apresentar como sustentável sem ações reais equivalentes. Fere o pilar G (governança/transparência) do ESG.", to: "/esg" },
  { termo: "Triple Bottom Line", def: "Tripé da sustentabilidade: econômico, social e ambiental (People, Planet, Profit).", to: "/esg" },
  { termo: "Logística Reversa", def: "Retorno de produtos pós-consumo ao ciclo produtivo, prevista na PNRS (Lei 12.305/2010).", to: "/esg" },
  { termo: "ESG", def: "Environmental, Social and Governance: critérios de sustentabilidade corporativa.", to: "/esg" },
  { termo: "Economia Circular", def: "Modelo que mantém materiais em uso pelo maior tempo possível, contra o modelo linear extrair–produzir–descartar.", to: "/esg" },
  { termo: "Fato, opinião, tese e evidência", def: "Elementos da argumentação discursiva.", to: "/estrategia" },
  { termo: "Verbos de comando", def: "Identifique, Explique, Compare, Analise, Proponha, Discuta.", to: "/estrategia" },
  { termo: "Alarme das 11:00", def: "A prova começa às 12:00; o alarme toca 1 h antes, às 11:00, para você entrar no local de prova.", to: "/vespera" },
  { termo: "Caneta preta", def: "Leve caneta esferográfica de tinta preta, de material transparente.", to: "/vespera" },
];

export type Questao = {
  id: string; eixo: string; enunciado: string; alternativas: string[]; correta: number;
  competencia: "H1.1" | "H2.2"; justificativa: string;
};

export const questoes: Questao[] = [
  { id: "q1", eixo: "Eixo III", competencia: "H2.2", enunciado: "Uma empresa de entregas por aplicativo define rotas, metas e punições por algoritmo, sem vínculo empregatício. Do ponto de vista da Engenharia de Produção, a medida MAIS adequada para reduzir os riscos à saúde desses trabalhadores é:",
    alternativas: ["Aumentar a bonificação por entregas realizadas em menor tempo.", "Aplicar princípios da NR-17, revisando a organização do trabalho, pausas e limites de jornada.", "Substituir os trabalhadores por drones, eliminando o problema.", "Transferir integralmente a responsabilidade pela segurança aos entregadores.", "Ampliar a gestão algorítmica para monitorar o trabalhador em tempo real."],
    correta: 1, justificativa: "H2.2 exige propor soluções éticas e viáveis para problemas sociais. A NR-17 trata da organização do trabalho (ritmo, pausas, metas), atacando a causa do adoecimento sem violar direitos." },
  { id: "q2", eixo: "Eixo IV", competencia: "H1.1", enunciado: "Uma campanha publicitária afirma que um produto é '100% verde', mas a empresa não divulga dados de emissões nem de descarte. Essa estratégia de comunicação caracteriza:",
    alternativas: ["Logística reversa.", "Economia circular.", "Greenwashing.", "Desenho universal.", "Ação afirmativa."],
    correta: 2, justificativa: "H1.1 pede analisar linguagens e seus impactos na construção de significados. A mensagem constrói uma imagem sustentável sem evidência — greenwashing, falha de transparência (pilar G do ESG)." },
  { id: "q3", eixo: "Eixo IV", competencia: "H2.2", enunciado: "Um sistema de IA de recrutamento, treinado com contratações históricas, passou a recusar mais candidatas mulheres. A proposta que melhor enfrenta o problema é:",
    alternativas: ["Desligar toda forma de tecnologia no RH.", "Manter o sistema, pois reflete fielmente os dados.", "Auditar o modelo, diversificar os dados de treino e garantir supervisão humana, em conformidade com a LGPD.", "Ocultar o critério de gênero apenas da interface.", "Contratar apenas pela indicação de gestores."],
    correta: 2, justificativa: "H2.2: intervenção com agente, ação e meio. Viés algorítmico se combate com auditoria, dados representativos e supervisão humana — princípios de governança de IA e da LGPD." },
  { id: "q4", eixo: "Eixo I", competencia: "H1.1", enunciado: "Um gráfico mostra as emissões de uma cidade com eixo vertical começando em 950 mil t e terminando em 1.000 mil t, sugerindo 'explosão' das emissões. A leitura correta é:",
    alternativas: ["As emissões dobraram no período.", "A escala truncada amplia visualmente uma variação pequena; é preciso ler os valores.", "O gráfico prova que a mobilidade ativa fracassou.", "Os dados são falsos, pois o eixo não começa em zero.", "Não é possível extrair nenhuma informação do gráfico."],
    correta: 1, justificativa: "H1.1: analisar recursos de comunicação e seu impacto no significado. A distinção entre aparência e realidade é uma pegadinha clássica da banca." },
  { id: "q5", eixo: "Eixo II", competencia: "H2.2", enunciado: "Uma universidade quer tornar seu portal acessível a pessoas com deficiência visual. A ação mais alinhada à LBI e ao Desenho Universal é:",
    alternativas: ["Criar um portal separado apenas para pessoas com deficiência.", "Seguir as diretrizes do eMAG, com texto alternativo, contraste e navegação por teclado no portal principal.", "Aumentar o tamanho das imagens decorativas.", "Exigir que os usuários instalem softwares pagos.", "Disponibilizar o conteúdo apenas em PDF digitalizado."],
    correta: 1, justificativa: "H2.2: soluções inclusivas. O Desenho Universal projeta para todos sem segregação; o eMAG operacionaliza a LBI (Lei 13.146/2015) no ambiente digital." },
  { id: "q6", eixo: "ESG", competencia: "H2.2", enunciado: "Uma fábrica de eletrônicos quer reduzir o descarte de seus produtos em aterros. A estratégia que integra economia circular e a PNRS é:",
    alternativas: ["Implantar logística reversa com pontos de coleta e reaproveitamento de componentes.", "Reduzir a vida útil dos produtos para aumentar vendas.", "Exportar os resíduos para países com legislação menos rígida.", "Incinerar os resíduos sem recuperação energética.", "Aumentar a embalagem para proteger o produto."],
    correta: 0, justificativa: "H2.2: propor intervenção viável. A logística reversa (Lei 12.305/2010) devolve materiais ao ciclo produtivo, alinhada ao ODS 12." },
  { id: "q7", eixo: "Eixo I", competencia: "H1.1", enunciado: "Um texto afirma: 'Bairros periféricos sofrem mais com enchentes, embora emitam menos gases de efeito estufa'. Esse enunciado expressa principalmente o conceito de:",
    alternativas: ["Uberização.", "Justiça climática.", "Greenwashing.", "Cadeia global de valor.", "Ergonomia cognitiva."],
    correta: 1, justificativa: "H1.1: interpretar o significado do texto. Justiça climática trata da distribuição desigual dos impactos climáticos sobre populações vulneráveis." },
  { id: "q8", eixo: "Eixo III", competencia: "H1.1", enunciado: "Em um relatório, lê-se: 'A empresa bateu metas recordes; alguns colaboradores relataram esgotamento'. Uma análise crítica do texto indica que:",
    alternativas: ["O esgotamento é irrelevante diante dos resultados.", "O texto minimiza um possível quadro de burnout, reconhecido pela OMS como fenômeno ocupacional.", "Metas altas sempre melhoram a saúde mental.", "O relatório é neutro e não constrói sentidos.", "Burnout é um problema exclusivamente individual."],
    correta: 1, justificativa: "H1.1: perceber como a linguagem constrói significados — o 'alguns' e a ordem das frases relativizam um risco ocupacional relevante (CID-11)." },
];
