require('dotenv').config();
const axios = require('axios').default;
const api = process.env.BATTUTA_API; 
const db = require('../../routes/states_cities/states_model.js')

//FUNCTION TO GET STATES DIRECTLY FROM DATABASE
function getStates() {
  return new Promise(function(resolve , reject) {
    resolve(db.find());
  })
}

//FUNCTION TO GET THE CITIES FROM THE API PASSING THE STATE
async function getCounties(state) {
    return await axios.get(`http://battuta.medunes.net/api/city/us/search/?region=${state}&key=${api}`);
}

//FUNCTION TO ITERATE THRU ALL STATES AND BUILD THE FINAL OBJECT TO INSERT IN THE TABLE
async function buildCounties(states) {
  var final_city_object = [];
    
    for (let i = 0 ; i < Object.keys(states).length ; i++) { 
       var counties = [];
       const state_id = states[i].id;
       counties = await getCounties(states[i]['state_name']);
       let city_array = counties.data.map(item => {
         return {
                 state_id: state_id, 
                 county_name: item.city
                }
       })
      
       final_city_object = final_city_object.concat(city_array);
      
      }  
       return final_city_object;
    }
    
  
//PROMISES LOGIC
exports.seed = function(knex) {
      return getStates().then(function(states) {
          return buildCounties(states);
      }).then(function(batch_from_buildCounties) {
        return knex('counties').insert(batch_from_buildCounties);
      })
   }
    