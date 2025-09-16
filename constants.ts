
import type { StudyAbroadLabel } from './types';

export const STUDY_ABROAD_LABELS: StudyAbroadLabel[] = [
  {
    name: "라벨 선택...",
    scenes: [],
    tags: [],
  },
  {
    name: "액션 마스터 (Action Master)",
    scenes: ["범죄물", "총격전", "어드벤처물"],
    tags: ["격투", "경찰", "터프가이", "군인"],
  },
  {
    name: "로맨스 장인 (Romance Expert)",
    scenes: ["로맨스", "드라마물", "현대물"],
    tags: ["일편단심", "비쥬얼", "청춘", "순수"],
  },
  {
    name: "사극 전문가 (Historical Drama Expert)",
    scenes: ["사극물", "궁궐", "역사"],
    tags: ["귀족", "협객", "리더"],
  },
  {
    name: "코미디 킹 (Comedy King)",
    scenes: ["드라마물"],
    tags: ["코믹", "입담", "몰상식"],
  },
  {
    name: "SF/판타지 전문 (Sci-Fi/Fantasy Specialist)",
    scenes: ["SF물", "판타지물", "우주", "타임슬립"],
    tags: ["초능력", "영웅", "천재"],
  },
];
