export interface ISelect {
  selectLabel: string;
  selectValue: string;
  className?: string;
}

export interface ISelectComponent {
  select?: ISelect[];
  value?: string;
}
