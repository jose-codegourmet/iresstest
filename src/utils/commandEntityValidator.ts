import { COMMAND_FORMATS, ALLOWED_FACE_DIRECTIONS } from '@/contstants';
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
      const paramValue = paramsArr[indx];
      const { name, isRequired, type, validator } = pc;

      if ((isRequired && !paramValue) || paramValue === ``) {
        pushErrors(`${name} should be defined!`);
        return;
      }

      if (type === `whole number`) {
        const pValueTemp = Number(paramValue);
        const isNotValidNumber =
          Number.isNaN(pValueTemp) || paramValue.includes(`.`);

        if (isNotValidNumber) {
          pushErrors(`${name} is not a valid ${type}`);
        }
      }

      if (type === `faces` && !ALLOWED_FACE_DIRECTIONS.includes(paramValue)) {
        pushErrors(
          `Position F ${name} is not allowed. Please use 'NORTH','SOUTH','EAST' or 'WEST' `,
        );
      }

      if (validator) {
        const validatorErrMssg = validator(name, paramValue);
        if (validatorErrMssg) pushErrors(validatorErrMssg);
      }
    });
  }
}
