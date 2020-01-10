
const faker = require('faker');
exports.seed = function(knex) {
         return knex('grants').insert([
            {
                user_id: 2,
                grant_title: "Street Shares Veteran Small Business Award",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "The StreetShares Foundation supports veteran entrepreneurs through this small business grant. The foundation will choose 8-12 finalists, which will be featured on the StreetShares Foundation website for voting. The top three entrepreneurs selected will be awarded $15,000, $6,000, and $4,000 for first, second, and third places respectively.",
                grant_amount: 15000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 4,
                grant_title: "Amber Grant",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "The Amber Grant is provided by WomensNet in honor of Amber Wigdahl, who died at the age of 19, unable to fulfill her entrepreneurial dreams. A woman will be chosen to receive a $2,000 grant for their business each month, and at the end of the year, they will be eligible for the grand prize of $25,000. What could $27,000 do for your business?",
                grant_amount: 25000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 6,
                grant_title: "NASE Growth Grants",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "Worth up to $4,000 each, NASE Members can apply for small business grants. Small business grants are useful for financing a particular small business need. Past recipients used their growth grants for computers, farm equipment, to hire part-time help, marketing materials, website creation and more. What does your business need?",
                grant_amount: 4000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 8,
                grant_title: "Girlboss Foundation Grant",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "Grants are awarded on a biannual basis to individuals pursuing entrepreneurial endeavors. Each grant beneficiary receives project funding for $15,000, plus exposure through the Girlboss platform and community, as well as local and regional press.",
                grant_amount: 15000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 10,
                grant_title: "Visa Everywhere Initiative",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "Visa Everywhere Initiative is a global innovation program that tasks start-ups to solve payment challenges of tomorrow, further enhance their own product propositions and provide visionary solutions for Visa's vast network of partners. The program first launched in the U.S. in 2015 and quickly expanded into a global program with more than 6000+ participating startups, which have collectively raised over $2.5 billion in funding, with more than 257 finalists and 96 winners selected. The program activates in North America, Latin America, Europe, Asia, Middle East and Africa, touching over 75 countries.",
                grant_amount: 50000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 12,
                grant_title: "Kuvio Grant",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "Kuvio Creative is a full-service web design and development company that wants to give back to those making a difference by providing them with free services. Applications for our next round will be accepted from October 15- November 30, 2019. Applications are then reviewed by a panel of our team and recipients will be announced on December 15, 2019. Applications for the following round will open on March 1, close on March 30, and decisions will be announced on April 15.",
                grant_amount: 50000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 14,
                grant_title: "Eileen Fisher Grant",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "Eileen Fisher provides grants up to $30,000 annually for women-owned businesses working to progress sustainability and environmental initiatives around the world. ",
                grant_amount: 30000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 16,
                grant_title: "Open Meadows Small Business Grant",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "Open Meadows is specifically looking to direct its resources towards changing the world. We are looking for projects focused on activism, political change, and empowerment directed by, and benefiting women and girls. Examples include projects focused on: Standing Rock, boycotts, marches, creation of new activist organizations, labor rights, community organizing, voting rights, environmental activism, economic rights, and other forms of political action encouraging participation by women and girls for women and girls.",
                grant_amount: 2000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 18,
                grant_title: "GATHER Food Sovereignty Grant",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "With the generous support of the Indigenous Peoples Fund at Tide Foundation, First Nations will establish a Gather Food Sovereignty Grant that will support work contributing to building a national movement that will fulfill a vision of Native communities and food systems that are self-directed, well-resourced and supported by community policies and systems. This opportunity is targeting emerging projects that focus on developing Tribal Food Sovereignty. Through the first round of the Gather Food Sovereignty Grant, First Nations expects to award up to 8 grant awards of approximately $32,000 to support Native American-led food sovereignty work.",
                grant_amount: 32000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 20,
                grant_title: "AT&T Aspire Accelerator",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "Technology is empowering teachers, inspiring students to achieve, removing barriers to graduation and preparing today's learners with the skills they'll need for the jobs of tomorrow. The 2019 AT&T Aspire Accelerator $1 Million Skills Building Challenge connects the entrepreneurs who are leading the way with the resources they need to drive exponential change in addressing today's skills gap. ",
                grant_amount: 100000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 22,
                grant_title: "ActivityHero Business Grant Contest",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "ActivityHero offers a $10,000 business grant annually to small businesses offering children's camps, classes, or activities at locations in the United States",
                grant_amount: 10000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 24,
                grant_title: "4.0 School Fellowships",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "4.0 offers two fellowships designed to help you develop your idea and build your leadership skills. We believe in a human-centered process that helps you grow your idea in community and ensures that what you build is truly impactful. As a Fellow, you'll receive access to a national community of supportive and bold leaders in education, targeted coaching from alumni experts, curriculum to help you develop the leadership skills and design thinking frameworks to take your idea to the next level, and capital to help you run small-scale experiences of your idea in your community that help you move forward.",
                grant_amount: 10000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 26,
                grant_title: "The Zach Grant",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "Fundera offers $2,500 checks directly payable to businesses based on inspiring businesses started with the intention to make the world a better place. ",
                grant_amount: 2500,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 28,
                grant_title: "Cartier Women's Initiative",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "Cartier offers a yearly grant of $100,000 to women-owned small businesses across all industries.",
                grant_amount: 100000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              },
              {
                user_id: 30,
                grant_title: "Tory Burch Foundation Fellowship",
                grant_number: faker.random.alphaNumeric(),
                grant_status: Math.round(Math.random()),
                grant_description:
                  "Tory Burch Foundation's fellowship program offers women-owned small businesses a trip to Tory Burch offices for workshops, a 1-year fellowship program, a $5,000 grant, and a pitch day for its fellows.",
                grant_amount: 5000,
                due_date: faker.date.future(),
                created_at: faker.date.recent(),
                grant_type: " "
              }
         ]); 
};