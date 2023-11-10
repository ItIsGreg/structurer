import React, { RefObject } from "react";
import seedrandom from "seedrandom";

export interface OptionType {
  label: string;
  value: string;
}

export interface SectionInfo {
  key: string;
  startIndex: number;
  endIndex: number;
  askedFor: boolean;
  text?: string;
  entities?: Entities;
}

export interface LMMSections {
  sectionsAskedFor: Record<string, string[]>;
  sectionsInferred: Record<string, string[]>;
}

export interface TextDisplayProps {
  text: string;
  outline?: Entities;
  setText: (text: string) => void;
  setOutline: (outline: Entities) => void;
  activeResourceType?: OptionType;
  colors: ColorStore;
  selectedEntity?: EntityElement;
}

// enum with three states: "askedFor", "inferred", "notAllocated"
export enum SectionState {
  askedFor,
  inferred,
  notAllocated,
}

export enum StructurerModes {
  inputText,
  labelText,
  segmentText,
}

export interface ApiKeyElementProps {
  apiKey: string;
  id: number;
}

export interface StructurerProps {
  text: string;
  setText: (text: string) => void;
  setMode: (mode: StructurerModes) => void;
  llmResponse?: string;
  setLlmResponse: (llmResponse: string) => void;
  outline: SectionInfo[];
  setOutline: (outline: SectionInfo[]) => void;
  focusedSection?: SectionInfo;
  setFocusedSection: (section: SectionInfo) => void;
  sectionRefs: RefObject<HTMLDivElement>[];
  focusedCategory?: string;
  setFocusedCategory: (entity: string) => void;
  colors: ColorStore;
  setColors: (colors: ColorStore) => void;
  rng: seedrandom.PRNG;
  expandedSections: ExpandedSections;
  setExpandedSections: (expandedSections: ExpandedSections) => void;
}

export interface StructurerTextProps extends StructurerProps {
  mode: StructurerModes;
}

export interface structureTextWithTemplateAndInferResponse {
  sections_asked_for: {
    [key: string]: string[];
  };
  sections_inferred: {
    [key: string]: string[];
  };
  text: string;
}

export interface CategorySelectorProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  onSelectCategory: (category: string) => void;
  placeholder: string;
  InputComponent: React.FC<InputTextProps | InputSelectionProps>;
  fetchCategories?: () => Promise<string[]>;
  DisplayComponent: React.FC<DisplayCategoriesProps>;
  focusedCategory?: string;
  setFocusedCategory: (category: string) => void;
  colors?: ColorStore;
  setColors: (colors: ColorStore) => void;
  getColor?: () => string;
  rng: seedrandom.PRNG;
}

export interface DisplayCategoriesProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  colors?: ColorStore;
  setColors: (colors: ColorStore) => void;
  getColor?: () => string;
  focusedCategory?: string;
  setFocusedCategory: (category: string) => void;
  rng: seedrandom.PRNG;
}

export interface StructurerTextDisplayProps extends StructurerTextProps {}

export interface StructurerTextDisplaySectionProps
  extends StructurerTextDisplayProps {
  section: SectionInfo;
  index: number;
  setShowSplitSectionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSplitSection: React.Dispatch<
    React.SetStateAction<SectionInfo | undefined>
  >;
  setShowSectionRenameModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRenameSection: React.Dispatch<
    React.SetStateAction<SectionInfo | undefined>
  >;
}

export interface StructurerWorkBenchProps extends StructurerTextProps {}

export interface StructurerWorkBenchTextInputProps
  extends StructurerWorkBenchProps {}

export interface StructurerWorkBenchSegmenterProps
  extends StructurerWorkBenchProps {}

export interface StructurerWorkBenchLabelerProps
  extends StructurerWorkBenchProps {}

export interface StructurerTextInputProps extends StructurerProps {}

export enum CategorySelectorInputTypes {
  text,
  selection,
}

