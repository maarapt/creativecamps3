import { useEffect, useState } from "react";

const ONBOARDING_SLIDES = [
  {
    title: "Olá! Bem-vind@ ao Creative Camps® 3.",
    body: "Tudo o que precisas para acompanhar a experiência do camp num só sítio.",
  },
  {
    title: "Esta aplicação foi pensada ao pormenor para melhorar a tua experiência.",
    body: "Uma forma mais simples de acompanhar informação importante ao longo dos dias.",
  },
  {
    title: "Aqui vais poder descobrir grupos, consultar ementas e dar feedback.",
    body: "O conteúdo vai sendo atualizado durante o evento, de forma clara e rápida.",
  },
];

const GROUP_OPTIONS = [
  "Grupo A",
  "Grupo B",
  "Grupo C",
  "Grupo D",
  "Grupo E",
  "Grupo F",
  "Grupo G",
  "Grupo H",
];

const ACCOUNT_STATUS_OPTIONS = ["Conta pendente", "Conta criada"];
const SESSION_STORAGE_KEY = "creative-camps-3-session";
const PARTICIPANTS_STORAGE_KEY = "creative-camps-3-participants";
const GROUPS_STORAGE_KEY = "creative-camps-3-groups";
const STAFF_ACCOUNTS_STORAGE_KEY = "creative-camps-3-staff-accounts";
const MENTOR_ACCOUNTS_STORAGE_KEY = "creative-camps-3-mentor-accounts";
const PARTICIPANT_FEEDBACK_STORAGE_KEY = "creative-camps-3-participant-feedback";
const AUTH_RESET_VERSION_KEY = "creative-camps-3-auth-reset-version";
const AUTH_RESET_VERSION = "2026-04-21-pending-reset";
const GROUP_DAY_OPTIONS = ["25", "26", "27"];
const GROUP_PERIOD_OPTIONS = ["Manhã", "Tarde", "Noite"];

const STAFF_DIRECTORY = {
  "danieldacruz@maara.pt": {
    name: "Daniel da Cruz",
    role: "staff",
    accountStatus: "Conta pendente",
  },
  "sofiacecilio@maara.pt": {
    name: "Sofia Cecílio",
    role: "staff",
    accountStatus: "Conta pendente",
  },
  "mariabarreira@maara.pt": {
    name: "Maria Barreira",
    role: "staff",
    accountStatus: "Conta pendente",
  },
  "gadunhas@maara.pt": {
    name: "G. Adunhas",
    role: "staff",
    accountStatus: "Conta pendente",
  },
};

const ROOMS = [
  { id: "room-1", name: "Quarto 1", location: "Casa principal" },
  { id: "room-2", name: "Quarto 2", location: "Casa principal" },
  { id: "room-3", name: "Quarto 3", location: "Casa principal" },
  { id: "room-4", name: "Quarto 4", location: "Alpendre" },
  { id: "room-5", name: "Quarto 5", location: "Alpendre" },
  { id: "room-6", name: "Quarto 6", location: "Alpendre" },
  { id: "room-7", name: "Quarto 7", location: "Alpendre" },
  { id: "room-8", name: "Quarto 8", location: "Alpendre" },
];

const ROOM_STATIC_OCCUPANTS = {
  "room-7": ["Francisco Marques", "TOMMAS"],
  "room-8": ["Zé e Marcos (Fotografia)"],
};

const INITIAL_PARTICIPANTS = [
  {
    id: "participant-1",
    name: "José Portela",
    email: "jpmp3000@gmail.com",
    instagram: "@theportasog",
    group: "Grupo A",
    roomId: "room-1",
    accountStatus: "Conta pendente",
    notes: "Chegada confirmada.",
  },
  {
    id: "participant-2",
    name: "Luís Sá",
    email: "luis.sa.music@gmail.com",
    instagram: "@_luis.f.sa_",
    group: "Grupo B",
    roomId: "room-6",
    accountStatus: "Conta pendente",
    notes: "Confirmar horário de chegada.",
  },
  {
    id: "participant-3",
    name: "Carolina Gama",
    email: "carolinaalmeidagama@gmail.com",
    instagram: "@so_marte",
    group: "Grupo C",
    roomId: "room-5",
    accountStatus: "Conta pendente",
    notes: "Preferência alimentar comunicada.",
  },
  {
    id: "participant-4",
    name: "Rafael Alves",
    email: "rafaelsequeiralves@gmail.com",
    instagram: "@_rafaelsequeira",
    group: "Grupo D",
    roomId: "room-4",
    accountStatus: "Conta pendente",
    notes: "",
  },
  {
    id: "participant-5",
    name: "Ludovic dos Santos",
    email: "dossantos.ludovic@gmail.com",
    instagram: "@luvisantosmusic",
    group: "Grupo E",
    roomId: "room-6",
    accountStatus: "Conta pendente",
    notes: "Atribuição de grupo pronta para validação.",
  },
  {
    id: "participant-6",
    name: "Joana Banza",
    email: "joanabbanza@gmail.com",
    instagram: "@joanabbanza",
    group: "Grupo F",
    roomId: "room-2",
    accountStatus: "Conta pendente",
    notes: "",
  },
  {
    id: "participant-7",
    name: "Carolina Dias",
    displayName: "Mê.Lo",
    email: "carolina.melodias@gmail.com",
    instagram: "@me.lo__",
    group: "Grupo G",
    roomId: "room-2",
    accountStatus: "Conta pendente",
    notes: "",
  },
  {
    id: "participant-8",
    name: "Catarina Brandão",
    email: "catarina.g.brandao@gmail.com",
    instagram: "@catarinagb12",
    group: "Grupo H",
    roomId: "room-3",
    accountStatus: "Conta pendente",
    notes: "Enviar briefing final.",
  },
  {
    id: "participant-9",
    name: "Margarida Castanheira",
    email: "margaridacastanheiraaa@gmail.com",
    instagram: "@heyitsguida",
    group: "Grupo A",
    roomId: "room-3",
    accountStatus: "Conta pendente",
    notes: "",
  },
  {
    id: "participant-10",
    name: "André Pereira",
    email: "afap2003@gmail.com",
    instagram: "@andrrepereira_",
    group: "Grupo B",
    roomId: "room-4",
    accountStatus: "Conta pendente",
    notes: "",
  },
  {
    id: "participant-11",
    name: "David Santos",
    displayName: "Swaintz",
    email: "prodbyswaintz@gmail.com",
    instagram: "@swaintzz",
    group: "Grupo C",
    roomId: "room-1",
    accountStatus: "Conta pendente",
    notes: "Necessita confirmação de upload final.",
  },
  {
    id: "participant-12",
    name: "José Luís Monteiro",
    email: "aboutjlm.info@gmail.com",
    instagram: "@aboutjlm",
    group: "Grupo D",
    roomId: "room-1",
    accountStatus: "Conta pendente",
    notes: "",
  },
  {
    id: "participant-13",
    name: "Natacha Duarte",
    email: "natachaduartecruz@gmail.com",
    instagram: "@_natachaduarte",
    group: "Grupo E",
    roomId: "room-5",
    accountStatus: "Conta pendente",
    notes: "Feedback de chegada já recolhido.",
  },
  {
    id: "participant-14",
    name: "Putto",
    email: "puttobooking@gmail.com",
    instagram: "@putto_56",
    group: "Grupo F",
    roomId: "room-1",
    accountStatus: "Conta pendente",
    notes: "",
  },
];

const PARTICIPANT_DIRECTORY = INITIAL_PARTICIPANTS.reduce((accumulator, participant) => {
  accumulator[normalizeEmail(participant.email)] = participant;
  return accumulator;
}, {});

const MENTORS = [
  {
    id: "mentor-1",
    name: "Francisco Marques",
    email: "franciscomarques.mentor@maara.pt",
    date: "25 a 28 junho",
    instagram: "@next.level.prod",
    instagramUrl: "https://www.instagram.com/next.level.prod/",
  },
  {
    id: "mentor-2",
    name: "Tommas",
    email: "tommas.mentor@maara.pt",
    date: "25 a 28 junho",
    instagram: "@tommasmusic",
    instagramUrl: "https://www.instagram.com/tommasmusic/",
  },
  {
    id: "mentor-3",
    name: "Inês Apenas",
    email: "inesapenas.mentor@maara.pt",
    date: "26 junho",
    instagram: "@ines___apenas",
    instagramUrl: "https://www.instagram.com/ines___apenas/",
  },
  {
    id: "mentor-4",
    name: "Luar",
    email: "luarmusic.mentor@maara.pt",
    date: "27 junho",
    instagram: "@luarmusic_",
    instagramUrl: "https://www.instagram.com/luarmusic_/",
  },
];

const MENTOR_DIRECTORY = MENTORS.reduce((accumulator, mentor) => {
  accumulator[normalizeEmail(mentor.email)] = mentor;
  return accumulator;
}, {});

const STAFF_SECTIONS = [
  {
    id: "home",
    title: "Home Staff",
    description: "Visão geral do camp e acessos rápidos.",
  },
  {
    id: "participants",
    title: "Participantes",
    description: "Gerir contas, grupos, quartos e notas internas.",
  },
  {
    id: "mentors",
    title: "Mentores",
    description: "Consulta rápida da equipa criativa convidada.",
  },
  {
    id: "groups",
    title: "Grupos",
    description: "Estrutura base dos oito grupos do evento.",
  },
  {
    id: "rooms",
    title: "Quartos",
    description: "Atribuir participantes e acompanhar ocupação.",
  },
  {
    id: "sessions",
    title: "Programa Geral",
    description: "Alternar entre programa geral e plano interno.",
  },
  {
    id: "catering",
    title: "Catering",
    description: "Menus por dia e notas logísticas essenciais.",
  },
  {
    id: "challenges",
    title: "Desafios",
    description: "Área preparada para a gestão dos desafios.",
  },
  {
    id: "feedback",
    title: "Feedback",
    description: "Espaço pronto para recolha e leitura de feedback.",
  },
  {
    id: "uploads",
    title: "Avaliações",
    description: "Placeholder para materiais e avaliação interna.",
  },
];

const STAFF_METRICS = [
  { label: "Participantes", sectionId: "participants" },
  { label: "Mentores", sectionId: "mentors" },
  { label: "Grupos", sectionId: "groups" },
  { label: "Programa Geral", sectionId: "sessions" },
];

const PARTICIPANT_SECTIONS = [
  {
    id: "mentors",
    title: "Mentores",
    description: "Equipa criativa confirmada para o camp.",
  },
  {
    id: "participants",
    title: "Participantes",
    description: "Lista de participantes do Creative Camps® 3.",
  },
  {
    id: "sessions",
    title: "Programa Geral",
    description: "Consultar o programa geral do evento.",
  },
  {
    id: "groups",
    title: "Grupos",
    description: "Ver se estás num grupo e quem está contigo na sessão.",
  },
  {
    id: "catering",
    title: "Catering",
    description: "Menus por dia e notas importantes.",
  },
  {
    id: "feedback",
    title: "Feedback",
    description: "Espaço preparado para dar feedback ao longo do camp.",
  },
];

