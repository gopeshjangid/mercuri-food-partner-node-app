
import * as _ from "lodash";
import { config as sharedConfig } from "./Shared.js";

const configFactory = (() => {
  let appConfig;
  const config = _.merge(sharedConfig, appConfig);
  return Object.freeze(config);
})();

export default configFactory;


