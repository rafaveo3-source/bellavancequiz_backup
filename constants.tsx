
import React from 'react';
import { Target, Zap, Activity, Heart, Scale, Calendar, AlertTriangle, Clock, Ban, DollarSign, Brain, Users, Star, User, Ruler, Weight } from 'lucide-react';
import { Question, QuestionType } from './types';

// Configuration for CTA Delay (in milliseconds)
export const CTA_DELAY_MS = 64000; 

export const BEFORE_AFTER_IMAGES = [
  "https://i.ibb.co/9kBK6YCx/2-SLIMCENTER-1-1.webp",
  "https://i.ibb.co/5Wb4FGtn/images.jpg",
  "https://i.ibb.co/b5Pz5kkf/images.jpg",
  "https://i.ibb.co/GfqT6D0N/hidrolipo-antes-e-depois03.jpg"
];

export const CLINIC_INFO = {
  address: "Rua Coronel Bernardino de Melo, 2075 / Sala: 301 - Centro, Nova Iguaçu RJ, 26255-140",
  hours: "Segunda à Sexta 09:00 - 18:00 / Sábado 09:00 - 12:00",
  phone: "(21) 98728-8581"
};

export const DRA_BIO = "Sou Dra Luana Paiva, biomédica esteta especializada em procedimentos que realçam a beleza natural e elevam a autoestima dos meus pacientes. Trabalho com técnicas modernas e seguras, incluindo preenchimento facial, Botox, capilar, corporal e microvasos e tratamentos de pele, sempre com foco em resultados naturais e personalizados. Meu objetivo é proporcionar uma experiência de cuidado completa, combinando expertise, atenção e conforto, para que cada paciente se sinta confiante e satisfeito com sua transformação.";

