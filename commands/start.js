const { ActionRowBuilder ,ModalBuilder, SlashCommandBuilder, EmbedBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');
const fetch = require("node-fetch");
const { TOKEN2, IDTOKEN, companyId } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Start finding the best deals and sales on any product.'),
    async execute(interaction) {
        const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('Find Products & Services in Any Language!');

        const keywordsInput = new TextInputBuilder()
        .setCustomId('keywords')
        .setLabel("What product/service are you looking for?" )
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Enter product or service name')
        .setRequired(true)

        const countryInput = new TextInputBuilder()
        .setCustomId('country')
        .setMaxLength(2)
        .setLabel("Which country are you located in?")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('ex: US, ro, GB, it, CZ, ru')
        .setRequired(true)

        const currencyInput = new TextInputBuilder()
        .setCustomId('currency')
        .setMaxLength(3)
        .setLabel("What currency do you use?")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('ex: USD, gbp, RON, EUR, rub')
        .setRequired(true)

        const priceInput = new TextInputBuilder()
        .setCustomId('price')
        .setLabel("Set a price range (optional)")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('ex: 20-40, 200-400, 1000-4000')
        .setRequired(false)

        const firstActionRow = new ActionRowBuilder().addComponents(keywordsInput);
        const secondActionRow = new ActionRowBuilder().addComponents(countryInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(currencyInput);
        const fourthActionRow = new ActionRowBuilder().addComponents(priceInput);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

        await interaction.showModal(modal);
        

const filter = (interaction) => interaction.customId === 'myModal' && interaction.user.username === interaction.user.username;

        
interaction.awaitModalSubmit({ filter, time: 100_000 })
  .then(async interaction => {
    const whatKeywords = await interaction.fields.getTextInputValue('keywords')
    let whatCountry = (await interaction.fields.getTextInputValue('country')).toUpperCase();
    let whatCurrency = (await interaction.fields.getTextInputValue('currency')).toUpperCase();
    const whatPrice = await interaction.fields.getTextInputValue('price')
    let first, second;

  if (!whatPrice) {
  first = undefined;
  second = undefined;
} else {
  const priceArray = whatPrice.split(/[^\d]+/).filter(Boolean);
  const arrayLength = priceArray.length;

  if (arrayLength >= 2) {
    [first, second] = [parseInt(priceArray[0]), parseInt(priceArray[1])];
    if (first > second) [first, second] = [second, first];
  } else if (arrayLength === 1) {
    first = 0;
    second = parseInt(priceArray[0]);
  } else {
    first = undefined;
    second = undefined;
  }
}
    
    console.log(first, second);
    
    console.log(whatKeywords, whatCountry, whatCurrency, whatPrice, first, second);

    countries = ['AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BH', 'BS', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CW', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RE', 'RO', 'RU', 'RW', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SZ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU', "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"]
    if (!countries.includes(whatCountry)) {
      whatCountry = "US";
    }

    var currencies = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYR","BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EEK","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","INR","IQD","IRR","ISK","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","STD","SVC","SYP","SZL","THB","TJS","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","XCD","XDR","XOF","XPF","YER","ZAR","ZMK","ZWL"];
    if (!currencies.includes(whatCurrency)) {
      whatCurrency = "USD";
    }

    async function fetchProductData(whatKeywords, whatCountry, whatCurrency, first, second) {
      const body = `{ 
        products(companyId: ${companyId}, partnerStatus:JOINED, keywords: "${whatKeywords}", serviceableAreas: "${whatCountry}", limit: 50, currency: "${whatCurrency}"${(!isNaN(first) && !isNaN(second)) ? `, lowPrice: ${first}, highPrice: ${second}` : ""}) {
          resultList { 
            advertiserName,
            brand,
            title, 
            targetCountry,
            imageLink,
            salePrice {amount, currency},
            price {amount, currency},
            linkCode(pid: ${IDTOKEN}) {
              clickUrl
            } 
          }  
        } 
      }`;
    
      const response = await fetch(`https://ads.api.cj.com/query`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${TOKEN2}`,
          "Content-Type": "application/json"
        },
        body
      });
    
      // Add more fetch requests if needed
    
      const data = await response.json();
      const productList = data.data.products.resultList;
      
      return productList;
    }

    const productData = await fetchProductData(whatKeywords, whatCountry, whatCurrency, first, second);
	
    console.log(productData)
   
    	
    async function getAllEmbeds(productData, whatCountry) {
      const embeds = [];
      let count = 0;
      const allData = productData;
      const seenTitles = new Set();
    
      for (let i = 0; i < allData.length; i++) {
        const jsonData = allData[i];

        if (jsonData.targetCountry !== whatCountry) {
          continue;
        }
    
        if (jsonData.salePrice && jsonData.price && jsonData.salePrice.amount !== jsonData.price.amount && jsonData.salePrice != null && jsonData.linkCode && jsonData.linkCode != null && jsonData.linkCode.clickUrl && jsonData.linkCode.clickUrl != null) {
          const embed = new EmbedBuilder().setColor(0x0099FF);
    
          if (jsonData.title && jsonData.title != null && !seenTitles.has(jsonData.title)) {
            seenTitles.add(jsonData.title);
            embed.setTitle(jsonData.title);
          } else {
            continue;
          }
    
          if (jsonData.linkCode && jsonData.linkCode != null && jsonData.linkCode.clickUrl && jsonData.linkCode.clickUrl != null) {
            embed.setURL(jsonData.linkCode.clickUrl);
          } else {
            break
          }
    
          if (jsonData.imageLink && jsonData.imageLink != null) {
            embed.setThumbnail(jsonData.imageLink);
          }
    
          if (jsonData.salePrice.amount && jsonData.salePrice.currency && jsonData.salePrice != null) {
            embed.addFields(
              { name: 'Sale price', value: `${jsonData.salePrice.amount} ${jsonData.salePrice.currency}`}
            );
          }
    
          if (jsonData.price && jsonData.price.amount && jsonData.price.currency && jsonData.price != null) {
            embed.addFields(
              { name: 'Original price', value: `${jsonData.price.amount} ${jsonData.price.currency}`}
            );
          }
    
          if (jsonData.brand && jsonData.brand != null) {
            embed.addFields(
              { name: 'Brand', value: jsonData.brand}
            );
          }
    
          embeds.push(embed);
          count++;
          if (count >= 10 || i == 49) {
            break;
          } 
        } 
      }
    
      if (count < 10) {
        for (let i = 0; i < allData.length; i++) {
          const jsonData = allData[i];

          if (jsonData.targetCountry !== whatCountry) {
            continue;
          }
    
          if (!jsonData.salePrice || jsonData.salePrice.amount === jsonData.price.amount || jsonData.salePrice === null && jsonData.linkCode && jsonData.linkCode != null && jsonData.linkCode.clickUrl && jsonData.linkCode.clickUrl != null) {
            const embed = new EmbedBuilder().setColor(0x0099FF);
    
            if (jsonData.title && jsonData.title != null && !seenTitles.has(jsonData.title)) {
              seenTitles.add(jsonData.title);
              embed.setTitle(jsonData.title);
            } else {
              continue;
            }
    
            if (jsonData.linkCode && jsonData.linkCode != null && jsonData.linkCode.clickUrl && jsonData.linkCode.clickUrl != null) {
              embed.setURL(jsonData.linkCode.clickUrl);
            } else {
              break
            }
    
            if (jsonData.imageLink && jsonData.imageLink != null) {
              embed.setThumbnail(jsonData.imageLink);
            }
    
            if (jsonData.price && jsonData.price.amount && jsonData.price.currency && jsonData.price != null) {
              embed.addFields(
                { name: 'Original price', value: `${jsonData.price.amount} ${jsonData.price.currency}`}
              );
            }
    
            if (jsonData.brand && jsonData.brand != null) {
              embed.addFields(
                { name: 'Brand', value: jsonData.brand}
              );
            }
    
            embeds.push(embed);
            count++;
            if (count >= 10 || i == 49) {
              break
            }
          }
        }
      } 

  return embeds;
}

    const finalEmbeds = await getAllEmbeds(productData, whatCountry); 

    const noResultsEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle("Oops, we couldn't find what you're looking for.")
		.setDescription('Try adjusting your search criteria, like using a different currency or being more specific with your product name.')
    
    

    // if (finalEmbeds.length === 0) {
    //   await interaction.deferReply({ephemeral: true});
    //   await interaction.editReply({content: 'No results were returned. Try changing the data used in the search screen!'});
    // } else {
    //   await interaction.deferReply({ephemeral: true});
    //   await interaction.editReply({embeds: finalEmbeds, content: 'NOTE: The images may take a while to load. Please consider accepting cookies on the websites. Thank you!'});
    // }

      await interaction.deferReply({ephemeral: true});
      if (finalEmbeds.length === 0) {
        await interaction.editReply({ embeds: [noResultsEmbed]});
      } else if (finalEmbeds.length !== 0){
        await interaction.editReply({embeds: finalEmbeds, content: 'Please note that the images may take a moment to load.'});
      } else {
        await interaction.editReply({content: 'There was an error when processing the response. Try again.'});
      }
})
  .catch(console.error);
        
    },
};