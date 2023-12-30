export class Rule {
  ruleId!: number;
  content!: string;

  constructor(data: Rule) {
    Object.assign(this, data);
  }
}
