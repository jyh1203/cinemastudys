
export interface Actor {
  star: string;
  name: string;
  sex: string;
  nat: string;
  char1?: string;
  char2?: string;
  stat1?: string;
  stat?: string;
  skill1?: string;
  skill2?: string;
  skill3?: string;
  skill4?: string;
  skill5?: string;
  skill6?: string;
  skill1_desc?: string;
  skill2_desc?: string;
  skill3_desc?: string;
  skill4_desc?: string;
  skill5_desc?: string;
  skill6_desc?: string;
  fair_total?: string;
  scenes?: string[];
  tags?: string[];
}

export interface StudyAbroadLabel {
  name: string;
  scenes: string[];
  tags: string[];
}
