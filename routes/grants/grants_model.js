const db = require('../../database/DbConfig');

module.exports = {
    // find, 
    masterSearch
}

//Function to obtain all grants
// function find() {
//     return db('grants');
// };

//Function to obtain all grants by different parameters
function masterSearch(state=2, counties='', amaount='', elegibility='', categories='') {
    // return db('grants as G').innerJoin('users AS U', 'G.user_id','U.id')
    //                         .innerJoin('regions AS R', 'G.id' , 'R.grant_id')
    //                         .innerJoin('states AS S', 'R.state_id', 'S.id' )
    //                         .innerJoin('counties AS C', 'R.county_id', 'C.id')
    //                         .innerJoin('elegibility_grants AS EG', 'G.id', 'EG.grants_id')
    //                         .innerJoin('elegibility AS E', 'E.id','EG.elegibility_id')
    //                         .innerJoin('category_grants AS CG', 'G.id', 'CG.grants_id')
    //                         .innerJoin('category_keys AS CK','CK.id','CG.category_id')
    //                         .select('G.grant_title','G.grant_number','G.grant_status','G.grant_description','G.grant_amount','G.due_date',
    //                                 'U.first_name','U.last_name','U.email','U.telephone','U.department','U.organization_name','U.address_one','U.address_two','U.zip_code',
    //                                 'R.country_wide','R.state_id','R.county_id',
    //                                 'S.state_name',
    //                                 'C.county_name',
    //                                 'EG.grants_id','EG.elegibility_id',
    //                                 'E.elegibility_name',
    //                                 'CG.category_id',
    //                                 'CK.category_name'
    //                                 )
    //                         // .where('R.state_id', '=',  state)

        return db('grants as G')
                            .innerJoin('users AS U', 'G.user_id','U.id')
                            .innerJoin('regions AS R', 'G.id' , 'R.grant_id')
                            .leftJoin('states AS S', 'R.state_id', 'S.id' )
                            .leftJoin('counties AS C', 'R.county_id', 'C.id')
                            .innerJoin('elegibility_grants AS EG', 'G.id', 'EG.grants_id')
                            .innerJoin('elegibility AS E', 'E.id','EG.elegibility_id')
                            .innerJoin('category_grants AS CG', 'G.id', 'CG.grants_id')
                            .innerJoin('category_keys AS CK','CK.id','CG.category_id')
                            .select('G.id','G.grant_title','G.grant_number','G.grant_status','G.grant_description','G.grant_amount','G.due_date',
                                    'U.first_name','U.last_name','U.email','U.telephone','U.department','U.organization_name','U.address_one','U.address_two','U.zip_code',
                                    'R.country_wide','R.state_id','R.county_id',
                                    'S.state_name',
                                    'C.county_name',
                                    'EG.grants_id','EG.elegibility_id',
                                    'E.elegibility_name',
                                    'CG.category_id',
                                    'CK.category_name'
                                    )
                            // .where('R.state_id', '=',  state)

                            
};