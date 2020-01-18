import LocalService from '../../services/LocalService'
import ServerService from '../../services/ServerService'

import packageJson from '../../../package.json';
console.log(packageJson);

const devMode = packageJson.useLocalService;

// Switch between Local & FullStack mode
const Service = devMode ? LocalService : ServerService;

export default Service;