const GENERAL_PROGRAM = [
  {
    day: "Dia 25 — Chegar & ligar",
    items: [
      "16h — Check-in",
      "Welcome drink",
      "Apresentação do camp",
      "Jantar",
      "Noite — Experiência surpresa",
    ],
  },
  {
    day: "Dia 26 — Criar & aprofundar",
    items: [
      "09h — Pequeno-almoço",
      "10h–13h — Sessão de estúdio",
      "13h30–14h30 — Almoço",
      "15h–19h — Sessão criativa",
      "19h30–20h — Listening session",
      "20h–21h30 — Jantar",
      "22h–23h30 — Momento de partilha",
    ],
  },
  {
    day: "Dia 27 — Explorar & surpreender",
    items: [
      "Manhã livre",
      "12h30–13h30 — Almoço",
      "15h–19h — Sessão de estúdio",
      "19h–21h — Convívio + jantar",
      "21h–00h — Sessão especial",
    ],
  },
  {
    day: "Dia 28 — Fecho",
    items: ["09h — Pequeno-almoço", "Até às 11h — Check-out"],
  },
];

const INTERNAL_PLAN = [
  {
    day: "Dia 25 — Chegada, desbloqueio e conexão",
    items: [
      "17h00 — Check-in + Welcome Drink",
      "Receção informal + fotografia à chegada",
      "Apresentação MAARA + apresentação dos mentores",
      "Explicação geral da dinâmica",
      "Dinâmica de grupo leve",
      "Jantar",
      "Noite — Sessão surpresa",
    ],
  },
  {
    day: "Dia 26 — Criação e pressão criativa",
    items: [
      "09h00 — Pequeno-almoço",
      "10h00–13h00 — Dinâmica dos Envelopes",
      "13h30–14h30 — Almoço",
      "15h00–19h00 — Desafio SUMOL (Jingle)",
      "19h30–20h00 — Listening Session",
      "20h00–21h30 — Jantar",
      "22h00–23h30 — Conversa Guiada MAARA",
    ],
  },
  {
    day: "Dia 27 — Interpretação e recriação",
    items: [
      "Manhã livre",
      "12h30–13h30 — Almoço",
      "15h00–19h00 — Sessão criativa",
      "19h00–21h00 — Convívio + jantar",
      "21h00–00h00 — Sessão noturna",
    ],
  },
  {
    day: "Dia 28 — Fecho",
    items: [
      "09h00 — Pequeno-almoço",
      "Até às 11h00 — Check-out",
      "Sem sessões criativas",
    ],
  },
];

const CATERING_DAYS = [
  {
    day: "Dia 25",
    details: [
      "Welcome drink + aperitivos",
      "Bebidas: sumos naturais, mimosas, água lisa e aromatizada, Super Bock mini",
      "Aperitivos: canapés diversos e salgadinhos",
      "Jantar: creme de legumes, bacalhau com natas com salada, doce e fruta",
    ],
  },
  {
    day: "Dia 26",
    details: [
      "Bebidas almoço e jantar: sumos naturais, água lisa e aromatizada, Super Bock mini, refrigerantes",
      "Almoço: brunch",
      "Jantar: caldo verde, arroz de pato com salada, doce e fruta",
    ],
  },
  {
    day: "Dia 27",
    details: [
      "Bebidas almoço e jantar: sumos naturais, água lisa e aromatizada, Super Bock mini, refrigerantes",
      "Almoço: saladas diversas, sandes diversas e salgadinhos, doce e fruta",
      "Jantar: creme de legumes, arroz de tomate com panadinhos, doce e fruta",
    ],
  },
];

const CATERING_NOTES = [
  "Menus ajustáveis a restrições alimentares.",
  "Comunicar intolerâncias e alergias com antecedência.",
  "Incluído no serviço: montagem, decoração da mesa, marcador de alimentos, guardanapos, deslocação e apoio permanente.",
  "Não incluído: cadeiras, mesas, copos, talheres e pratos.",
  "Observação: 8 garrafas de vinho branco distribuídas pelas várias refeições.",
];

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function getRoomLabel(roomId) {
  const room = ROOMS.find((item) => item.id === roomId);
  return room ? `${room.name} — ${room.location}` : "Sem quarto atribuído";
}

function getParticipantDisplayName(participant) {
  return participant.displayName ?? participant.name;
}

function getParticipantRoomLabel(participant) {
  if (participant.displayName && participant.displayName !== participant.name) {
    return `${participant.displayName} (${participant.name})`;
  }

  return participant.name;
}

function getRoomStaticOccupants(roomId) {
  return ROOM_STATIC_OCCUPANTS[roomId] ?? [];
}

function getInstagramUrl(handle) {
  if (!handle) {
    return null;
  }

  const normalizedHandle = handle.replace(/^@+/, "").trim();

  if (!normalizedHandle) {
    return null;
  }

  return `https://www.instagram.com/${normalizedHandle}/`;
}

function getInstagramAppUrl(handleOrUrl) {
  if (!handleOrUrl) {
    return null;
  }

  const handleMatch = handleOrUrl.match(/instagram\.com\/([^/?#]+)/i);
  const normalizedHandle = handleMatch
    ? handleMatch[1]
    : handleOrUrl.replace(/^@+/, "").trim();

  if (!normalizedHandle) {
    return null;
  }

  return `instagram://user?username=${normalizedHandle}`;
}

function getMentorName(mentorId) {
  return MENTORS.find((mentor) => mentor.id === mentorId)?.name ?? "Mentor por definir";
}

function getDefaultStudioForMentor(mentorId, day) {
  if (mentorId === "mentor-1") {
    return "Estúdio MAARA";
  }

  if (mentorId === "mentor-2") {
    return "Estúdio VILLAGE";
  }

  if (mentorId === "mentor-3" && day === "26") {
    return "Estúdio Sumol";
  }

  if (mentorId === "mentor-4" && day === "27") {
    return "Estúdio Sumol";
  }

  return "";
}

function getAllowedPeriodsForDay(day) {
  if (day === "27") {
    return GROUP_PERIOD_OPTIONS.filter((period) => period !== "Manhã");
  }

  return GROUP_PERIOD_OPTIONS;
}

function normalizePeriodForDay(day, period) {
  const allowedPeriods = getAllowedPeriodsForDay(day);
  return allowedPeriods.includes(period) ? period : allowedPeriods[0];
}

function getForcedDayForMentor(mentorId) {
  if (mentorId === "mentor-3") {
    return "26";
  }

  if (mentorId === "mentor-4") {
    return "27";
  }

  return null;
}

function getDefaultStaffAccounts() {
  return Object.fromEntries(
    Object.entries(STAFF_DIRECTORY).map(([email, record]) => [email, record.accountStatus]),
  );
}

function getDefaultMentorAccounts() {
  return Object.fromEntries(
    MENTORS.map((mentor) => [normalizeEmail(mentor.email), "Conta pendente"]),
  );
}

function isAuthResetVersionCurrent() {
  if (typeof window === "undefined") {
    return true;
  }

  return (
    window.localStorage.getItem(AUTH_RESET_VERSION_KEY) === AUTH_RESET_VERSION
  );
}

function getStoredStaffAccounts() {
  if (typeof window === "undefined") {
    return getDefaultStaffAccounts();
  }

  if (!isAuthResetVersionCurrent()) {
    return getDefaultStaffAccounts();
  }

  const rawStaffAccounts = window.localStorage.getItem(STAFF_ACCOUNTS_STORAGE_KEY);

  if (!rawStaffAccounts) {
    return getDefaultStaffAccounts();
  }

  try {
    return {
      ...getDefaultStaffAccounts(),
      ...JSON.parse(rawStaffAccounts),
    };
  } catch {
    return getDefaultStaffAccounts();
  }
}

function getStoredMentorAccounts() {
  if (typeof window === "undefined") {
    return getDefaultMentorAccounts();
  }

  if (!isAuthResetVersionCurrent()) {
    return getDefaultMentorAccounts();
  }

  const rawMentorAccounts = window.localStorage.getItem(MENTOR_ACCOUNTS_STORAGE_KEY);

  if (!rawMentorAccounts) {
    return getDefaultMentorAccounts();
  }

  try {
    return {
      ...getDefaultMentorAccounts(),
      ...JSON.parse(rawMentorAccounts),
    };
  } catch {
    return getDefaultMentorAccounts();
  }
}

function getMentorStudioRuleLabel(mentorId) {
  if (mentorId === "mentor-1") {
    return "Francisco Marques fica no Estúdio MAARA.";
  }

  if (mentorId === "mentor-2") {
    return "TOMMAS fica no Estúdio VILLAGE.";
  }

  if (mentorId === "mentor-3") {
    return "Inês Apenas fica no Estúdio Sumol no dia 26.";
  }

  if (mentorId === "mentor-4") {
    return "Luar fica no Estúdio Sumol no dia 27.";
  }

  return "";
}

function getEmptyGroupDraft() {
  return {
    id: null,
    day: "26",
    period: "Manhã",
    studio: "",
    mentorId: "",
    participantIds: [],
    finalLyrics: "",
    sessionFeedback: "",
    audioUploadName: "",
    audioUploadSizeLabel: "",
    isLocked: false,
  };
}

function canEditFinalLyrics(user) {
  return user?.role === "staff" || user?.role === "mentor";
}

function canLockGroup(user) {
  return user?.role === "staff";
}

function getFeedbackStorageKey(user, participant) {
  if (participant?.id) {
    return participant.id;
  }

  return user?.email ?? "";
}

function openInstagramProfile(handle) {
  const instagramUrl = getInstagramUrl(handle);
  openExternalUrl(instagramUrl, { mobileAppUrl: getInstagramAppUrl(handle) });
}

function openExternalUrl(url, options = {}) {
  if (!url || typeof window === "undefined") {
    return;
  }

  const userAgent = window.navigator.userAgent || "";
  const isMobileDevice = /android|iphone|ipad|ipod/i.test(userAgent);

  if (isMobileDevice && options.mobileAppUrl) {
    const fallbackTimeout = window.setTimeout(() => {
      window.location.assign(url);
    }, 700);

    const cancelFallback = () => {
      window.clearTimeout(fallbackTimeout);
      window.removeEventListener("pagehide", cancelFallback);
      window.removeEventListener("blur", cancelFallback);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        cancelFallback();
      }
    };

    window.addEventListener("pagehide", cancelFallback);
    window.addEventListener("blur", cancelFallback);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.location.assign(options.mobileAppUrl);
    return;
  }

  const newWindow = window.open(url, "_blank", "noopener,noreferrer");

  if (!newWindow) {
    window.location.assign(url);
  }
}

function normalizeStoredParticipants(storedParticipants) {
  const storedParticipantsById = new Map(
    storedParticipants.map((participant) => [participant.id, participant]),
  );

  return INITIAL_PARTICIPANTS.map((participant) => ({
    ...participant,
    ...storedParticipantsById.get(participant.id),
    accountStatus: participant.accountStatus,
  }));
}

function getStoredParticipants() {
  if (typeof window === "undefined") {
    return INITIAL_PARTICIPANTS;
  }

  const rawParticipants = window.localStorage.getItem(PARTICIPANTS_STORAGE_KEY);

  if (!rawParticipants) {
    return INITIAL_PARTICIPANTS;
  }

  try {
    return normalizeStoredParticipants(JSON.parse(rawParticipants));
  } catch {
    return INITIAL_PARTICIPANTS;
  }
}

function getStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!isAuthResetVersionCurrent()) {
    return null;
  }

  const rawSession = window.localStorage.getItem(SESSION_STORAGE_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession);
  } catch {
    return null;
  }
}

