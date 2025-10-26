// index.ts
interface Env {
	COUNTRYFLAGS: cfdemocountrycode;
}
var index_default = {
  async fetch(request, env, ctx): Promise<Response> {
    const requrl = new URL(request.url);
    const pathSegments = requrl.pathname.split("/").filter(Boolean);
    let html_style = `body{padding:6em; font-family: sans-serif;} h1{color:#f6821f}`;
    let html_content = "";
    let timestampMS = Date.now();
    const userEmail = request.headers.get("CF-Access-Authenticated-User-Email");
    let countrypath = request.cf.country;
    let lowcountrypath = countrypath.toLowerCase();
    let url = "/secure/";
    let country_html = "<a href=" + url + lowcountrypath + " id=country>" + lowcountrypath + "</a>";
    html_content += userEmail + " authenticated at " + timestampMS + " from " + country_html;

    let html = `
    <!DOCTYPE html>
    <head>
      <title>DemoCloudwatch</title>
    </head>
    <body>
      <style>${html_style}</style>
      <div id="container">
      ${html_content}
      </div>
    </body>`

    if (pathSegments.length === 1 && pathSegments[0] === "secure") {
	return new Response(html, {
      		headers: {
        	"content-type": "text/html;charset=UTF-8"
      		}
    	});
  	}
	if (pathSegments.length === 2 && pathSegments[0] === "secure") {
	const lcp = pathSegments[1] + ".png";
	try {
	// Fetch the country flag from the private R2 bucket
	const flagBuffer = await env.COUNTRYFLAGS.get(lcp);
	const headers = new Headers();
	flagBuffer.writeHttpMetadata(headers);
	headers.set("etag", flagBuffer.httpEtag);
	headers.set("Content-Type", "image/png");
	console.log(headers);
	console.log(flagBuffer.body)
	return new Response(flagBuffer.body, {
	headers,
	});
	} catch (error) {
	console.log(error.toString());
	// Handle errors (e.g., country flag not found)
	return new Response("Country flag not found", {
	status: 404,
	headers: {
	"Content-Type": "text/plain",
	},
	});
}
}
	return new Response("Not a valid endpoint", {
		status: 404,
	headers: { "Content-Type": "text/html" },
	});
}
  };
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
