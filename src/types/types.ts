export interface MapConfig {
  map: {};
  projections: Array<{}>;
  tools: Array<{}>;
  version: string;
}

export interface InfoDialogOptions {
  allowDangerousHtml: boolean;
  buttonText: string;
  headerText: string;
  icon: string;
  name: string;
  showOnlyOnce: boolean;
  target: string;
  text: string;
  title: string;
  useLegacyNonMarkdownRenderer: boolean;
  visibleAtStart: boolean;
  visibleForGroups: string[];
}
