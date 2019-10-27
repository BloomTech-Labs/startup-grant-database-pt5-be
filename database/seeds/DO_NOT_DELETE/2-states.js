require('dotenv').config();
const axios= require('axios').default;
const api = process.env.BATTUTA_API;

function getStates() {
     return new Promise((resolve , reject) => {
           resolve(axios.get(`http://battuta.medunes.net/api/region/US/all/?key=${api}`))
  })
}

exports.seed = function(knex) {
        return  getStates().then(function(response) {
          const data = response.data;
          const final_states = data.map(items => {
                return {state_name: items.region}
              })
              return final_states;
        }).then(function(response) {
          return knex('states').insert(response);
        }); 
  };