export const QUESTIONS: Question[] = [
  {
    id: 'area_focus',
    type: QuestionType.SINGLE_CHOICE,
    question: 'Olhando no espelho AGORA, o que você eliminaria imediatamente se pudesse?',
    subtext: 'Seja sincera. Para te ajudar, precisamos saber onde está sua maior dor.',
    options: [
      { 
        id: 'abdomen', 
        label: 'Barriga (Pochete)', 
        image: 'https://i.ibb.co/2Y6JmpcJ/gordura-localizada-como-eliminar-650x350.avif',
        description: 'Aquela gordura que marca na roupa, dobra quando você senta e não sai nem com dieta.'
      },
      { 
        id: 'flanks', 
        label: 'Cintura (Pneuzinhos)', 
        image: 'https://i.ibb.co/vxMskJNR/gordura-localizada-barriga-450x350-orig-1.jpg',
        description: 'Gordura lateral que deforma sua silhueta e te impede de usar roupas mais justas.'
      },
      { 
        id: 'arms', 
        label: 'Braços (Tchauzinho)', 
        image: 'https://i.ibb.co/gLmxY0hB/5fc1922629c813402f29dd8e-Novo-Instagram-Omega4.png',
        description: 'A insegurança de dar tchau ou usar blusas de alça por causa da flacidez e volume.'
      },
      { 
        id: 'thighs', 
        label: 'Interno de Coxa', 
        image: 'https://i.ibb.co/1YdLVYx9/20181009-coxa-parte-interna-gordura-0317-1400x800.jpg',
        description: 'O desconforto do atrito ao andar e a dificuldade em encontrar calças que vistam bem.'
      },
    ],
  },
  {
    id: 'weight_current',
    type: QuestionType.INPUT_NUMBER,
    question: 'Qual é o seu PESO ATUAL?',
    subtext: 'Utilizamos este dado para calcular seu IMC e definir o protocolo ideal.',
    inputPlaceholder: 'Ex: 65.5',
    inputUnit: 'kg',
    min: 30,
    max: 200
  },
  {
    id: 'weight_desired',
    type: QuestionType.INPUT_NUMBER,
    question: 'Qual é o seu PESO DOS SONHOS?',
    subtext: 'Onde você quer chegar? Defina sua meta.',
    inputPlaceholder: 'Ex: 58.0',
    inputUnit: 'kg',
    min: 30,
    max: 200
  },
  {
    id: 'height',
    type: QuestionType.INPUT_NUMBER,
    question: 'Qual é a sua ALTURA?',
    subtext: 'Digite em metros (ex: 1.65). Importante para análise de proporção corporal.',
    inputPlaceholder: '1.65',
    inputUnit: 'm',
    min: 1,
    max: 2.5
  },
  {
    id: 'bmi_diagnosis',
    type: QuestionType.INFO,
    question: 'Análise de IMC & Perfil Corporal', 
    subtext: 'Calculando seu diagnóstico personalizado...',
    infoImage: 'https://i.ibb.co/8L3q5Mv3/body-composition.webp' 
  },
  {
    id: 'info_fat_types',
    type: QuestionType.INFO,
    question: 'Você não tem culpa de não conseguir emagrecer essa área.',
    subtext: 'Existe uma diferença crucial: Gordura Visceral vs. Gordura Compacta. A gordura compacta é um tecido fibroso, pobre em circulação. Ela "trava" e não sai com dietas comuns. É exatamente essa que vamos atacar.',
    infoImage: 'https://i.ibb.co/KxSDHp9j/Image-fx.jpg'
  },
  {
    id: 'diet_history',
    type: QuestionType.SINGLE_CHOICE,
    question: 'Como você descreve sua luta contra a balança?',
    options: [
      { id: 'yoyo', label: 'Efeito Sanfona: Emagreço, mas ganho tudo de volta rápido.', icon: <Activity className="w-5 h-5"/> },
      { id: 'strict', label: 'Esforço em vão: Faço dieta, treino, mas a barriga continua lá.', icon: <Ban className="w-5 h-5"/> },
      { id: 'metabolism', label: 'Metabolismo Lento: Sinto que meu corpo parou de queimar gordura.', icon: <Clock className="w-5 h-5"/> },
      { id: 'start', label: 'Estou começando agora e não quero perder tempo errando.', icon: <Target className="w-5 h-5"/> },
    ],
  },
  {
    id: 'upcoming_event',
    type: QuestionType.SINGLE_CHOICE,
    question: 'Por que você decidiu que BASTA e precisa mudar agora?',
    subtext: 'Identificar seu motivador real aumenta em 80% sua chance de sucesso.',
    options: [
      { id: 'shame', label: 'Não me reconheço mais no espelho e quero resgatar minha autoestima.', icon: <User className="w-5 h-5"/> },
      { id: 'event', label: 'Tenho um evento/viagem importante e não quero ir me sentindo mal.', icon: <Calendar className="w-5 h-5"/> },
      { id: 'summer', label: 'O verão está chegando e tenho pavor de colocar biquíni hoje.', icon: <Star className="w-5 h-5"/> },
    ],
  },
  {
    id: 'clothing_pain',
    type: QuestionType.SINGLE_CHOICE,
    question: 'Qual destas situações te causa mais constrangimento hoje?',
    subtext: 'Este é um ambiente seguro, seja honesta.',
    options: [
      { id: 'tight_jeans', label: 'Sentar e sentir a calça apertando, dividindo a barriga.', icon: <AlertTriangle className="w-5 h-5" /> },
      { id: 'fitting_room', label: 'Experimentar roupas e sair da loja frustrada porque nada ficou bom.', icon: <Ban className="w-5 h-5" /> },
      { id: 'photos', label: 'Fugir de fotos de corpo inteiro ou se esconder atrás de outras pessoas.', icon: <Zap className="w-5 h-5" /> },
      { id: 'intimacy', label: 'Vergonha de mostrar o corpo até para o parceiro(a).', icon: <Heart className="w-5 h-5" /> },
    ],
  },
  {
    id: 'info_cortisol',
    type: QuestionType.INFO,
    question: 'O Ciclo do Estresse x Gordura',
    subtext: 'Você sabia que o estresse libera Cortisol, um hormônio que literalmente OBRIGA seu corpo a estocar gordura na barriga como proteção? Se você é ansiosa, dietas restritivas podem estar PIORANDO seu caso.',
    infoImage: 'https://i.ibb.co/JR6GGZdF/Image-fx.jpg' 
  },
  {
    id: 'emotional_eating',
    type: QuestionType.SINGLE_CHOICE,
    question: 'Você sente que a ansiedade sabota seus resultados?',
    options: [
      { id: 'often', label: 'Sim, desconto tudo na comida (doces/massas) quando estou nervosa.', icon: <Brain className="w-5 h-5"/> },
      { id: 'sometimes', label: 'Às vezes perco o controle no fim do dia.', icon: <Activity className="w-5 h-5"/> },
      { id: 'rarely', label: 'Não, meu problema é puramente metabólico/localizado.', icon: <Scale className="w-5 h-5"/> },
    ],
  },
  {
    id: 'attempts',
    type: QuestionType.SINGLE_CHOICE,
    question: 'O que mais te frustrou nas tentativas anteriores?',
    options: [
      { id: 'money_waste', label: 'Gastei dinheiro com remédios/chás/cintas que não funcionaram.' },
      { id: 'gym_fail', label: 'Me matei na academia e a gordura localizada não saiu.' },
      { id: 'esthetic_fail', label: 'Fiz tratamentos estéticos fracos que não deram resultado.' },
      { id: 'fear', label: 'Tenho medo de cirurgias invasivas (Lipo), busco algo seguro.' },
    ],
  },
  {
    id: 'expectation',
    type: QuestionType.SINGLE_CHOICE,
    question: 'Qual é o seu SONHO de corpo hoje?',
    options: [
      { id: 'clothes', label: 'Voltar a usar minhas roupas antigas sem nada apertando.' },
      { id: 'natural', label: 'Corpo modelado, cintura fina, mas com aspecto natural.' },
      { id: 'radical', label: 'Barriga "Negativa" ou "Chapada" (estilo Lipo LAD).' },
    ],
  },
  {
    id: 'info_mechanism',
    type: QuestionType.INFO,
    question: 'A Solução: Liquefação da Gordura',
    subtext: 'Imagine tentar beber gelo com um canudo. É impossível. Nossa tecnologia de Hidrolipoclasia transforma essa gordura sólida e fibrosa em líquido, permitindo que seu corpo a elimine naturalmente na urina. Sem cortes, sem internação.',
    infoImage: 'https://i.ibb.co/SwbkpB6X/Image-fx-1.jpg'
  },
  {
    id: 'previous_surgery',
    type: QuestionType.SINGLE_CHOICE,
    question: 'Por segurança, precisamos saber:',
    subtext: 'Você tem histórico de cirurgias na região?',
    options: [
      { id: 'no', label: 'Não, nunca fiz cirurgias na área.' },
      { id: 'lipo', label: 'Sim, já fiz Lipoaspiração (e a gordura voltou).' },
      { id: 'abdo', label: 'Sim, fiz Abdominoplastia.' },
      { id: 'c_section', label: 'Apenas Cesárea.' },
    ],
  },
  {
    id: 'support_system',
    type: QuestionType.SINGLE_CHOICE,
    question: 'Para atingir esse resultado, quem te apoia hoje?',
    options: [
      { id: 'self', label: 'Eu mesma tomo minhas decisões e invisto em mim.', icon: <User className="w-5 h-5"/> },
      { id: 'partner', label: 'Geralmente converso com meu marido/parceiro.', icon: <Users className="w-5 h-5"/> },
      { id: 'family', label: 'Conto com ajuda da família.', icon: <Heart className="w-5 h-5"/> },
    ],
  },
  {
    id: 'urgency',
    type: QuestionType.SINGLE_CHOICE,
    question: 'Sendo 100% honesta: O quanto isso é uma PRIORIDADE pra você?',
    subtext: 'Nossa agenda é limitada. Damos prioridade para quem está decidida.',
    options: [
      { id: 'high', label: 'URGENTE (10): Não aguento mais um dia assim, preciso resolver.' },
      { id: 'medium', label: 'MODERADA (7): Me incomoda muito, mas tenho algumas dúvidas.' },
      { id: 'low', label: 'BAIXA (5): Estou apenas pesquisando preços.' },
    ],
  },
  {
    id: 'lead_capture',
    type: QuestionType.LEAD_CAPTURE,
    question: 'Análise Concluída! Onde enviamos seu diagnóstico?',
    subtext: 'Insira seu WhatsApp para receber a avaliação da Dra. Luana e destravar sua condição especial.',
  }
];

