// index.ts
var index_default = {
  async fetch(request, env, ctx) {
    let html_content = "";
    let timestampMS = Date.now();
    const userEmail = request.headers.get("CF-Access-Authenticated-User-Email");
    let country_html = "<a href=\"https://tunnel.catotonic.yachts/secure/" + request.cf.country + ">" + request.cf.country + "</a>";
    html_content += userEmail + " authenticated at " + timestampMS + " from " + country_html;
    return new Response(html_content, {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    });
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
