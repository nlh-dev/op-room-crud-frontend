export interface ISelect {
  selectLabel: string;
  selectValue: string;
}

export interface ISelectComponent {
  select?: ISelect[];
  className?: string;  
  
  value?: string;
}
