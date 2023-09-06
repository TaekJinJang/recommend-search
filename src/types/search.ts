export interface searchItemType {
    sickCd: string;
    sickNm: string;
}
export type eventType =
    | React.KeyboardEvent<HTMLInputElement>
    | React.FormEvent<HTMLFormElement>
    | React.MouseEvent<HTMLDivElement>;
