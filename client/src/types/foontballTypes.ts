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
