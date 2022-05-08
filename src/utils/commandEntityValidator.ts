import { COMMAND_FORMATS } from '@/contstants';
import isPlural from './others';

export function commandEntityValidator({
  command,
  params,
  paramsConfig,
  pushErrors,
}) {
  let paramsArr = [];

  if (paramsConfig) {
    // if paramsConfig is available and
    // it sees no params throw error
    if (!params) {
      pushErrors(`
        ${command} is missing a parameter \n
        please follow the format: \n
        \n
        ${COMMAND_FORMATS[command]}
      `);

      return;
    }

    paramsArr = params.split(`,`);
    if (paramsArr.length > paramsConfig.length) {
      pushErrors(`
        ${command} should only have ${isPlural(`command`, paramsConfig.length)}
      `);
    }

    paramsConfig.forEach((pc, indx) => {
      const paramVal = paramsArr[indx];
      const { name, isRequired, type, validator } = pc;

      if ((isRequired && !paramVal) || paramVal === ``) {
        pushErrors(`${name} should be defined!`);
        return;
      }

      if (type === `whole number`) {
        const pValueTemp = Number(paramVal);
        const isNotValidNumber =
          Number.isNaN(pValueTemp) || paramVal.includes(`.`);

        if (isNotValidNumber) {
          pushErrors(`${name} is not a valid ${type}`);
        }
      }

      const validatorErrMssg = validator(name, paramVal);
      if (validatorErrMssg) pushErrors(validatorErrMssg);
    });
  }
}
