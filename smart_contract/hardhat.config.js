//https://eth-rinkeby.alchemyapi.io/v2/ZjBxZTaDG6YOdV2N44JM4V3QEdhjGsjv

/* plugin to build smart contracts test using waffles in hardhat */
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/ZjBxZTaDG6YOdV2N44JM4V3QEdhjGsjv',
      accounts:['cd3c3b64860ce3fe4ab82e8cf205ce81a884606e42610bca0b52e601b633e0d3']
    }
  }
}
