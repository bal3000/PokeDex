export interface MoveVersionDetails {
  levelLearnedAt: number;
  moveLearnMethod: string;
  versionName: string;
}

export interface Move {
  name: string;
  versionGroupDetails: MoveVersionDetails[];
}
