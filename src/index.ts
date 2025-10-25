// index.ts
var index_default = {
  async fetch(request, env, ctx) {
    let html_style = `body{padding:6em; font-family: sans-serif;} h1{color:#f6821f}`;
    let html_content = "";
    let timestampMS = Date.now();
    const userEmail = request.headers.get("CF-Access-Authenticated-User-Email");

    let countrypath = request.cf.country;
    let url = "https://tunnel.catotonic.yachts/secure/";
    let country_html = "<a href=" + url + request.cf.country + " id=country>" + request.cf.country + "</a>";
    html_content += userEmail + " authenticated at " + timestampMS + " from " + country_html;

    let scriptforimage = ``
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
    </body>
    <script>
    const template = "";

    const bodyHistory = [];

    registerHandler();

    function registerHandler() {
      document.getElementById("country").onclick = (_event) => {
        history.pushState({}, "", "/${countrypath}");
        const object = await this.env.countryflag.get(cfdemocountrycode/${request.cf.country} + ".svg");


        if (object === null) {
          return new Response("Object Not Found", { status: 404 });
        }

        bodyHistory.push(document.body.innerHTML);
        document.body.innerHTML = template;
      };
    }

    onpopstate = (_event) => {
      const previousContent = bodyHistory.pop();

      if (previousContent) {
        document.body.innerHTML = previousContent;
        registerHandler();
      }
    };
  </script>`;
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
