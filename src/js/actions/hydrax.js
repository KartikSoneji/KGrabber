/**
 * @typedef {import("kgrabber-types/Episode")} Episode
 */

const ajax = require("../util/ajax"),
	util = require("../util"),
	preferenceManager = require("../config/preferenceManager"),
	shared = require("./shared"),
	{ Action, LinkTypes } = require("kgrabber-types");

module.exports = [
	new Action("get referer links", {
		executeFunc: async (status, setProgress) => {
			await shared.eachEpisode(status.episodes, getDirect, setProgress);
			status.linkType = LinkTypes.REFERER;
		},
		availableFunc: (action, status) => {
			return shared.availableFunc(status, {
				linkType: LinkTypes.EMBED,
				servers: ["hydrax"],
			});
		},
		automatic: true,
	}),
];

/**
 * Asynchronously gets the direct link
 * @param {Episode} episode
 * @returns {Promise<void>}
 */
async function getDirect(episode) {
	if (episode.error) return;

	let { success, url, response } = await getUrl(episode);
	if (!success) return;

	url = "https://" + findQuality(response.sources, url);
	if (url) {
		let referer = episode.functionalLink;
		episode.processedLink = { url, referer };
		episode.displayOverride = `${url} | ${referer}`;
		return;
	}

	episode.error = "preferred qualities not found";
	util.log.err(`hydrax: ${episode.error}`, { response, url });
}

/**
 * @typedef Response
 * @property {Boolean} status
 * @property {string} url
 * @property {string[]} sources
 * @property {Boolean} isCdn
 * @property {Boolean} isHls
 * @property {string} ads
 */

/**
 * @param {Episode} episode
 * @returns {{success:Boolean, url?:string, response?:Response}}
 */
async function getUrl(episode) {
	let slug = episode.functionalLink.match(/v=(.*?)(?:&|$)/)[1];
	let response = await ajax.post("https://ping.idocdn.com/", `slug=${slug}`, { "content-type": "application/x-www-form-urlencoded" });
	let data = JSON.parse(response.response);

	if (data.status != true) {
		episode.error = data.msg;
		util.log.err(`hydrax: ${episode.error}`, response);
		return { success: false };
	}

	let url = atob(data.url.slice(-1) + data.url.slice(0, -1));
	return { success: true, url, response };
}

/**
 * @param {string[]} sources
 * @param {string} url
 */
function findQuality(sources, url) {
	for (let quality of preferenceManager.getQualityPriority()) {
		if (quality == 360) {
			return url;
		} else if (quality == 720) {
			return "www." + url;
		}
	}
}
