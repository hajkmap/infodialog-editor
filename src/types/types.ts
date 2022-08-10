export interface MapConfig {
  map: {
    title: string;
  };
  projections: Array<{}>;
  tools: Array<{
    index: number;
    type: string;
    options: {};
  }>;
  version: string;
}

export interface Layers {
  arcgislayers: Array<{}>;
  wmslayers: Array<{}>;
  wmtslayers: Array<{}>;
  wfslayers: Array<{}>;
  wfstlayers: Array<{}>;
  vectorlayers: Array<{}>;
}

export type Maps = Array<string>;

export interface InfoDialogOptions {
  allowDangerousHtml: boolean;
  buttonText: string;
  headerText: string;
  icon: string;
  name: string;
  showOnlyOnce: boolean;
  target: "left" | "right" | "toolbar" | "control";
  text: string;
  title: string;
  useLegacyNonMarkdownRenderer: boolean;
  visibleAtStart: boolean;
  visibleForGroups: string[];
}
