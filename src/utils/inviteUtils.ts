// Utilidades para codificar/decodificar informações do convite

export interface InviteData {
  convidados?: string[]
  nomeConvidado: string;
  nomeResponsavel?: string;
  telefone?: string;
  observacoes?: string;
  geradoEm: string;
}

// Variáveis que podem ser editadas facilmente
export const EVENT_INFO = {
  aniversariante: "Ana Sophia",
  idade: "2 anos",
  data: "10 de Novembro de 2025",
  local: "A definir", // Pode ser editado depois
  horario: null, // Pode ser editado depois
  tema: "Fazendinha Rosa 🐷💕"
};

export const encodeInviteData = (data: InviteData): string => {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(unescape(encodeURIComponent(jsonString)));
  } catch (error) {
    console.error("Erro ao codificar dados do convite:", error);
    return "";
  }
};

export const decodeInviteData = (encodedData: string): InviteData | null => {
  try {
    const jsonString = decodeURIComponent(escape(atob(encodedData)));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Erro ao decodificar dados do convite:", error);
    return null;
  }
};

export const generateInviteUrl = (data: InviteData): string => {
  const encodedData = encodeInviteData(data);
  const baseUrl = window.location.origin;
  return `${baseUrl}/preview/?data=${encodedData}`;
};