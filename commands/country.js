const covid = require('novelcovid');
const { localize, localizeCountry } = require("../translations/translate.js")
async function getCountry(message="", command) {
    let specificCountry = await covid.countries({ country: command })
    if (specificCountry.message)
        return message.channel.send("("+command+") "+localize.translate(specificCountry.message) +
            "\n" + localize.translate("You can try ISO code or enter `cov help` for commands"));

    const embedMsg = {
        color: 0x0099ff,
        author: {
            name: "COVID-19 " + localize.translate("Statistics for $[1]($[2])", specificCountry.country, specificCountry.countryInfo.iso2),
            icon_url: 'https://i.imgur.com/nP4sNCes.jpg',
        },
        thumbnail: { url: specificCountry.countryInfo.flag },
        fields: [
            { name: localize.translate("Cases"), value: specificCountry.cases.toLocaleString('en-US'), inline: true },
            { name: localize.translate('Active'), value: specificCountry.active.toLocaleString('en-US'), inline: true },
            { name: localize.translate('Deaths'), value: specificCountry.deaths.toLocaleString('en-US'), inline: true },
            { name: localize.translate('Recovered'), value: specificCountry.recovered.toLocaleString('en-US'), inline: true },
            { name: localize.translate('Critical'), value: specificCountry.critical.toLocaleString('en-US'), inline: true },
            { name: localize.translate('Tests'), value: specificCountry.tests.toLocaleString('en-US'), inline: true },
            { name: localize.translate('Cases Today'), value: specificCountry.todayCases.toLocaleString('en-US'), inline: true },
            { name: localize.translate('Deaths Today'), value: specificCountry.todayDeaths.toLocaleString('en-US'), inline: true },
            { name: localize.translate('Recovered Today'), value: specificCountry.todayRecovered.toLocaleString('en-US'), inline: true }
        ],
        footer: {
            text: `${localize.translate("$[1] for commands", "`cov help`")} || ${localize.translate("$[1] to invite your server", "`cov invite`")}
${"Türkçe için `cov setlan tr`|| `cov setlan en` for English"}`

        }
    }
    return await message.channel.send({ embed: embedMsg })
}

module.exports = {
    name: 'country',
    description: 'Country command',
    aliases: ['c', "ülke"],
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(localize.translate("You didn't provide any country name")+`, ${message.author}!`);
        } else {
            let country = localizeCountry(args)
            getCountry(message, country)
        }
    },
};