const { Server, Site, Dictionary, LinkTypes } = require("kgrabber-types");

let servers = new Dictionary([
		new Server("hydrax", {
		regex: /"https:\/\/playhydrax.com\/\?v=.*?"/,
		name: "HydraX (no captcha)",
		linkType: LinkTypes.EMBED,
		customStep: "modalBegin",
	}),

		new Server("nova", {
		regex: /"https:\/\/www.novelplanet.me\/v\/.*?"/,
		name: "Nova",
		linkType: LinkTypes.EMBED,
		customStep: "modalBegin",
	}),

		new Server("beta", {
		regex: /"https:\/\/redirector.googlevideo.com\/videoplayback\?.*?"/,
		name: "Beta",
		linkType: LinkTypes.DIRECT,
		customStep: "modalBegin",
	}),

		new Server("beta2", {
		regex: /"https:\/\/lh3.googleusercontent.com\/.*?"/,
		name: "Beta2",
		linkType: LinkTypes.DIRECT,
		customStep: "modalBegin",
	}),

		new Server("beta3", {
		regex: /"https:\/\/redirector.googlevideo.com\/videoplayback\?.*?"/,
		name: "Beta3",
		linkType: LinkTypes.DIRECT,
		customStep: "modalBegin",
	}),

		new Server("mp4upload", {
		regex: /"https:\/\/www.mp4upload.com\/embed-.*?"/,
		name: "Mp4Upload",
		linkType: LinkTypes.EMBED,
		customStep: "modalBegin",
	}),
]);

module.exports = new Site("kissanime.ru", {
	contentPath: "Anime",
	noCaptchaServer: "hydrax",
	buttonColor: "#548602",
	buttonTextColor: "#fff",
	servers,
});