export const VSL_SCRIPT = {
  headline: "DIAGNÓSTICO: Gordura Compacta Resistente Detectada.",
  subheadline: "Não é culpa da sua falta de esforço. Entenda por que dietas falham no seu caso e como eliminar essa gordura sem cirurgia.",
  benefits: [
    { title: "Sem Cortes", desc: "Procedimento minimamente invasivo e seguro." },
    { title: "Recuperação Imediata", desc: "Volte à rotina de trabalho no mesmo dia." },
    { title: "Resultados Rápidos", desc: "Redução de medidas visível nas primeiras sessões." }
  ],
  offer: `O resultado do seu teste confirmou: você tem Gordura Compacta Resistente. É por isso que dietas comuns não funcionam nessa área específica.
  
  A Dra. Luana preparou uma condição especial de Hidrolipoclasia para o seu perfil.`,
};

export const REVIEWS = [
  {
    name: "Carolina Mendes",
    text: "Eu já tinha tentado de tudo. A Dra. Luana foi a única que resolveu minha pochete. Na segunda sessão já perdi 4cm. O atendimento é impecável!",
    stars: 5,
    date: "há 2 semanas"
  },
  {
    name: "Fernanda Souza",
    text: "Morria de medo de Lipo. A Hidrolipo foi a melhor escolha da minha vida. Indolor, rápido e o resultado nos flancos foi incrível. Voltei a usar biquíni sem vergonha.",
    stars: 5,
    date: "há 1 mês"
  },
  {
    name: "Beatriz Oliveira",
    text: "Clínica linda e profissionais que passam muita segurança. Elas não te vendem sonho, entregam resultado. Minha cintura afinou muito!",
    stars: 5,
    date: "há 3 semanas"
  },
  {
    name: "Juliana Martins",
    text: "Investimento que vale cada centavo. Recuperei minha autoestima depois da gravidez graças ao protocolo da Bellavance.",
    stars: 5,
    date: "há 2 meses"
  },
  {
    name: "Patrícia Lima",
    text: "Estou apaixonada pelo meu resultado. Ambiente sofisticado e a Dra é um amor. Recomendo de olhos fechados.",
    stars: 5,
    date: "há 5 dias"
  }
];

