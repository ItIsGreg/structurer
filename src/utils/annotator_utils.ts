import { toastError } from "@/toasts";
import {
  ColorStore,
  OldOutline,
  OptionType,
  Entities,
  EntityElement,
  ValueState,
} from "@/types";
import seedrandom from "seedrandom";

export function llmJsonToAnnotatorFormat(llmJson: Entities) {
  let values: ValueState[] = [];
  for (const [resourceType, entities] of Object.entries(llmJson)) {
    if (entities.length > 0) {
      for (const entity of entities) {
        if (entity.matches && entity.matches.length > 0) {
          values.push({
            start: entity.matches[0][0], // only taking into account the first match atm..., also not handling overlapping matches atm
            end: entity.matches[0][1],
            tag: resourceType,
          });
        }
      }
    }
  }
  return values;
}

export const caseInsensitiveFindIter = (
  substring: string,
  text: string
): IterableIterator<RegExpMatchArray> => {
  const cleanedText = text.replace(/\n/g, ""); // Removes newline characters
  const pattern = new RegExp(substring, "igm");
  return cleanedText.matchAll(pattern); // bit hacky, but it works, i hope
};

export const addMatches = (outline: Entities, text: string): void => {
  for (const key in outline) {
    for (const item of outline[key]) {
      console.log(item);
      try {
        const matches = Array.from(caseInsensitiveFindIter(item.item, text));
        console.log(matches);
        item.matches = matches.map((match) => [
          match.index!,
          match.index! + match[0].length,
        ]);
      } catch (error) {
        toastError(`An error occurred during the processing of ${item}`);
      }
    }
  }
};

export const transformOutline = (outline: OldOutline): Entities => {
  const newOutline: Entities = {};

  for (const key in outline) {
    newOutline[key] = [];

    for (const entity of outline[key]) {
      const preppedDict: EntityElement = { item: entity, matches: [] };
      newOutline[key].push(preppedDict);
    }
  }

  return newOutline;
};

export const constructDefaultOutline = (
  defaultFocusResources: OptionType[]
): Entities => {
  let defaultOutline: Entities = {};
  for (const resourceType of defaultFocusResources) {
    defaultOutline[resourceType.value] = [];
  }
  return defaultOutline;
};

export function generateHexColor(rng: seedrandom.PRNG) {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(rng() * 16)];
  }
  return color;
}

export function setColorsForDefaultResources(
  defaultFocusResources: OptionType[],
  rng: seedrandom.PRNG
): ColorStore {
  const colors: ColorStore = {};
  for (const resource of defaultFocusResources) {
    colors[resource.value] = generateHexColor(rng);
  }
  return colors;
}
