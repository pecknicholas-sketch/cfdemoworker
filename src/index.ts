// index.ts
var index_default = {
  async fetch(request, env, ctx) {
    let html_style = `body{padding:6em; font-family: sans-serif;} h1{color:#f6821f}`;
    let html_content = "";
    let timestampMS = Date.now();
    const userEmail = request.headers.get("CF-Access-Authenticated-User-Email");
    let url = "https://tunnel.catotonic.yachts/secure/";
    let country_html = "<a href=" + url + request.cf.country + ">" + request.cf.country + "</a>";
    html_content += userEmail + " authenticated at " + timestampMS + " from " + country_html;
    let html = `
    <!DOCTYPE html>
    <head>
      <title>Geolocation: Weather</title>
    </head>
    <body>
      <style>${html_style}</style>
      <div id="container">
      ${html_content}
      </div>
    </body>`;
    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8"
      }
    });
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
