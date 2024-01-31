const { ActionRowBuilder, SlashCommandBuilder, StringSelectMenuBuilder, Client, InteractionCollector } = require('discord.js');
const fetch = require("node-fetch");
const xml2js = require("xml2js");
const { TOKEN2, IDTOKEN, companyId } = require('../config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('catalogue')
        .setDescription('Work in progress.'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
                .addOptions(
                    {
                        label: "Art, Photo & Music",
                        value: "Art, Photo & Music",
                    },
                    {
                        label: "Cars & Motorcycles",
                        value: "Cars & Motorcycles",
                    },
                    {
                        label: "Beauty & Fragrances",
                        value: "Beauty & Fragrances",
                    },
                    {
                        label: "Books & Media",
                        value: "Books & Media",
                    },
                    {
                        label: "Buying & Selling",
                        value: "Buying & Selling",
                    },
                    {
                        label: "Clothing, Apparel & Accessories",
                        value: "Clothing, Apparel & Accessories",
                    },
                    {
                        label: "Computer & Electronics",
                        value: "Computer & Electronics",
                    },
                    {
                        label: "Department Stores & Malls",
                        value: "Department Stores & Malls",
                    },
                    {
                        label: "Education & Careers",
                        value: "Education & Careers",
                    },
                    {
                        label: "Family",
                        value: "Family",
                    },
                    {
                        label: "Financial Services",
                        value: "Financial Services",
                    },
                    {
                      label: "Business",
                      value: "Business",
                    },
                    {
                        label: "Food & Drinks",
                        value: "Food & Drinks",
                    },
                    {
                        label: "Games & Toys",
                        value: "Games & Toys",
                    },
                    {
                        label: "Gifts & Flowers",
                        value: "Gifts & Flowers",
                    },
                    {
                        label: "Home & Garden",
                        value: "Home & Garden",
                    },
                    {
                        label: "Insurance & Legal",
                        value: "Insurance & Legal",
                    },
                    {
                        label: "Marketing",
                        value: "Marketing",
                    },
                    {
                        label: "Recreation, Leisure & Entertainment",
                        value: "Recreation, Leisure & Entertainment",
                    },
                    {
                        label: "Seasonal",
                        value: "Seasonal",
                    },
                    {
                        label: "Fitness & Wellness",
                        value: "Fitness & Wellness",
                    },
                    {
                      label: "Sports",
                      value: "Sports",
                    },
                    {
                        label: "Telecommunications & Online Services",
                        value: "Telecommunications & Online Services",
                    },
                    {
                        label: "Travel",
                        value: "Travel",
                    },
                    

                ),
                
        );

        
        const initialMessage = await interaction.reply({
          content: 'Please select a category',
          components: [row],
          ephemeral: true
      });

      const filter = (interaction) => interaction.customId === 'select';
      const collector = initialMessage.createMessageComponentCollector({ filter });

      collector.on('collect', async (interaction) => {
          const category = await interaction.values[0];
        //   console.log(category);
          
          await interaction.deferReply({ content: category, ephemeral: true, components: [] });
          
          const it = categories[category];
          const allData = await fetchPromotions(it);
          const processedData = processPromotions(allData);
          const filteredData = await filterDuplicates(processedData);

          let languageList = [];
for (let i = 0; i < filteredData.length; i++) {
  if (!languageList.includes(filteredData[i].language)) {
    languageList.push(filteredData[i].language);
  }
}

let languageArray = [];

if (languageList.length === 0) {
  // If no languages were found, return a message indicating that there are no results
  await interaction.editReply({ content: 'No results found for selected category' });
} else {
  for (let i = 0; i < languageList.length; i++) {
    let languageObject = {
      label: languageList[i],
      value: languageList[i]
    };
    languageArray.push(languageObject);
  }

  const row2 = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('select2')
        .setPlaceholder('Nothing selected')
        .addOptions(...languageArray)
    );

  // Add the "row2" component to your message or interaction object
  await interaction.editReply({ content: 'Please select a language:', components: [row2] });
}


// Add the "row2" component to your message or interaction object


          console.log(languageList)
          console.log(filteredData);
      });

      collector.on('end', async (collected) => {
          if (collected.size === 0) {
              await initialMessage.edit({ content: 'You did not select a category', components: [] });
          }
      });
        
      

      
      
                    

        const categories = {
            "Art, Photo & Music": ["Art", "Music", "Photo"],
            "Cars & Motorcycles": ["Motorcycles", "Rentals", "Tools and Supplies"],
            "Beauty & Fragrances": ["Cosmetics", "Fragrance", "Green"],
            "Books & Media": ["Audio Books", "Books", "Magazines", "News", "Television", "Videos/Movies"],
            "Buying & Selling": ["Auction", "Classifieds", "E-commerce Solutions/Providers", "New/Used Goods"],
            "Clothing, Apparel & Accessories": ["Children's", "Green", "Malls", "Men's", "Women's", "Handbags", "Jewelry", "Shoes"],
            "Computer & Electronics": ["Computer HW", "Computer Support", "Consumer Electronics", "Green", "Peripherals"],
            "Department Stores & Malls": ["Department Stores", "Virtual Malls"],
            "Education & Careers": ["Children", "College", "Languages", "Professional", "Employment", "Military"],
            "Family": ["Babies", "Children", "Entertainment", "Teens", "Weddings"],
            "Financial Services": ["Banking/Trading", "Credit Cards", "Credit Reporting and Repair", "Investment", "Mortgage Loans", "Personal Loans", "Real Estate Services", "Tax Services"],
            "Business": ["Business-to-Business", "Marketing", "Office", "Productivity Tools", "Travel"],
            "Food & Drinks": ["Gourmet", "Green", "Groceries", "Restaurants"],
            "Games & Toys": ["Electronic Games", "Electronic Toys", "Games", "Toys"],
            "Gifts & Flowers": ["Collectibles", "Flowers", "Gifts", "Green", "Greeting Cards"],
            "Home & Garden": ["Construction", "Energy Saving", "Furniture", "Garden", "Green", "Home Appliances", "Kitchen", "Pets", "Real Estate", "Recycling", "Utilities"],
            "Insurance & Legal": ["Commercial", "Personal Insurance", "Services"],
            "Marketing": ["Business-to-Business", "Network Marketing", "Non-Profit", "Charitable Organizations", "Fundraising"],
            "Recreation, Leisure & Entertainment": ["Astrology", "Betting/Gaming", "Camping and Hiking", "Communities", "Green", "Matchmaking", "Outdoors", "Tobacco", "Discounts", "Events", "Guides", "Memorabilia", "Mobile Entertainment", "Party Goods"],
            "Seasonal": ["Autumn", "Back to School", "Black Friday/Cyber Monday", "Christmas", "Easter", "Fathers Day", "Halloween", "Mothers Day", "New Years Resolution", "Spring", "Summer", "Tax Season", "Valentines Day", "Winter"],
            "Fitness & Wellness": ["Equipment", "Green", "Health Food", "Nutritional Supplements", "Pharmaceuticals", "Self Help", "Vision Care", "Weight Loss", "Wellness", "Apparel", "Collectibles and Memorabilia", "Equipment"],
            "Sports": ["Sports", "Summer Sports", "Water Sports", "Winter Sports", "Golf", "Professional Sports Organizations"],
            "Telecommunications & Online Services": ["Online/Wireless", "Phone Card Services", "Telephone Services", "Blogs", "Broadband", "Domain Registrations", "Email Marketing", "Internet Service Providers", "Search Engine", "Web Design", "Web Hosting/Servers", "Web Tools"],
            "Travel": ["Accessories", "Air", "Car", "Green", "Hotel", "Luggage", "Vacation"]
          }
        
          

        async function filterDuplicates(promotions) {
            const seenPromotions = new Set();
            const uniquePromotions = [];
          
            for (const promotion of promotions) {
              const { destination } = promotion;
              const promotionKey = `${destination}`;
          
              if (!seenPromotions.has(promotionKey)) {
                seenPromotions.add(promotionKey);
                uniquePromotions.push(promotion);
              }
            }
          
            return uniquePromotions;
          }
          
          function processPromotions(promotions) {
            const processedPromotions = [];
          
            for (const promotionList of promotions) {
              for (const promotion of promotionList) {
                const processedPromotion = {
                  category: promotion.category[0],
                  language: promotion.language[0],
                  description: promotion.description[0],
                  destination: promotion.destination[0],
                  clickUrl: promotion.clickUrl[0]
                };
          
                if (promotion.hasOwnProperty('promotion-end-date')) {
                  processedPromotion.promotionEndDate = promotion['promotion-end-date'][0];
                }
          
                if (promotion.hasOwnProperty('link-name')) {
                  processedPromotion.linkName = promotion['link-name'][0];
                }
          
                processedPromotions.push(processedPromotion);
              }
            }
          
            return processedPromotions;
          }
          
          async function fetchPromotions(it) {
            const finalList = [];
            const fetchPromises = [];
            const maxPages = 5; // set a maximum number of pages to prevent an infinite loop
            let shouldRestart = false;
          
            for (const i of it) {
              let page = 1;
              while (page <= maxPages) {
                const salesPromise = fetch(`https://link-search.api.cj.com/v2/link-search?website-id=${IDTOKEN}&advertiser-ids=joined&records-per-page=100&promotion-type=sale/discount&category=${i}&page-number=${page}`, {
                  method: "GET",
                  headers: {
                    "Authorization": `Bearer ${TOKEN2}`
                  },
                })
                  .then(response => response.text())
                  .then(salesData => {
                    return new Promise((resolve, reject) => {
                      xml2js.parseString(salesData, (err, res) => {
                        if (err) {
                          shouldRestart = true;
                          reject(err);
                        } else {
                          const salesResult = res['cj-api'].links[0].link;
                          if (salesResult !== undefined) {
                            finalList.push(salesResult);
                          } else {
                            iteration = false; // no more pages available, exit the inner loop
                          }
                          resolve();
                        }
                      });
                    });
                  })
                  .catch(error => {
                    console.error(`Error fetching coupon data for category ${i}, page ${page}: ${error}`);
                    shouldRestart = true;
                    return undefined;
                  });
          
                const couponPromise = fetch(`https://link-search.api.cj.com/v2/link-search?website-id=${IDTOKEN}&advertiser-ids=joined&records-per-page=100&promotion-type=coupon&category=${i}&page-number=${page}`, {
                  method: "GET",
                  headers: {
                    "Authorization": `Bearer ${TOKEN2}`
                  },
                })
                  .then(response => response.text())
                  .then(couponData => {
                    return new Promise((resolve, reject) => {
                      xml2js.parseString(couponData, (err, res) => {
                        if (err) {
                          shouldRestart = true;
                          reject(err);
                        } else {
                          const couponResult = res['cj-api'].links[0].link;
                          if (couponResult !== undefined) {
                            finalList.push(couponResult);
                          } else {
                            iteration = false; // no more pages available, exit the inner loop
                          }
                          resolve();
                        }
                      });
                    });
                  })
                  .catch(error => {
                    console.error(`Error fetching coupon data for category ${i}, page ${page}: ${error}`);
                    shouldRestart = true;
                    return undefined;
                  });
          
                fetchPromises.push(salesPromise, couponPromise);
          
                page++;
              }
            }
          
            await Promise.allSettled(fetchPromises);
          
            if (shouldRestart) {
              // restart the whole fetching process
              console.log("Error occurred, restarting fetching process...");
              return await fetchPromotions(it);
            }
          
            // console.log(finalList.length);
            return finalList;
          }

          
        
    },

};

