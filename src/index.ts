export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    	let html_content = "";
	let timestampMS: number = Date.now();
	const userEmail = request.headers.get("CF-Access-Authenticated-User-Email");
	html_content += userEmail + " authenticated at " + timestampMS + " from " + request.cf.country;
    return new Response(html_content, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  },
} satisfies ExportedHandler;
