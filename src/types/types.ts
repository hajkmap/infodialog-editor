export interface MapConfig {
  map: {};
  projections: Array<{}>;
  tools: Array<{}>;
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
