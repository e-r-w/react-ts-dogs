const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-15');
const fetch = require('node-fetch');

// Setup enzyme's react adapter
global.fetch = fetch;
Enzyme.configure({ adapter: new EnzymeAdapter() });