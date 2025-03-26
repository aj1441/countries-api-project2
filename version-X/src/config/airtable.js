import Airtable from 'airtable';

const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

export default base;

// var Airtable = require('airtable');
// Airtable.configure({
//     endpointUrl: 'https://api.airtable.com',
//     apiKey: 'YOUR_SECRET_API_TOKEN'
// });
// var base = Airtable.base('app92SnUPpbqA0G9G');