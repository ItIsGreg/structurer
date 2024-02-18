import { Entities, EntityElement } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { flatMap } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TextSlice {
  isMatch: boolean;
  text: string;
}

export interface TextSlice {
  isMatch: boolean;
  text: string;
  entity?: EntityElement; // Optional entity information
}

export const sliceAnnotatedText = (
  text: string,
  entities: Entities
): TextSlice[] => {
  // Flatten to get all matches with their corresponding entity
  const matchesWithEntities: { match: number[]; entity: EntityElement }[] =
    flatMap(
      Object.values(entities).map((entityArray) =>
        entityArray.flatMap(
          (entity) => entity.matches?.map((match) => ({ match, entity })) || []
        )
      )
    );

  // Sort matches with entities by their start index
  matchesWithEntities.sort((a, b) => a.match[0] - b.match[0]);

  const slices: TextSlice[] = [];
  let start = 0;

  matchesWithEntities.forEach(({ match: [from, to], entity }) => {
    // Add non-annotated slice only if there's text before the current match
    if (from > start) {
      const before = text.slice(start, from);
      slices.push({ isMatch: false, text: before });
    }

    // Add annotated slice with entity information
    const annotated = text.slice(from, to);
    slices.push({ isMatch: true, text: annotated, entity });

    start = to; // Prepare start for the next iteration
  });

  // Add any remaining non-annotated text after the last match
  if (start < text.length) {
    slices.push({ isMatch: false, text: text.slice(start) });
  }

  return slices;
};