export const FAQ = [
  {
    question: "O procedimento dói?",
    answer: "O desconforto é mínimo. Utilizamos uma solução anestésica local (tumescente) que torna o procedimento muito tranquilo e tolerável."
  },
  {
    question: "Quantas sessões são necessárias?",
    answer: "Varia de acordo com a quantidade de gordura, mas nossos protocolos geralmente variam entre 3 a 5 sessões para resultados expressivos."
  },
  {
    question: "Preciso usar cinta modeladora?",
    answer: "Sim, o uso da cinta é fundamental nos dias seguintes para garantir que a pele retraia corretamente e modele a cintura."
  },
  {
    question: "Posso trabalhar no dia seguinte?",
    answer: "Sim! Diferente da lipoaspiração tradicional, a recuperação é imediata. Você pode voltar às suas atividades normais (exceto exercícios pesados) no mesmo dia."
  },
  {
    question: "Quais são os cuidados pós-procedimento?",
    answer: "É necessário usar a cinta modeladora pelo tempo indicado, realizar as sessões de drenagem linfática inclusas no pacote e evitar exposição solar na área tratada enquanto houver hematomas."
  },
  {
    question: "Existem contraindicações?",
    answer: "Sim. Gestantes, lactantes, portadores de marcapasso, pessoas com infecções ativas na pele ou doenças autoimunes descontroladas devem passar por avaliação prévia específica."
  },
  {
    question: "Em quanto tempo vejo o resultado final?",
    answer: "Os resultados começam a aparecer logo após a primeira sessão (redução de inchaço), mas o resultado final de modelagem e retração da pele é observado geralmente 30 dias após o término do protocolo."
  }
];

export const OFFER_DETAILS = {
  oldPrice: 450.00,
  newPrice: 150.00,
  installments: 2,
  installmentValue: 75.00,
  title: "Sessão Especial de Hidrolipo",
  items: [
    "1 Sessão de Hidrolipoclasia Focalizada",
    "BÔNUS: Aplicação de Manta Térmica Inclusa",
    "Drenagem Linfática Localizada",
    "Avaliação de Bioimpedância Grátis"
  ],
  paymentMethods: ["Cartão de Crédito", "Cartão de Débito", "PIX", "Dinheiro"]
};