export interface InputProps {
  onSelect: (category: string) => void;
  placeholder: string;
}

export interface InputSelectionProps extends InputProps {
  fetchCategories?: () => Promise<string[]>;
}

export interface InputTextProps extends InputProps {}

export interface Section {
  id: number;
  heading: string;
  text: string;
  state: SectionState;
  children: React.ReactNode;
}

export interface SectionComponentProps {
  section: Section;
  children: React.ReactNode;
}

export interface SectionTextProps {
  children: React.ReactNode;
}

export interface StructurerOutlineProps extends StructurerProps {}

export interface StructurerOutlineSectionProps extends StructurerOutlineProps {
  section: SectionInfo;
}

export interface StructurerOutlineEntityProps
  extends StructurerOutlineSectionProps {
  entity: EntityElement[];
  entityName: string;
}

export interface StructurerOutlineEntityElementProps
  extends StructurerOutlineEntityProps {
  entityElement: EntityElement;
}

export interface Outline {
  [key: string]: Entities; // key is section
}

export interface TextInputProps {
  text: string;
  setText: (text: string) => void;
  setOutline: (outline: Entities) => void;
}

export interface ValueState {
  start: number;
  end: number;
  tag: string;
}

export interface EntityElement {
  item: string;
  matches?: [number, number][];
}

export interface NoMatchesLLM {
  [key: string]: {
    [key: string]: string;
  }[];
}

export interface Entities {
  [key: string]: EntityElement[]; // key is resource type
}

export interface StructurerOutlineDownloadButtonProps {
  outlinePart: SectionInfo[] | SectionInfo | Entities;
}

export interface MatchedEntitiesLLM {
  [key: string]: { [key: string]: string }[]; // first key: Entity (e.g. "Condition"), second key: entityElement (e.g. "diabetes")
}

export interface OldOutline {
  [key: string]: string[];
}

export interface ExpandedSections {
  [key: string]: boolean;
}

export interface OutlineArrayItem extends EntityElement {
  resourceType: string;
}

export interface ColorStore {
  [key: string]: string;
}

export interface Color {
  resourceType: string;
  color: string;
}

export interface StructurerUploadProps {
  setText: (text: string) => void;
}

export interface SetApiKeyModalProps {
  setShowSetApiKeyModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface StructurerSectionCombineButtonProps {
  state: CombineSectionButtonState;
  outline: SectionInfo[];
  setOutline: (outline: SectionInfo[]) => void;
  section: SectionInfo;
}

export enum CombineSectionButtonState {
  CombineAbove,
  CombineBelow,
}

export enum TextExtractionApiEndpoints {
  extractPDFText = "extractPDFText",
  extractScanText = "extractScanText",
}

export interface StructurerSectionSplitModalProps {
  setShowSplitSectionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSpliceSection: (section: SectionInfo | undefined) => void;
  splitSection: SectionInfo;
  setOutline: (outline: SectionInfo[]) => void;
  outline: SectionInfo[];
}

export interface StructurerSectionSplitButtonProps {
  setShowSplitSectionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSplitSection: React.Dispatch<
    React.SetStateAction<SectionInfo | undefined>
  >;
  section: SectionInfo;
}

export interface StructurerSectionLabelButtonProps {
  focusedSection: SectionInfo | undefined;
  section: SectionInfo;
  setFocusedSection: (section: SectionInfo) => void;
}

export interface StructurerSectionRenameButtonProps {
  setShowSectionRenameModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRenameSection: React.Dispatch<
    React.SetStateAction<SectionInfo | undefined>
  >;
  section: SectionInfo;
}

export interface StructurerSectionRenameModalProps {
  setShowSectionRenameModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRenameSection: (section: SectionInfo | undefined) => void;
  renameSection: SectionInfo;
  setOutline: (outline: SectionInfo[]) => void;
  outline: SectionInfo[];
}

export interface InputDict {
  resource_type: string;
  medical_term: string;
  context: string;
}
