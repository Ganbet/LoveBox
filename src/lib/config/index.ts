import JwtConfig from './Jwt.config';
import NodeConfig from './Node.config';

class Config {
  jwt = new JwtConfig();
  node = new NodeConfig();
}

export default new Config();