function getStoredGroups() {
  if (typeof window === "undefined") {
    return [];
  }

  const rawGroups = window.localStorage.getItem(GROUPS_STORAGE_KEY);

  if (!rawGroups) {
    return [];
  }

  try {
    return JSON.parse(rawGroups).map((group) => ({
      ...group,
      period: normalizePeriodForDay(group.day ?? "26", group.period ?? "Manhã"),
      participantIds: Array.isArray(group.participantIds) ? group.participantIds : [],
      finalLyrics: group.finalLyrics ?? group.sessionNotes ?? "",
      sessionFeedback: group.sessionFeedback ?? "",
      audioUploadName: group.audioUploadName ?? "",
      audioUploadSizeLabel: group.audioUploadSizeLabel ?? "",
      isLocked: Boolean(group.isLocked),
    }));
  } catch {
    return [];
  }
}

function getStoredParticipantFeedback() {
  if (typeof window === "undefined") {
    return {};
  }

  const rawFeedback = window.localStorage.getItem(PARTICIPANT_FEEDBACK_STORAGE_KEY);

  if (!rawFeedback) {
    return {};
  }

  try {
    return JSON.parse(rawFeedback);
  } catch {
    return {};
  }
}

function getAuthStateForEmail(email, participants, staffAccounts, mentorAccounts) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return { mode: "register", isAuthorized: false, label: "" };
  }

  if (STAFF_DIRECTORY[normalizedEmail]) {
    const accountStatus = staffAccounts[normalizedEmail] ?? "Conta pendente";
    return {
      mode: accountStatus === "Conta criada" ? "login" : "register",
      isAuthorized: true,
      label: "staff",
      accountStatus,
    };
  }

  if (MENTOR_DIRECTORY[normalizedEmail]) {
    const accountStatus = mentorAccounts[normalizedEmail] ?? "Conta pendente";
    return {
      mode: accountStatus === "Conta criada" ? "login" : "register",
      isAuthorized: true,
      label: "mentor",
      accountStatus,
    };
  }

  const participantRecord = participants.find(
    (participant) => normalizeEmail(participant.email) === normalizedEmail,
  );

  if (!participantRecord) {
    return { mode: "register", isAuthorized: false, label: "" };
  }

  return {
    mode: participantRecord.accountStatus === "Conta criada" ? "login" : "register",
    isAuthorized: true,
    label: "participant",
    accountStatus: participantRecord.accountStatus,
  };
}

