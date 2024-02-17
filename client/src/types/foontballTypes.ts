export interface LeagueDatatable {
  draw: number;
  form: string | null;
  goalDifference: number;
  goalsAgainst: number;
  goalsFor: number;
  lost: number;
  playedGames: number;
  points: number;
  position: number;
  team: {
    crest: string;
    id: number;
    name: string;
    shortName: string;
    tla: string;
  }; 
  won: number;
}

export interface Player {
  assists: number;
  goals: number;
  penalties: number;
  playedMatches: number;
  player: {
    dateOfBirth: string;
    firstName: string;
    id: number;
    lastName: string;
    lastUpdated: string;
    name: string;
    nationality: string;
    position: string | null;
    section: string;
    shirtNumber: number | null;
  };
  team: {
    address: string;
    clubColors: string;
    crest: string;
    founded: number;
    id: number;
    lastUpdated: string;
    name: string;
    shortName: string;
    tla: string;
    venue: string;
    website: string;
  };
}

export interface TeamData {
  address: string;
  area: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  clubColors: string;
  coach: TeamCoach
  crest: string;
  founded: number;
  id: number;
  lastUpdated: string;
  name: string;
  runningCompetitions: {
    code: string;
    emblem: string;
    id: number;
    name: string;
    type: string;
  }[];
  shortName: string;
  squad: TeamSquad[];
  staff: unknown[]; 
  tla: string;
  venue: string;
  website: string;
}

export interface TeamCoach {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth: string;
}

export interface TeamSquad {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
}

export interface ResultSet {
  filters: {
    competitions: string;
    limit: number;
    permission: string;
  };
  resultSet : {
    competitions: string;
    count: number;
    draws: number;
    first: string;
    last: string;
    losses: number;
    played: number;
    wins: number;
  }
  matches : TeamMatch[]
}

export interface TeamMatch {
  area: {
    code: string;
    flag: string;
    id: number;
    name: string;
  };
  awayTeam: {
    crest: string;
    id: number;
    name: string;
    shortName: string;
    tla: string;
  };
  competition: {
    code: string;
    emblem: string;
    id: number;
    name: string;
    type: string;
  };
  group: null; 
  homeTeam: {
    crest: string;
    id: number;
    name: string;
    shortName: string;
    tla: string;
  };
  id: number;
  lastUpdated: string;
  matchday: number;
  odds: {
    msg: string;
  };
  referees: {
    id: number;
    name: string;
    type: string;
    nationality: string;
  }[];
  score: {
    duration: string;
    fullTime: {
      away: number;
      home: number;
    };
    halfTime: {
      away: number;
      home: number;
    };
    winner: string;
  };
  season: {
    currentMatchday: number;
    endDate: string;
    id: number;
    startDate: string;
    winner: string | null;
  };
  stage: string;
  status: string;
  utcDate: string;
}