import { NotImplementedException } from '../../exceptions';
export default class VariableResolver {
  constructor(resolveVariableFunction) {
    this.resolveVariableFunction = resolveVariableFunction;
  }

  resolveVariable(variableName) {
    return this.resolveVariableFunction(variableName);
  }

}