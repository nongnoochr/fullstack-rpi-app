import LocalService from '../../services/LocalService'
import ServerService from '../../services/ServerService'

const devMode = false;

// Switch between Local & FullStack mode
const Service = devMode ? LocalService : ServerService;

export default Service;