function App() {
  const [hydratedSession] = useState(getStoredSession);
  const [screen, setScreen] = useState("onboarding");
  const [onboardingIndex, setOnboardingIndex] = useState(0);
  const [authScreenMode, setAuthScreenMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerError, setRegisterError] = useState("");
  const [currentUser, setCurrentUser] = useState(hydratedSession?.currentUser ?? null);
  const [participants, setParticipants] = useState(getStoredParticipants);
  const [groups, setGroups] = useState(getStoredGroups);
  const [staffAccounts, setStaffAccounts] = useState(getStoredStaffAccounts);
  const [mentorAccounts, setMentorAccounts] = useState(getStoredMentorAccounts);
  const [participantFeedback, setParticipantFeedback] = useState(getStoredParticipantFeedback);
  const [activeStaffSection, setActiveStaffSection] = useState(
    hydratedSession?.activeStaffSection ?? "home",
  );
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [sessionView, setSessionView] = useState(hydratedSession?.sessionView ?? "general");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (isAuthResetVersionCurrent()) {
      return;
    }

    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    window.localStorage.removeItem(STAFF_ACCOUNTS_STORAGE_KEY);
    window.localStorage.removeItem(MENTOR_ACCOUNTS_STORAGE_KEY);
    window.localStorage.setItem(AUTH_RESET_VERSION_KEY, AUTH_RESET_VERSION);
  }, []);

  useEffect(() => {
    if (hydratedSession?.currentUser?.role === "staff") {
      setScreen("staff");
      return;
    }

    if (hydratedSession?.currentUser?.role === "participant") {
      setScreen("participant");
      return;
    }

    if (hydratedSession?.currentUser?.role === "mentor") {
      setScreen("mentor");
    }
  }, [hydratedSession]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(MENTOR_ACCOUNTS_STORAGE_KEY, JSON.stringify(mentorAccounts));
  }, [mentorAccounts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(PARTICIPANTS_STORAGE_KEY, JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STAFF_ACCOUNTS_STORAGE_KEY, JSON.stringify(staffAccounts));
  }, [staffAccounts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      PARTICIPANT_FEEDBACK_STORAGE_KEY,
      JSON.stringify(participantFeedback),
    );
  }, [participantFeedback]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!currentUser) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({
        currentUser,
        activeStaffSection,
        sessionView,
      }),
    );
  }, [currentUser, activeStaffSection, sessionView]);

  const selectedParticipant =
    participants.find((participant) => participant.id === selectedParticipantId) ?? null;
  const editingRoom = ROOMS.find((room) => room.id === editingRoomId) ?? null;
  const authState = getAuthStateForEmail(
    registerForm.email,
    participants,
    staffAccounts,
    mentorAccounts,
  );
  const effectiveAuthMode = authState.mode === "login" ? "login" : authScreenMode;

  const handleContinue = () => {
    if (onboardingIndex < ONBOARDING_SLIDES.length - 1) {
      setOnboardingIndex((currentIndex) => currentIndex + 1);
      return;
    }

    setScreen("register");
  };

  const handleFieldChange = (field, value) => {
    setRegisterError("");
    setRegisterForm((currentForm) => ({ ...currentForm, [field]: value }));

    if (field === "email") {
      const nextAuthState = getAuthStateForEmail(
        value,
        participants,
        staffAccounts,
        mentorAccounts,
      );

      if (nextAuthState.mode === "login") {
        setAuthScreenMode("login");
      }
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const normalizedEmail = normalizeEmail(registerForm.email);

    if (!normalizedEmail || !registerForm.password) {
      setRegisterError("Preenche os campos necessários para continuar.");
      return;
    }

    if (effectiveAuthMode === "register") {
      if (!registerForm.fullName.trim() || !registerForm.confirmPassword) {
        setRegisterError("Preenche os campos necessários para continuar.");
        return;
      }

      if (registerForm.password !== registerForm.confirmPassword) {
        setRegisterError("As palavras-passe não coincidem.");
        return;
      }
    } else if (authState.mode !== "login") {
      setRegisterError("Este e-mail ainda não tem conta criada. Usa a opção Criar conta.");
      return;
    }

    if (STAFF_DIRECTORY[normalizedEmail]) {
      if (effectiveAuthMode === "register") {
        setStaffAccounts((currentAccounts) => ({
          ...currentAccounts,
          [normalizedEmail]: "Conta criada",
        }));
      }

      setCurrentUser({
        name: registerForm.fullName.trim() || STAFF_DIRECTORY[normalizedEmail].name,
        email: normalizedEmail,
        role: "staff",
        accountStatus: "Conta criada",
      });
      setActiveStaffSection("home");
      setScreen("staff");
      return;
    }

    if (MENTOR_DIRECTORY[normalizedEmail]) {
      if (effectiveAuthMode === "register") {
        setMentorAccounts((currentAccounts) => ({
          ...currentAccounts,
          [normalizedEmail]: "Conta criada",
        }));
      }

      setCurrentUser({
        name: registerForm.fullName.trim() || MENTOR_DIRECTORY[normalizedEmail].name,
        email: normalizedEmail,
        role: "mentor",
        accountStatus: "Conta criada",
      });
      setScreen("mentor");
      return;
    }

    const participantRecord = participants.find(
      (participant) => normalizeEmail(participant.email) === normalizedEmail,
    );

    if (participantRecord) {
      if (effectiveAuthMode === "register") {
        setParticipants((currentParticipants) =>
          currentParticipants.map((participant) =>
            participant.id === participantRecord.id
              ? { ...participant, accountStatus: "Conta criada" }
              : participant,
          ),
        );
      }
      setCurrentUser({
        id: participantRecord.id,
        name: participantRecord.name,
        email: normalizedEmail,
        role: "participant",
      });
      setScreen("participant");
      return;
    }

    setRegisterError("Este e-mail não está autorizado para o Creative Camps® 3.");
  };

  const saveGroup = (groupDraft) => {
    const trimmedStudio = groupDraft.studio.trim();
    const existingGroup = groupDraft.id
      ? groups.find((group) => group.id === groupDraft.id)
      : null;

    if (existingGroup?.isLocked) {
      return {
        ok: false,
        error: "Este grupo está trancado e já não pode ser editado.",
      };
    }

    if (!trimmedStudio || !groupDraft.mentorId) {
      return {
        ok: false,
        error: "Escolhe primeiro um mentor compatível com o dia para o estúdio ser alocado.",
      };
    }

    const sameSlotGroups = groups.filter(
      (group) =>
        group.day === groupDraft.day &&
        group.period === groupDraft.period &&
        group.id !== groupDraft.id,
    );

    if (sameSlotGroups.length >= 3) {
      return {
        ok: false,
        error: "Já existem 3 grupos neste mesmo dia e período.",
      };
    }

    if (sameSlotGroups.some((group) => group.mentorId === groupDraft.mentorId)) {
      return {
        ok: false,
        error: "Esse mentor já está alocado noutro grupo no mesmo slot.",
      };
    }

    if (
      sameSlotGroups.some(
        (group) => group.studio.trim().toLowerCase() === trimmedStudio.toLowerCase(),
      )
    ) {
      return {
        ok: false,
        error: "Esse estúdio já está ocupado noutro grupo no mesmo slot.",
      };
    }

    const sanitizedGroup = {
      ...groupDraft,
      day: groupDraft.day,
      period: normalizePeriodForDay(groupDraft.day, groupDraft.period),
      studio: trimmedStudio,
      participantIds: Array.from(new Set(groupDraft.participantIds)),
      id: groupDraft.id ?? `group-${Date.now()}`,
      isLocked: Boolean(groupDraft.isLocked),
    };

    setGroups((currentGroups) => {
      const nextGroups = sanitizedGroup.id && currentGroups.some((group) => group.id === sanitizedGroup.id)
        ? currentGroups.map((group) =>
            group.id === sanitizedGroup.id ? sanitizedGroup : group,
          )
        : [...currentGroups, sanitizedGroup];

      return nextGroups.map((group) => {
        if (
          group.id === sanitizedGroup.id ||
          group.day !== sanitizedGroup.day ||
          group.period !== sanitizedGroup.period
        ) {
          return group;
        }

        return {
          ...group,
          participantIds: group.participantIds.filter(
            (participantId) => !sanitizedGroup.participantIds.includes(participantId),
          ),
        };
      });
    });

    return { ok: true };
  };

  const deleteGroup = (groupId) => {
    setGroups((currentGroups) =>
      currentGroups.filter((group) => group.id !== groupId || group.isLocked),
    );
  };

  const updateGroup = (groupId, updates) => {
    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              ...(group.isLocked ? {} : updates),
            }
          : group,
      ),
    );
  };

  const updateParticipant = (participantId, updates) => {
    setParticipants((currentParticipants) =>
      currentParticipants.map((participant) =>
        participant.id === participantId
          ? {
              ...participant,
              ...updates,
              roomId: updates.roomId === "" ? null : updates.roomId ?? participant.roomId,
            }
          : participant,
      ),
    );
  };

  const saveRoomAssignments = (roomId, selectedIds) => {
    const selectedSet = new Set(selectedIds);

    setParticipants((currentParticipants) =>
      currentParticipants.map((participant) => {
        if (selectedSet.has(participant.id)) {
          return { ...participant, roomId };
        }

        if (participant.roomId === roomId) {
          return { ...participant, roomId: null };
        }

        return participant;
      }),
    );
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setRegisterError("");
    setRegisterForm({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setAuthScreenMode("login");
    setSelectedParticipantId(null);
    setEditingRoomId(null);
    setActiveStaffSection("home");
    setSessionView("general");
    setScreen("register");
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      {screen === "onboarding" && (
        <OnboardingScreen
          slide={ONBOARDING_SLIDES[onboardingIndex]}
          slideIndex={onboardingIndex}
          totalSlides={ONBOARDING_SLIDES.length}
          onContinue={handleContinue}
        />
      )}

      {screen === "register" && (
        <RegisterScreen
          form={registerForm}
          error={registerError}
          authState={authState}
          authMode={effectiveAuthMode}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          onTogglePassword={() => setShowPassword((currentValue) => !currentValue)}
          onToggleConfirmPassword={() =>
            setShowConfirmPassword((currentValue) => !currentValue)
          }
          onModeChange={setAuthScreenMode}
          onChange={handleFieldChange}
          onSubmit={handleRegister}
        />
      )}

      {screen === "staff" && currentUser?.role === "staff" && (
        <StaffDashboard
          currentUser={currentUser}
          participants={participants}
          groups={groups}
          feedbackEntry={participantFeedback[getFeedbackStorageKey(currentUser)] ?? null}
          onSaveFeedback={(message) =>
            setParticipantFeedback((currentFeedback) => ({
              ...currentFeedback,
              [getFeedbackStorageKey(currentUser)]: {
                message,
                updatedAt: new Date().toISOString(),
              },
            }))
          }
          onSaveGroup={saveGroup}
          onUpdateGroup={updateGroup}
          onSetGroupLock={(groupId, isLocked) =>
            setGroups((currentGroups) =>
              currentGroups.map((group) =>
                group.id === groupId
                  ? {
                      ...group,
                      isLocked,
                    }
                  : group,
              ),
            )
          }
          onDeleteGroup={deleteGroup}
          activeSection={activeStaffSection}
          onSectionChange={setActiveStaffSection}
          onParticipantSelect={setSelectedParticipantId}
          onRoomEdit={setEditingRoomId}
          onLogout={handleLogout}
          sessionView={sessionView}
          onSessionViewChange={setSessionView}
        />
      )}

      {screen === "participant" && currentUser?.role === "participant" && (
        <ParticipantArea
          currentUser={currentUser}
          participants={participants}
          participant={
            participants.find((participant) => participant.id === currentUser.id) ??
            PARTICIPANT_DIRECTORY[currentUser.email]
          }
          groups={groups}
          participantFeedback={participantFeedback}
          onSaveParticipantFeedback={(participantId, message) =>
            setParticipantFeedback((currentFeedback) => ({
              ...currentFeedback,
              [participantId]: {
                message,
                updatedAt: new Date().toISOString(),
              },
            }))
          }
          onLogout={handleLogout}
        />
      )}

      {screen === "mentor" && currentUser?.role === "mentor" && (
        <MentorArea
          currentUser={currentUser}
          participants={participants}
          groups={groups}
          onSaveGroup={saveGroup}
          onUpdateGroup={updateGroup}
          onSetGroupLock={(groupId, isLocked) =>
            setGroups((currentGroups) =>
              currentGroups.map((group) =>
                group.id === groupId
                  ? {
                      ...group,
                      isLocked,
                    }
                  : group,
              ),
            )
          }
          onDeleteGroup={deleteGroup}
          feedbackEntry={participantFeedback[getFeedbackStorageKey(currentUser)] ?? null}
          onSaveFeedback={(message) =>
            setParticipantFeedback((currentFeedback) => ({
              ...currentFeedback,
              [getFeedbackStorageKey(currentUser)]: {
                message,
                updatedAt: new Date().toISOString(),
              },
            }))
          }
          onLogout={handleLogout}
        />
      )}

      <ParticipantModal
        participant={selectedParticipant}
        onClose={() => setSelectedParticipantId(null)}
        onSave={updateParticipant}
      />

      <RoomAssignmentModal
        room={editingRoom}
        participants={participants}
        onClose={() => setEditingRoomId(null)}
        onSave={saveRoomAssignments}
      />
    </div>
  );
}

function OnboardingScreen({ slide, slideIndex, totalSlides, onContinue }) {
  const [showLogoSplash, setShowLogoSplash] = useState(slideIndex === 0);

  useEffect(() => {
    if (slideIndex !== 0) {
      setShowLogoSplash(false);
      return undefined;
    }

    setShowLogoSplash(true);

    const splashTimeout = window.setTimeout(() => {
      setShowLogoSplash(false);
    }, 1500);

    return () => window.clearTimeout(splashTimeout);
  }, [slideIndex]);

  return (
    <main className="screen-frame">
      {showLogoSplash ? (
        <section className="hero-card hero-card--onboarding">
          <div className="logo-splash animated-zoom" aria-label="MAARA">
            <img src="/maara-logo.png" alt="MAARA" className="logo-splash__image" />
          </div>
        </section>
      ) : (
        <div className="onboarding-layout">
          {slideIndex === 0 && (
            <div className="onboarding-logo onboarding-logo--floating animated-slide" aria-label="MAARA">
              <img src="/maara-logo.png" alt="MAARA" className="onboarding-logo__image" />
            </div>
          )}

          <section className="hero-card hero-card--onboarding">
            <div className="hero-brand">
              <span className="eyebrow">MAARA</span>
              <span className="eyebrow subtle">Creative Camps® 3</span>
            </div>

            <div key={slideIndex} className="hero-copy animated-slide">
              <h1>{slide.title}</h1>
              <p>{slide.body}</p>
            </div>

            <div className="progress-row">
              <div className="progress-dots" aria-label="Progresso do onboarding">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <span
                    key={`dot-${index}`}
                    className={`progress-dot ${index === slideIndex ? "active" : ""}`}
                  />
                ))}
              </div>

              <button type="button" className="primary-button" onClick={onContinue}>
                Continuar
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function RegisterScreen({
  form,
  error,
  authState,
  authMode,
  showPassword,
  showConfirmPassword,
  onTogglePassword,
  onToggleConfirmPassword,
  onModeChange,
  onChange,
  onSubmit,
}) {
  const isLoginMode = authMode === "login";

  return (
    <main className="screen-frame">
      <section className="register-card animated-zoom">
        <div className="section-intro">
          <span className="eyebrow">{isLoginMode ? "Iniciar sessão" : "Criar conta"}</span>
          <h1>{isLoginMode ? "Entrar com conta existente" : "Entrada automática por e-mail autorizado"}</h1>
          <p>
            {isLoginMode
              ? "Este e-mail já tem conta criada. Basta iniciar sessão."
              : "O sistema identifica o teu acesso automaticamente. Não existe escolha manual de perfil nesta fase."}
          </p>
        </div>

        <form className="form-grid" onSubmit={onSubmit}>
          {!isLoginMode && (
            <label className="field">
              <span>Nome completo</span>
              <input
                type="text"
                value={form.fullName}
                onChange={(event) => onChange("fullName", event.target.value)}
                placeholder="Escreve o teu nome"
              />
            </label>
          )}

          <label className="field">
            <span>EMAIL</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => onChange("email", event.target.value)}
              placeholder="nome@email.com"
            />
          </label>

          <label className="field">
            <span>PALAVRA PASSE</span>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(event) => onChange("password", event.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={onTogglePassword}
              >
                {showPassword ? "Esconder" : "Mostrar"}
              </button>
            </div>
          </label>

          {!isLoginMode && (
            <label className="field">
              <span>Confirmar palavra-passe</span>
              <div className="password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(event) => onChange("confirmPassword", event.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={onToggleConfirmPassword}
                >
                  {showConfirmPassword ? "Esconder" : "Mostrar"}
                </button>
              </div>
            </label>
          )}

          {error && <p className="form-error">{error}</p>}

          {isLoginMode && authState.mode === "register" && authState.isAuthorized && (
            <p className="helper-text">
              Este e-mail está autorizado, mas ainda não tem conta criada.
            </p>
          )}

          <div className="auth-actions">
            <button type="submit" className="primary-button primary-button--full">
              {isLoginMode ? "INICIAR SESSÃO" : "CRIAR CONTA"}
            </button>

            <button
              type="button"
              className="text-button"
              onClick={() => onModeChange(isLoginMode ? "register" : "login")}
            >
              {isLoginMode ? "CRIAR CONTA" : "INICIAR SESSÃO"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function StaffDashboard({
  currentUser,
  participants,
  groups,
  feedbackEntry,
  onSaveFeedback,
  onSaveGroup,
  onUpdateGroup,
  onSetGroupLock,
  onDeleteGroup,
  activeSection,
  onSectionChange,
  onParticipantSelect,
  onRoomEdit,
  onLogout,
  sessionView,
  onSessionViewChange,
}) {
  const isHomeView = activeSection === "home";
  const metricSectionIds = STAFF_METRICS.map((metric) => metric.sectionId).filter(Boolean);
  const dashboardCards = STAFF_SECTIONS.filter(
    (section) =>
      section.id !== "home" &&
      section.id !== "challenges" &&
      !metricSectionIds.includes(section.id),
  );
  const activeSectionMeta =
    STAFF_SECTIONS.find((section) => section.id === activeSection) ?? STAFF_SECTIONS[0];

  const renderSectionContent = () => {
    if (activeSection === "participants") {
      return (
        <ParticipantsSection
          participants={participants}
          onParticipantSelect={onParticipantSelect}
        />
      );
    }

    if (activeSection === "mentors") {
      return <MentorsSection />;
    }

    if (activeSection === "groups") {
      return (
        <GroupsSection
          currentUser={currentUser}
          participants={participants}
          groups={groups}
          onSaveGroup={onSaveGroup}
          onUpdateGroup={onUpdateGroup}
          onSetGroupLock={onSetGroupLock}
          onDeleteGroup={onDeleteGroup}
        />
      );
    }

    if (activeSection === "rooms") {
      return <RoomsSection participants={participants} onRoomEdit={onRoomEdit} />;
    }

    if (activeSection === "sessions") {
      return (
        <SessionsSection
          currentUser={currentUser}
          sessionView={sessionView}
          onSessionViewChange={onSessionViewChange}
        />
      );
    }

    if (activeSection === "catering") {
      return <CateringSection />;
    }

    if (activeSection === "challenges") {
      return (
        <PlaceholderSection
          title="Desafios"
          description="Base pronta para encaixar o briefing, calendário e acompanhamento de entregas dos desafios."
        />
      );
    }

    if (activeSection === "feedback") {
      return (
        <FeedbackComposerSection
          title="Feedback"
          description="Espaço para staff, mentores e participantes deixarem feedback sobre os ccamps."
          feedbackEntry={feedbackEntry}
          onSave={onSaveFeedback}
          successMessage="O feedback ficou guardado."
        />
      );
    }

    if (activeSection === "uploads") {
      return (
        <PlaceholderSection
          title="Avaliações"
          description="Espaço reservado para materiais finais, uploads internos e avaliação da equipa."
        />
      );
    }

      return (
        <StaffHome
          participants={participants}
          groups={groups}
          onMetricOpen={onSectionChange}
        />
      );
  };

  if (!isHomeView) {
    return (
      <main className="dashboard-frame">
        <header className="section-screen-header animated-zoom">
          <div className="section-screen-header__top">
            <button
              type="button"
              className="ghost-button"
              onClick={() => onSectionChange("home")}
            >
              Voltar ao dashboard
            </button>

            <div className="hero-actions">
              <div className="profile-chip">
                <span className="profile-chip__label">Staff</span>
                <strong>{currentUser.name}</strong>
              </div>
              <button type="button" className="ghost-button" onClick={onLogout}>
                Terminar sessão
              </button>
            </div>
          </div>

          <div className="section-screen-header__copy">
            <span className="pill-badge">{activeSectionMeta.title}</span>
            <h1>{activeSectionMeta.title}</h1>
            <p>{activeSectionMeta.description}</p>
          </div>
        </header>

        <div className="section-screen animated-slide">{renderSectionContent()}</div>
      </main>
    );
  }

  return (
    <main className="dashboard-frame">
      <header className="dashboard-hero">
        <div>
          <span className="pill-badge">Acesso exclusivo staff</span>
          <h1>Creative Camps® 3</h1>
          <p>Painel principal para gerir toda a experiência do evento.</p>
        </div>

        <div className="hero-actions">
          <div className="profile-chip">
            <span className="profile-chip__label">Staff</span>
            <strong>{currentUser.name}</strong>
          </div>
          <button type="button" className="ghost-button" onClick={onLogout}>
            Terminar sessão
          </button>
        </div>
      </header>

      <div className="dashboard-home-stack">
        <StaffHome
          participants={participants}
          groups={groups}
          onMetricOpen={onSectionChange}
        />

        <section className="staff-nav-grid" aria-label="Menu staff">
          {dashboardCards.map((section) => (
            <button
              key={section.id}
              type="button"
              className="staff-nav-card"
              onClick={() => onSectionChange(section.id)}
            >
              <strong>{section.title}</strong>
            </button>
          ))}
        </section>

        <DashboardSupportPanels participants={participants} />
      </div>
    </main>
  );
}

function StaffHome({ participants, groups, onMetricOpen }) {
  return (
    <section className="content-grid">
      <div className="metrics-grid">
        {STAFF_METRICS.map((metric) => (
          <button
            key={metric.label}
            type="button"
            className="metric-card metric-card--interactive"
            onClick={() => metric.sectionId && onMetricOpen(metric.sectionId)}
          >
            <span>{metric.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function DashboardSupportPanels({ participants }) {
  const createdAccounts = participants.filter(
    (participant) => participant.accountStatus === "Conta criada",
  ).length;
  const pendingAccounts = participants.length - createdAccounts;
  const assignedRooms = participants.filter((participant) => participant.roomId).length;

  return (
    <section className="feature-grid dashboard-bottom-grid">
      <article className="panel-card dashboard-section-intro">
        <div className="panel-card__header">
          <span className="eyebrow">Menu staff</span>
          <h2>Abrir áreas do painel</h2>
        </div>
        <p>Cada cartão abre uma vista dedicada para trabalhares essa área em separado.</p>
      </article>

      <div className="feature-grid dashboard-info-grid">
        <article className="panel-card">
          <div className="panel-card__header">
            <span className="eyebrow">Contas</span>
            <h2>Estado atual do onboarding</h2>
          </div>
          <div className="stats-list">
            <div className="stat-row">
              <span>Contas criadas</span>
              <strong>{createdAccounts}</strong>
            </div>
            <div className="stat-row">
              <span>Contas pendentes</span>
              <strong>{pendingAccounts}</strong>
            </div>
            <div className="stat-row">
              <span>Participantes com quarto</span>
              <strong>{assignedRooms}</strong>
            </div>
          </div>
        </article>

        <article className="panel-card">
          <div className="panel-card__header">
            <span className="eyebrow">Operação</span>
            <h2>Foco desta fase</h2>
          </div>
          <ul className="detail-list">
            <li>Gerir participantes, quartos, grupos e estado das contas.</li>
            <li>Consultar mentores, sessões e catering numa única vista staff.</li>
            <li>Preparar placeholders limpos para desafios, feedback e uploads.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function ParticipantsSection({ participants, onParticipantSelect }) {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const visibleParticipants = participants.filter((participant) => {
    if (!normalizedQuery) {
      return true;
    }

    return (
      participant.name.toLowerCase().includes(normalizedQuery) ||
      getParticipantDisplayName(participant).toLowerCase().includes(normalizedQuery) ||
      participant.email.toLowerCase().includes(normalizedQuery) ||
      (participant.instagram ?? "").toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <section className="content-grid">
      <div className="panel-card">
        <div className="panel-card__header">
          <span className="eyebrow">Participantes</span>
          <h2>Pesquisar e editar fichas</h2>
        </div>
        <label className="field">
          <span>Pesquisa por nome ou e-mail</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex.: Carolina ou gmail.com"
          />
        </label>
      </div>

      <div className="list-grid">
        {visibleParticipants.map((participant) => (
          <article key={participant.id} className="list-card">
            <div className="list-card__header">
              <div>
                <h3>{getParticipantDisplayName(participant)}</h3>
                {participant.displayName && participant.displayName !== participant.name && (
                  <p>{participant.name}</p>
                )}
                <p>{participant.email}</p>
                {participant.instagram ? (
                  <button
                    type="button"
                    className="inline-link"
                    onClick={() => openInstagramProfile(participant.instagram)}
                  >
                    {participant.instagram}
                  </button>
                ) : (
                  <p>@sem-instagram</p>
                )}
              </div>
              <span className={`status-pill ${participant.accountStatus === "Conta criada" ? "created" : ""}`}>
                {participant.accountStatus}
              </span>
            </div>

            <div className="tag-row">
              <span className="tag">{getRoomLabel(participant.roomId)}</span>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={() => onParticipantSelect(participant.id)}
            >
              Abrir ficha
            </button>
          </article>
        ))}

        {visibleParticipants.length === 0 && (
          <article className="empty-card">
            <h3>Sem resultados</h3>
            <p>Ajusta a pesquisa para encontrares o participante pretendido.</p>
          </article>
        )}
      </div>
    </section>
  );
}

function MentorsSection() {
  return (
    <section className="content-grid">
      <div className="list-grid">
        {MENTORS.map((mentor) => (
          <article key={mentor.id} className="list-card">
            <div className="panel-card__header">
              <h3>{mentor.name}</h3>
            </div>
            <ul className="detail-list">
              <li>Produtor musical</li>
              <li>{mentor.date}</li>
            </ul>
            <button
              type="button"
              className="inline-link"
              onClick={() =>
                openExternalUrl(mentor.instagramUrl, {
                  mobileAppUrl: getInstagramAppUrl(mentor.instagramUrl),
                })
              }
            >
              {mentor.instagram}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function GroupsSection({
  currentUser,
  participants,
  groups,
  onSaveGroup,
  onUpdateGroup,
  onSetGroupLock,
  onDeleteGroup,
  canCreateGroups = true,
  canDeleteGroups = true,
}) {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [form, setForm] = useState(getEmptyGroupDraft);
  const [formError, setFormError] = useState("");
  const [openGroupForm, setOpenGroupForm] = useState(null);
  const canEditLyrics = canEditFinalLyrics(currentUser);
  const canLockCurrentGroup = canLockGroup(currentUser);

  const sortedGroups = [...groups].sort((leftGroup, rightGroup) => {
    const leftLabel = `${leftGroup.day}-${leftGroup.period}-${leftGroup.studio}`;
    const rightLabel = `${rightGroup.day}-${rightGroup.period}-${rightGroup.studio}`;
    return leftLabel.localeCompare(rightLabel, "pt");
  });

  const participantGroupMap = groups.reduce((accumulator, group) => {
    group.participantIds.forEach((participantId) => {
      if (group.id === form.id) {
        return;
      }

      accumulator[participantId] = group;
    });

    return accumulator;
  }, {});

  const openCreateForm = () => {
    setForm(getEmptyGroupDraft());
    setFormError("");
    setIsComposerOpen(true);
  };

  const openExistingGroup = (group) => {
    setForm({
      ...group,
      period: normalizePeriodForDay(group.day, group.period),
      participantIds: [...group.participantIds],
    });
    setFormError("");
    setIsComposerOpen(true);
    setIsGroupOpen(false);
    setOpenGroupForm(null);
  };

  const openGroupDetails = (group) => {
    setOpenGroupForm({
      ...group,
      participantIds: [...group.participantIds],
      finalLyrics: group.finalLyrics ?? group.sessionNotes ?? "",
      sessionFeedback: group.sessionFeedback ?? "",
      audioUploadName: group.audioUploadName ?? "",
      audioUploadSizeLabel: group.audioUploadSizeLabel ?? "",
    });
    setIsGroupOpen(true);
    setIsComposerOpen(false);
    setFormError("");
  };

  const toggleParticipant = (participantId) => {
    setForm((currentForm) => ({
      ...currentForm,
      participantIds: currentForm.participantIds.includes(participantId)
        ? currentForm.participantIds.filter((id) => id !== participantId)
        : [...currentForm.participantIds, participantId],
    }));
  };

  const handleMentorChange = (mentorId) => {
    setForm((currentForm) => {
      const forcedDay = getForcedDayForMentor(mentorId);
      const nextDay = forcedDay ?? currentForm.day;
      const nextPeriod = normalizePeriodForDay(nextDay, currentForm.period);

      return {
        ...currentForm,
        mentorId,
        day: nextDay,
        period: nextPeriod,
        studio: getDefaultStudioForMentor(mentorId, nextDay),
      };
    });
  };

  const handleDayChange = (day) => {
    const forcedDay = getForcedDayForMentor(form.mentorId);
    const nextDay = forcedDay ?? day;

    setForm((currentForm) => ({
      ...currentForm,
      day: nextDay,
      period: normalizePeriodForDay(nextDay, currentForm.period),
      studio: getDefaultStudioForMentor(currentForm.mentorId, nextDay),
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    const result = onSaveGroup(form);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    setForm(getEmptyGroupDraft());
    setFormError("");
    setIsComposerOpen(false);
  };

  const handleSaveOpenGroup = (event) => {
    event.preventDefault();

    if (!openGroupForm?.id || openGroupForm.isLocked) {
      return;
    }

    onUpdateGroup(openGroupForm.id, {
      finalLyrics: openGroupForm.finalLyrics,
      sessionFeedback: openGroupForm.sessionFeedback,
      audioUploadName: openGroupForm.audioUploadName,
      audioUploadSizeLabel: openGroupForm.audioUploadSizeLabel,
    });
  };

  const handleLockGroup = () => {
    if (!openGroupForm?.id || openGroupForm.isLocked || !canLockCurrentGroup) {
      return;
    }

    onUpdateGroup(openGroupForm.id, {
      finalLyrics: openGroupForm.finalLyrics,
      sessionFeedback: openGroupForm.sessionFeedback,
      audioUploadName: openGroupForm.audioUploadName,
      audioUploadSizeLabel: openGroupForm.audioUploadSizeLabel,
      isLocked: true,
    });

    setOpenGroupForm((currentForm) =>
      currentForm
        ? {
            ...currentForm,
            isLocked: true,
          }
        : currentForm,
    );
  };

  const handleUnlockGroup = () => {
    if (!openGroupForm?.id || !openGroupForm.isLocked || !canLockCurrentGroup) {
      return;
    }

    onSetGroupLock(openGroupForm.id, false);
    setOpenGroupForm((currentForm) =>
      currentForm
        ? {
            ...currentForm,
            isLocked: false,
          }
        : currentForm,
    );
  };

  const handleDelete = () => {
    if (!form.id) {
      setForm(getEmptyGroupDraft());
      setFormError("");
      setIsComposerOpen(false);
      return;
    }

    onDeleteGroup(form.id);
    setForm(getEmptyGroupDraft());
    setFormError("");
    setIsComposerOpen(false);
    setIsGroupOpen(false);
    setOpenGroupForm(null);
  };

  return (
    <section className="content-grid">
      <article className="panel-card">
        <div className="panel-card__header">
          <span className="eyebrow">Grupos</span>
          <h2>Criar grupos por dia, período e estúdio</h2>
        </div>
        <p>
          Podes criar até 3 grupos em simultâneo por slot. Cada grupo fica ligado a
          um mentor, a um estúdio e aos participantes escolhidos.
        </p>
        {canCreateGroups && (
          <div className="modal-actions">
            <button type="button" className="primary-button" onClick={openCreateForm}>
              Criar grupo
            </button>
          </div>
        )}
      </article>

      {isComposerOpen && (
        <article className="panel-card">
          <div className="panel-card__header">
            <span className="eyebrow">{form.id ? "Editar grupo" : "Novo grupo"}</span>
            <h2>
              Dia {form.day} - {form.period}
            </h2>
          </div>

          <form className="form-grid" onSubmit={handleSave}>
            <div className="list-grid">
              <label className="field">
                <span>Dia da sessão</span>
                <select
                  value={form.day}
                  onChange={(event) => handleDayChange(event.target.value)}
                  disabled={Boolean(getForcedDayForMentor(form.mentorId))}
                >
                  {GROUP_DAY_OPTIONS.map((day) => (
                    <option key={day} value={day}>
                      Dia {day}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Período</span>
                <select
                  value={form.period}
                  onChange={(event) =>
                    setForm((currentForm) => ({
                      ...currentForm,
                      period: normalizePeriodForDay(currentForm.day, event.target.value),
                    }))
                  }
                >
                  {getAllowedPeriodsForDay(form.day).map((period) => (
                    <option key={period} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="field">
              <span>Mentor</span>
              <select
                value={form.mentorId}
                onChange={(event) => handleMentorChange(event.target.value)}
              >
                <option value="">Escolher mentor</option>
                {MENTORS.map((mentor) => (
                  <option key={mentor.id} value={mentor.id}>
                    {mentor.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Estúdio alocado</span>
              <input
                type="text"
                value={form.studio}
                readOnly
                placeholder="Seleciona primeiro o mentor"
              />
            </label>

            {getMentorStudioRuleLabel(form.mentorId) && (
              <p className="helper-text">
                {getMentorStudioRuleLabel(form.mentorId)}
              </p>
            )}

            <div className="field">
              <span>Adicionar participantes</span>
              <div className="checkbox-list">
                {participants.map((participant) => {
                  const assignedGroup = participantGroupMap[participant.id];
                  const isUnavailable = Boolean(assignedGroup);

                  return (
                    <label
                      key={participant.id}
                      className={`checkbox-card ${isUnavailable ? "checkbox-card--disabled" : ""}`}
                    >
                      <span className="checkbox-card__avatar" aria-hidden="true">
                        {getParticipantDisplayName(participant).slice(0, 1)}
                      </span>
                      <div className="checkbox-card__content">
                        <strong className="checkbox-card__title">
                          {getParticipantRoomLabel(participant)}
                        </strong>
                        <span className="checkbox-card__meta">{participant.email}</span>
                        {isUnavailable && (
                          <span className="checkbox-card__status">
                            Indisponível - já está em {assignedGroup.studio}
                          </span>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={form.participantIds.includes(participant.id)}
                        onChange={() => toggleParticipant(participant.id)}
                        disabled={isUnavailable}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {formError && <p className="form-error">{formError}</p>}

            <div className="modal-actions">
              <button
                type="button"
                className="ghost-button"
                onClick={() => {
                  setForm(getEmptyGroupDraft());
                  setFormError("");
                  setIsComposerOpen(false);
                }}
              >
                Fechar
              </button>

              {form.id && canDeleteGroups && (
                <button type="button" className="secondary-button" onClick={handleDelete}>
                  Apagar grupo
                </button>
              )}

              <button type="submit" className="primary-button">
                Guardar grupo
              </button>
            </div>
          </form>
        </article>
      )}

      {isGroupOpen && openGroupForm && (
        <article className="panel-card">
          <div className="panel-card__header">
            <span className="eyebrow">Abrir grupo</span>
            <h2>
              Dia {openGroupForm.day} - {openGroupForm.period}
            </h2>
            <p>
              {openGroupForm.studio} - {getMentorName(openGroupForm.mentorId)}
            </p>
          </div>

          {openGroupForm.isLocked && (
            <p className="helper-text helper-text--locked">
              Este grupo está trancado. A sessão fica disponível apenas para consulta.
            </p>
          )}

          <div className="tag-row">
            {openGroupForm.isLocked && <span className="status-pill locked">Grupo trancado</span>}
            {participants
              .filter((participant) => openGroupForm.participantIds.includes(participant.id))
              .map((participant) => (
                <span key={participant.id} className="tag">
                  {getParticipantDisplayName(participant)}
                </span>
              ))}
          </div>

          <form className="form-grid" onSubmit={handleSaveOpenGroup}>
            <label className="field">
              <span>Letra final</span>
              <textarea
                rows="4"
                value={openGroupForm.finalLyrics}
                disabled={!canEditLyrics || openGroupForm.isLocked}
                onChange={(event) =>
                  setOpenGroupForm((currentForm) => ({
                    ...currentForm,
                    finalLyrics: event.target.value,
                  }))
                }
                placeholder="Escrever ou colar a letra final desta sessão"
              />
            </label>

            <p className="helper-text">
              A letra final só pode ser editada por mentores e staff.
            </p>

            <label className="field">
              <span>Feedback da sessão</span>
              <textarea
                rows="4"
                value={openGroupForm.sessionFeedback}
                disabled={openGroupForm.isLocked}
                onChange={(event) =>
                  setOpenGroupForm((currentForm) => ({
                    ...currentForm,
                    sessionFeedback: event.target.value,
                  }))
                }
                placeholder="Registar feedback, observações e próximos passos"
              />
            </label>

            <label className="field">
              <span>Upload mp3</span>
              <input
                type="file"
                accept=".mp3,audio/mpeg"
                disabled={openGroupForm.isLocked}
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (!file) {
                    return;
                  }

                  const sizeInMb = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

                  setOpenGroupForm((currentForm) => ({
                    ...currentForm,
                    audioUploadName: file.name,
                    audioUploadSizeLabel: sizeInMb,
                  }));
                }}
              />
            </label>

            {openGroupForm.audioUploadName && (
              <div className="read-only-card">
                <strong>Ficheiro selecionado</strong>
                <span>
                  {openGroupForm.audioUploadName}
                  {openGroupForm.audioUploadSizeLabel
                    ? ` · ${openGroupForm.audioUploadSizeLabel}`
                    : ""}
                </span>
              </div>
            )}

            <div className="modal-actions">
              <button
                type="button"
                className="ghost-button"
                onClick={() => {
                  setIsGroupOpen(false);
                  setOpenGroupForm(null);
                }}
              >
                Fechar
              </button>
              {!openGroupForm.isLocked && (
                <>
                  {canLockCurrentGroup && (
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={handleLockGroup}
                    >
                      Trancar grupo
                    </button>
                  )}
                  <button type="submit" className="primary-button">
                    Guardar sessão
                  </button>
                </>
              )}
              {openGroupForm.isLocked && canLockCurrentGroup && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleUnlockGroup}
                >
                  Reabrir grupo
                </button>
              )}
            </div>
          </form>
        </article>
      )}

      <div className="list-grid">
        {sortedGroups.map((group) => {
          const groupParticipants = participants.filter((participant) =>
            group.participantIds.includes(participant.id),
          );

          return (
            <article key={group.id} className="list-card">
              <div className="list-card__header">
                <div>
                  <span className="eyebrow">
                    Dia {group.day} - {group.period}
                  </span>
                  <h3>{group.studio}</h3>
                  <p>{getMentorName(group.mentorId)}</p>
                </div>
                <div className="list-card__meta">
                  {group.isLocked && <span className="status-pill locked">Trancado</span>}
                  <span className="count-pill">{groupParticipants.length}</span>
                </div>
              </div>

              <div className="tag-row">
                {groupParticipants.map((participant) => (
                  <span key={participant.id} className="tag">
                    {getParticipantDisplayName(participant)}
                  </span>
                ))}
                {groupParticipants.length === 0 && (
                  <span className="tag tag--muted">Sem participantes adicionados</span>
                )}
              </div>

              <div className="action-row">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => openGroupDetails(group)}
                >
                  Abrir
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => openExistingGroup(group)}
                  disabled={group.isLocked}
                >
                  Editar
                </button>
                {canDeleteGroups && (
                  <button
                    type="button"
                    className="ghost-button danger-button"
                    onClick={() => onDeleteGroup(group.id)}
                    disabled={group.isLocked}
                  >
                    Apagar
                  </button>
                )}
              </div>
            </article>
          );
        })}

        {sortedGroups.length === 0 && (
          <article className="empty-card">
            <h3>Sem grupos criados</h3>
            <p>
              Ainda não existe nenhum grupo para os dias 25, 26 ou 27. Usa o botão
              acima para criar o primeiro.
            </p>
          </article>
        )}
      </div>
    </section>
  );
}

function RoomsSection({ participants, onRoomEdit }) {
  return (
    <section className="content-grid">
      <div className="list-grid">
        {ROOMS.map((room) => {
          const roomParticipants = participants.filter(
            (participant) => participant.roomId === room.id,
          );
          const staticOccupants = getRoomStaticOccupants(room.id);
          const totalOccupants = roomParticipants.length + staticOccupants.length;

          return (
            <article key={room.id} className="list-card">
              <div className="list-card__header">
                <div>
                  <span className="eyebrow">{room.location}</span>
                  <h3>{room.name}</h3>
                </div>
                <span className="count-pill">{totalOccupants}</span>
              </div>

              <div className="tag-row">
                {roomParticipants.map((participant) => (
                  <span key={participant.id} className="tag">
                    {getParticipantRoomLabel(participant)}
                  </span>
                ))}
                {staticOccupants.map((occupant) => (
                  <span key={occupant} className="tag tag--muted">
                    {occupant}
                  </span>
                ))}
                {totalOccupants === 0 && (
                  <span className="tag tag--muted">Sem ocupantes atribuídos</span>
                )}
              </div>

              <button
                type="button"
                className="secondary-button"
                onClick={() => onRoomEdit(room.id)}
              >
                Editar
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SessionsSection({ currentUser, sessionView, onSessionViewChange }) {
  const canSeeInternalPlan = currentUser?.role === "staff";
  const effectiveSessionView =
    canSeeInternalPlan || sessionView === "general" ? sessionView : "general";
  const schedule = effectiveSessionView === "general" ? GENERAL_PROGRAM : INTERNAL_PLAN;

  return (
    <section className="content-grid">
      <div className="panel-card">
        <div className="panel-card__header">
          <span className="eyebrow">Programa Geral</span>
          <h2>Programa Geral e Plano Interno</h2>
        </div>

        <div className="toggle-row" role="tablist" aria-label="Vista das sessões">
          <button
            type="button"
            className={`toggle-chip ${effectiveSessionView === "general" ? "active" : ""}`}
            onClick={() => onSessionViewChange("general")}
          >
            Programa Geral
          </button>
          {canSeeInternalPlan && (
            <button
              type="button"
              className={`toggle-chip ${effectiveSessionView === "internal" ? "active" : ""}`}
              onClick={() => onSessionViewChange("internal")}
            >
              Plano Interno
            </button>
          )}
        </div>
      </div>

      <div className="list-grid">
        {schedule.map((day) => (
          <article key={day.day} className="list-card">
            <div className="panel-card__header">
              <span className="eyebrow">
                {effectiveSessionView === "general" ? "Versão geral" : "Só staff"}
              </span>
              <h3>{day.day}</h3>
            </div>

            <ul className="timeline-list">
              {day.items.map((item) => (
                <li key={`${day.day}-${item}`}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function CateringSection() {
  return (
    <section className="content-grid">
      <div className="list-grid">
        {CATERING_DAYS.map((day) => (
          <article key={day.day} className="list-card">
            <div className="panel-card__header">
              <span className="eyebrow">Catering</span>
              <h3>{day.day}</h3>
            </div>
            <ul className="detail-list">
              {day.details.map((detail) => (
                <li key={`${day.day}-${detail}`}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <article className="panel-card">
        <div className="panel-card__header">
          <span className="eyebrow">Notas gerais</span>
          <h2>Informação importante de catering</h2>
        </div>
        <ul className="detail-list">
          {CATERING_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function PlaceholderSection({ title, description }) {
  return (
    <section className="content-grid">
      <article className="panel-card">
        <div className="panel-card__header">
          <span className="eyebrow">Em preparação</span>
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
      </article>
    </section>
  );
}

function ParticipantDirectorySection({ participants }) {
  return (
    <section className="content-grid">
      <div className="list-grid">
        {participants.map((participant) => (
          <article key={participant.id} className="list-card">
            <div className="list-card__header">
              <div>
                <h3>{getParticipantDisplayName(participant)}</h3>
                {participant.displayName && participant.displayName !== participant.name && (
                  <p>{participant.name}</p>
                )}
                <p>{participant.email}</p>
                {participant.instagram ? (
                  <button
                    type="button"
                    className="inline-link"
                    onClick={() => openInstagramProfile(participant.instagram)}
                  >
                    {participant.instagram}
                  </button>
                ) : (
                  <p>@sem-instagram</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ParticipantGroupsSection({ participant, participants, groups }) {
  const participantGroups = groups
    .filter((group) => participant?.id && group.participantIds.includes(participant.id))
    .sort((leftGroup, rightGroup) => {
      const leftLabel = `${leftGroup.day}-${leftGroup.period}-${leftGroup.studio}`;
      const rightLabel = `${rightGroup.day}-${rightGroup.period}-${rightGroup.studio}`;
      return leftLabel.localeCompare(rightLabel, "pt");
    });

  return (
    <section className="content-grid">
      <article className="panel-card">
        <div className="panel-card__header">
          <span className="eyebrow">Grupos</span>
          <h2>Estado atual</h2>
        </div>
        <p>
          {participantGroups.length > 0
            ? "Já estás incluíd@ num grupo. Podes consultar quem está contigo na mesma sessão."
            : "Ainda não estás incluíd@ em nenhum grupo."}
        </p>
      </article>

      {participantGroups.length > 0 && (
        <div className="list-grid">
          {participantGroups.map((group) => (
            <article key={group.id} className="list-card">
              <div className="panel-card__header">
                <span className="eyebrow">
                  Dia {group.day} - {group.period}
                </span>
                <h3>{group.studio}</h3>
                <p>{getMentorName(group.mentorId)}</p>
              </div>

              <div className="tag-row">
                {group.participantIds.map((participantId) => (
                  <span key={participantId} className="tag">
                    {getParticipantDisplayName(
                      participants.find((item) => item.id === participantId) ?? participant,
                    )}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function FeedbackComposerSection({
  title,
  description,
  feedbackEntry,
  onSave,
  successMessage,
}) {
  const [message, setMessage] = useState(feedbackEntry?.message ?? "");
  const [savedState, setSavedState] = useState("");

  useEffect(() => {
    setMessage(feedbackEntry?.message ?? "");
    setSavedState("");
  }, [feedbackEntry?.message]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(message);
    setSavedState(successMessage);
  };

  return (
    <section className="content-grid">
      <article className="panel-card">
        <div className="panel-card__header">
          <span className="eyebrow">{title}</span>
          <h2>Partilha livre</h2>
        </div>
        <p>{description}</p>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="field">
            <span>A tua resposta</span>
            <textarea
              rows="8"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Escreve aqui o teu feedback, ideias, sentimentos, sugestões ou o que te fizer sentido partilhar."
            />
          </label>

          {feedbackEntry?.updatedAt && (
            <p className="helper-text">
              Última atualização guardada.
            </p>
          )}

          {savedState && <p className="helper-text">{savedState}</p>}

          <div className="modal-actions">
            <button type="submit" className="primary-button">
              Guardar feedback
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

function ParticipantFeedbackSection({ feedbackEntry, onSave }) {
  return (
    <FeedbackComposerSection
      title="Feedback"
      description="Podes escrever livremente o que te apetecer sobre a tua experiência no camp."
      feedbackEntry={feedbackEntry}
      onSave={onSave}
      successMessage="O teu feedback ficou guardado."
    />
  );
}

function MentorGroupsSection({ participants, groups }) {
  const sortedGroups = [...groups].sort((leftGroup, rightGroup) => {
    const leftLabel = `${leftGroup.day}-${leftGroup.period}-${leftGroup.studio}`;
    const rightLabel = `${rightGroup.day}-${rightGroup.period}-${rightGroup.studio}`;
    return leftLabel.localeCompare(rightLabel, "pt");
  });

  return (
    <section className="content-grid">
      <div className="list-grid">
        {sortedGroups.map((group) => (
          <article key={group.id} className="list-card">
            <div className="panel-card__header">
              <span className="eyebrow">
                Dia {group.day} - {group.period}
              </span>
              <h3>{group.studio}</h3>
              <p>{getMentorName(group.mentorId)}</p>
            </div>

            <div className="tag-row">
              {group.participantIds.map((participantId) => (
                <span key={participantId} className="tag">
                  {getParticipantDisplayName(
                    participants.find((participant) => participant.id === participantId) ?? {
                      name: "Participante",
                    },
                  )}
                </span>
              ))}
            </div>
          </article>
        ))}

        {sortedGroups.length === 0 && (
          <article className="empty-card">
            <h3>Sem grupos criados</h3>
            <p>Ainda não existem grupos criados para consultar.</p>
          </article>
        )}
      </div>
    </section>
  );
}

function MentorArea({
  currentUser,
  participants,
  groups,
  onSaveGroup,
  onUpdateGroup,
  onSetGroupLock,
  onDeleteGroup,
  feedbackEntry,
  onSaveFeedback,
  onLogout,
}) {
  const [activeSection, setActiveSection] = useState("home");
  const [mentorSessionView, setMentorSessionView] = useState("general");
  const mentorSections = [
    { id: "mentors", title: "Mentores", description: "Equipa criativa confirmada para o camp." },
    { id: "participants", title: "Participantes", description: "Lista de participantes do camp." },
    { id: "sessions", title: "Programa Geral", description: "Consultar o programa geral do evento." },
    { id: "groups", title: "Grupos", description: "Consultar grupos, mentores e participantes." },
    { id: "catering", title: "Catering", description: "Menus por dia e notas importantes." },
    { id: "feedback", title: "Feedback", description: "Partilhar feedback sobre os ccamps." },
  ];

  const activeSectionMeta = mentorSections.find((section) => section.id === activeSection) ?? null;

  const renderSectionContent = () => {
    if (activeSection === "mentors") {
      return <MentorsSection />;
    }

    if (activeSection === "participants") {
      return <ParticipantDirectorySection participants={participants} />;
    }

    if (activeSection === "sessions") {
      return (
        <SessionsSection
          currentUser={currentUser}
          sessionView={mentorSessionView}
          onSessionViewChange={setMentorSessionView}
        />
      );
    }

    if (activeSection === "groups") {
      return (
        <GroupsSection
          currentUser={currentUser}
          participants={participants}
          groups={groups}
          onSaveGroup={onSaveGroup}
          onUpdateGroup={onUpdateGroup}
          onSetGroupLock={onSetGroupLock}
          onDeleteGroup={onDeleteGroup}
          canCreateGroups={false}
          canDeleteGroups={false}
        />
      );
    }

    if (activeSection === "catering") {
      return <CateringSection />;
    }

    if (activeSection === "feedback") {
      return (
        <FeedbackComposerSection
          title="Feedback"
          description="Podes escrever livremente feedback sobre os ccamps."
          feedbackEntry={feedbackEntry}
          onSave={onSaveFeedback}
          successMessage="O teu feedback ficou guardado."
        />
      );
    }

    return null;
  };

  if (activeSection !== "home" && activeSectionMeta) {
    return (
      <main className="dashboard-frame">
        <header className="section-screen-header animated-zoom">
          <div className="section-screen-header__top">
            <button type="button" className="ghost-button" onClick={() => setActiveSection("home")}>
              Voltar
            </button>

            <button type="button" className="ghost-button" onClick={onLogout}>
              Sair
            </button>
          </div>

          <div className="section-screen-header__copy">
            <span className="pill-badge pill-badge--soft">{activeSectionMeta.title}</span>
            <h1>{activeSectionMeta.title}</h1>
            <p>{activeSectionMeta.description}</p>
          </div>
        </header>

        <div className="section-screen animated-slide">{renderSectionContent()}</div>
      </main>
    );
  }

  return (
    <main className="dashboard-frame">
      <header className="dashboard-hero">
        <div>
          <span className="pill-badge pill-badge--soft">Área de mentor</span>
          <span className="participant-brand-title">Creative Camps® 3</span>
          <h1>Bem-vind@, {currentUser.name}</h1>
          <p>O teu acesso foi reconhecido automaticamente como mentor.</p>
        </div>

        <button type="button" className="ghost-button" onClick={onLogout}>
          Sair
        </button>
      </header>

      <section className="content-grid">
        <article className="panel-card">
          <div className="panel-card__header">
            <span className="eyebrow">Resumo</span>
            <h2>Informação disponível nesta fase</h2>
          </div>
          <div className="summary-list">
            <div className="summary-row">
              <span className="summary-row__dot" aria-hidden="true" />
              <span>{groups.length} grupo(s) criado(s)</span>
            </div>
            <div className="summary-row">
              <span className="summary-row__dot" aria-hidden="true" />
              <span>{participants.length} participante(s)</span>
            </div>
            <div className="summary-row">
              <span className="summary-row__dot" aria-hidden="true" />
              <span>Conta criada</span>
            </div>
          </div>
        </article>

        <section className="staff-nav-grid" aria-label="Menu mentor">
          {mentorSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className="staff-nav-card"
              onClick={() => setActiveSection(section.id)}
            >
              <strong>{section.title}</strong>
            </button>
          ))}
        </section>
      </section>
    </main>
  );
}

function ParticipantArea({
  currentUser,
  participants,
  participant,
  groups,
  participantFeedback,
  onSaveParticipantFeedback,
  onLogout,
}) {
  const [activeSection, setActiveSection] = useState("home");
  const [participantSessionView, setParticipantSessionView] = useState("general");
  const participantGroups = groups
    .filter((group) => participant?.id && group.participantIds.includes(participant.id))
    .sort((leftGroup, rightGroup) => {
      const leftLabel = `${leftGroup.day}-${leftGroup.period}-${leftGroup.studio}`;
      const rightLabel = `${rightGroup.day}-${rightGroup.period}-${rightGroup.studio}`;
      return leftLabel.localeCompare(rightLabel, "pt");
    });

  const activeSectionMeta =
    PARTICIPANT_SECTIONS.find((section) => section.id === activeSection) ?? null;

  const renderSectionContent = () => {
    if (activeSection === "participants") {
      return <ParticipantDirectorySection participants={participants} />;
    }

    if (activeSection === "mentors") {
      return <MentorsSection />;
    }

    if (activeSection === "groups") {
      return (
        <ParticipantGroupsSection
          participant={participant}
          participants={participants}
          groups={groups}
        />
      );
    }

    if (activeSection === "sessions") {
      return (
        <SessionsSection
          currentUser={currentUser}
          sessionView={participantSessionView}
          onSessionViewChange={setParticipantSessionView}
        />
      );
    }

    if (activeSection === "catering") {
      return <CateringSection />;
    }

    if (activeSection === "feedback") {
      return (
        <ParticipantFeedbackSection
          feedbackEntry={participant ? participantFeedback[participant.id] : null}
          onSave={(message) => participant && onSaveParticipantFeedback(participant.id, message)}
        />
      );
    }

    return null;
  };

  if (activeSection !== "home" && activeSectionMeta) {
    return (
      <main className="dashboard-frame">
        <header className="section-screen-header animated-zoom">
          <div className="section-screen-header__top">
            <button
              type="button"
              className="ghost-button"
              onClick={() => setActiveSection("home")}
            >
              Voltar
            </button>

            <button type="button" className="ghost-button" onClick={onLogout}>
              Sair
            </button>
          </div>

          <div className="section-screen-header__copy">
            <span className="pill-badge pill-badge--soft">{activeSectionMeta.title}</span>
            <h1>{activeSectionMeta.title}</h1>
            <p>{activeSectionMeta.description}</p>
          </div>
        </header>

        <div className="section-screen animated-slide">{renderSectionContent()}</div>
      </main>
    );
  }

  return (
    <main className="dashboard-frame">
      <header className="dashboard-hero">
        <div>
          <span className="pill-badge pill-badge--soft">Área de participante</span>
          <span className="participant-brand-title">Creative Camps® 3</span>
          <h1>Bem-vind@, {participant ? getParticipantDisplayName(participant) : currentUser.name}</h1>
          <p>
            O teu acesso foi reconhecido automaticamente pelo e-mail. A experiência de
            participante pode evoluir nas próximas iterações.
          </p>
        </div>

        <button type="button" className="ghost-button" onClick={onLogout}>
          Sair
        </button>
      </header>

      <section className="content-grid">
        <article className="panel-card">
          <div className="panel-card__header">
            <span className="eyebrow">Resumo</span>
            <h2>Informação disponível nesta fase</h2>
          </div>
          <div className="summary-list">
            <div className="summary-row">
              <span className="summary-row__dot" aria-hidden="true" />
              <span>
                {participantGroups.length > 0
                  ? `${participantGroups.length} grupo(s) ativo(s)`
                  : "Sem grupo atribuído"}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-row__dot" aria-hidden="true" />
              <span>{getRoomLabel(participant?.roomId)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-row__dot" aria-hidden="true" />
              <span>{participant?.accountStatus ?? "Conta criada"}</span>
            </div>
          </div>
        </article>

        <section className="staff-nav-grid" aria-label="Menu participante">
          {PARTICIPANT_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              className="staff-nav-card"
              onClick={() => setActiveSection(section.id)}
            >
              <strong>{section.title}</strong>
            </button>
          ))}
        </section>
      </section>
    </main>
  );
}

function ParticipantModal({ participant, onClose, onSave }) {
  const [form, setForm] = useState({
    group: "",
    roomId: "",
    accountStatus: ACCOUNT_STATUS_OPTIONS[0],
    notes: "",
  });

  useEffect(() => {
    if (!participant) {
      return;
    }

    setForm({
      group: participant.group ?? "",
      roomId: participant.roomId ?? "",
      accountStatus: participant.accountStatus,
      notes: participant.notes ?? "",
    });
  }, [participant]);

  if (!participant) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(participant.id, form);
    onClose();
  };

  return (
    <ModalShell title="Ficha de participante" onClose={onClose}>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="read-only-card">
          <strong>{getParticipantDisplayName(participant)}</strong>
          <span>{participant.email}</span>
          {participant.instagram ? (
            <button
              type="button"
              className="inline-link"
              onClick={() => openInstagramProfile(participant.instagram)}
            >
              {participant.instagram}
            </button>
          ) : (
            <span>@sem-instagram</span>
          )}
        </div>

        <label className="field">
          <span>Quarto</span>
          <select
            value={form.roomId}
            onChange={(event) => setForm((currentForm) => ({ ...currentForm, roomId: event.target.value }))}
          >
            <option value="">Sem quarto atribuído</option>
            {ROOMS.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} — {room.location}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Estado da conta</span>
          <select
            value={form.accountStatus}
            onChange={(event) =>
              setForm((currentForm) => ({ ...currentForm, accountStatus: event.target.value }))
            }
          >
            {ACCOUNT_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Notas internas</span>
          <textarea
            rows="4"
            value={form.notes}
            onChange={(event) => setForm((currentForm) => ({ ...currentForm, notes: event.target.value }))}
            placeholder="Adicionar notas internas"
          />
        </label>

        <div className="modal-actions">
          <button type="button" className="ghost-button" onClick={onClose}>
            Fechar
          </button>
          <button type="submit" className="primary-button">
            Guardar alterações
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function RoomAssignmentModal({ room, participants, onClose, onSave }) {
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (!room) {
      return;
    }

    setSelectedIds(
      participants
        .filter((participant) => participant.roomId === room.id)
        .map((participant) => participant.id),
    );
  }, [room, participants]);

  if (!room) {
    return null;
  }

  const staticOccupants = getRoomStaticOccupants(room.id);

  const toggleParticipant = (participantId) => {
    setSelectedIds((currentIds) =>
      currentIds.includes(participantId)
        ? currentIds.filter((id) => id !== participantId)
        : [...currentIds, participantId],
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(room.id, selectedIds);
    onClose();
  };

  return (
    <ModalShell title={`${room.name} — ${room.location}`} onClose={onClose}>
      <form className="form-grid" onSubmit={handleSubmit}>
        <p className="helper-text">
          Ao guardar, qualquer participante selecionado é movido automaticamente para
          este quarto e sai do anterior.
        </p>

        {staticOccupants.length > 0 && (
          <div className="read-only-card">
            <strong>Ocupação fixa neste quarto</strong>
            <span>{staticOccupants.join(", ")}</span>
          </div>
        )}

        <div className="checkbox-list">
          {participants.map((participant) => {
            const currentRoom = ROOMS.find((item) => item.id === participant.roomId);
            const statusLabel =
              currentRoom && currentRoom.id !== room.id
                ? `${currentRoom.name} atualmente`
                : "Disponível para este quarto";

            return (
              <label key={participant.id} className="checkbox-card">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(participant.id)}
                  onChange={() => toggleParticipant(participant.id)}
                />
                <div>
                  <strong>{getParticipantRoomLabel(participant)}</strong>
                  <span>{statusLabel}</span>
                </div>
              </label>
            );
          })}
        </div>

        <div className="modal-actions">
          <button type="button" className="ghost-button" onClick={onClose}>
            Fechar
          </button>
          <button type="submit" className="primary-button">
            Guardar quarto
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function ModalShell({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span className="eyebrow">Staff</span>
            <h2>{title}</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            Fechar
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default App;
