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