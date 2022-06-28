'use strict';

addEventListener('fetch', (event) => {
	const { request } = event;
	const { url } = request;

	if (url.includes('register')) {
		return event.respondWith(rawHtmlResponse(htmlForm));
	}
	if (request.method === 'POST') {
		return event.respondWith(handleRequest(request));
	} else if (request.method === 'GET') {
		return event.respondWith(new Response(`Incorrect URL`));
	}
});

async function rawHtmlResponse(html) {
	const init = {
		headers: {
			'content-type': 'text/html;charset=UTF-8',
		},
	};
	return new Response(html, init);
}

async function handleRequest(request) {
	const reqBody = await readRequestBody(request);
	// const retBody = `the request body sent is was ${reqBody}`;
	return new Response(thanksHTMLMessage, {
		headers: {
			'content-type': 'text/html;charset=UTF-8',
		},
	});
	// return new Response(retBody);
}

async function readRequestBody(request) {
	const formData = await request.formData();
	const body = {};
	for (const entry of formData.entries()) {
		body[entry[0]] = entry[1];
	}
	console.log(body.name, body.email, body.phone, body.value);
	await NotionaddItem(body);
	return JSON.stringify(body);
}

async function NotionaddItem(body) {
	const notionSchema = {
		parent: { database_id: `${NOTION_DB_ID}` },
		properties: {
			Name: { type: 'title', title: [{ text: { content: body.name } }] },
			Email: { type: 'email', email: body.email },
			Phone: { type: 'phone_number', phone_number: body.phone },
		},
	};
	console.log(JSON.stringify(notionSchema));

	try {
		return await fetch('https://api.notion.com/v1/pages', {
			method: 'POST',
			body: JSON.stringify(notionSchema),
			headers: {
				Authorization: `Bearer ${NOTION_API_KEY}`,
				'Content-type': 'application/json',
				'Notion-Version': '2021-05-13',
			},
		});
	} catch (e) {
		console.log(e);
	}
}

const thanksHTMLMessage = `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>EKIS Cybersecurity - Formulario de Registro</title>
	<link
		href="https://fonts.googleapis.com/css?family=Nunito:400,300"
		rel="stylesheet"
		type="text/css"
	/>
	<style>
		*,
		*:before,
		*:after {
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
		}

		body {
			font-family: 'Nunito', sans-serif;
			color: #384047;
		}

		form {
			max-width: 300px;
			margin: 10px auto;
			padding: 10px 20px;
			background: #f4f7f8;
			border-radius: 8px;
		}

		h1 {
			margin: 0 0 30px 0;
			text-align: center;
		}

		input[type='text'],
		input[type='password'],
		input[type='date'],
		input[type='datetime'],
		input[type='email'],
		input[type='number'],
		input[type='search'],
		input[type='tel'],
		input[type='time'],
		input[type='url'],
		textarea,
		select {
			background: rgba(255, 255, 255, 0.1);
			border: none;
			font-size: 16px;
			height: auto;
			margin: 0;
			outline: 0;
			padding: 15px;
			width: 100%;
			background-color: #e8eeef;
			color: #8a97a0;
			box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
			margin-bottom: 30px;
		}

		input[type='radio'],
		input[type='checkbox'] {
			margin: 0 4px 8px 0;
		}

		select {
			padding: 6px;
			height: 32px;
			border-radius: 2px;
		}

		button {
			padding: 19px 39px 18px 39px;
			color: #fff;
			background-color: #4bc970;
			font-size: 18px;
			text-align: center;
			font-style: normal;
			border-radius: 5px;
			width: 100%;
			border: 1px solid #3ac162;
			border-width: 1px 1px 3px;
			box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
			margin-bottom: 10px;
		}

		fieldset {
			margin-bottom: 30px;
			border: none;
		}

		legend {
			font-size: 1.4em;
			margin-bottom: 10px;
		}

		label {
			display: block;
			margin-bottom: 8px;
		}

		label.light {
			font-weight: 300;
			display: inline;
		}

		.number {
			background-color: #5fcf80;
			color: #fff;
			height: 30px;
			width: 30px;
			display: inline-block;
			font-size: 0.8em;
			margin-right: 4px;
			line-height: 30px;
			text-align: center;
			text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
			border-radius: 100%;
		}

		@media screen and (min-width: 480px) {
			form {
				max-width: 480px;
			}
		}
	</style>
</head>
<body>
	<div class="row">
		<div class="col-md-12">
		<center> Gracias por Registrarte</center>
		</div>
	</div>
</body>
</html>`;

const htmlForm = `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>EKIS Cybersecurity - Formulario de Registro</title>
	<link
		href="https://fonts.googleapis.com/css?family=Nunito:400,300"
		rel="stylesheet"
		type="text/css"
	/>
	<style>
		*,
		*:before,
		*:after {
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
		}

		body {
			font-family: 'Nunito', sans-serif;
			color: #384047;
		}

		form {
			max-width: 300px;
			margin: 10px auto;
			padding: 10px 20px;
			background: #f4f7f8;
			border-radius: 8px;
		}

		h1 {
			margin: 0 0 30px 0;
			text-align: center;
		}

		input[type='text'],
		input[type='password'],
		input[type='date'],
		input[type='datetime'],
		input[type='email'],
		input[type='number'],
		input[type='search'],
		input[type='tel'],
		input[type='time'],
		input[type='url'],
		textarea,
		select {
			background: rgba(255, 255, 255, 0.1);
			border: none;
			font-size: 16px;
			height: auto;
			margin: 0;
			outline: 0;
			padding: 15px;
			width: 100%;
			background-color: #e8eeef;
			color: #8a97a0;
			box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
			margin-bottom: 30px;
		}

		input[type='radio'],
		input[type='checkbox'] {
			margin: 0 4px 8px 0;
		}

		select {
			padding: 6px;
			height: 32px;
			border-radius: 2px;
		}

		button {
			padding: 19px 39px 18px 39px;
			color: #fff;
			background-color: #4bc970;
			font-size: 18px;
			text-align: center;
			font-style: normal;
			border-radius: 5px;
			width: 100%;
			border: 1px solid #3ac162;
			border-width: 1px 1px 3px;
			box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
			margin-bottom: 10px;
		}

		fieldset {
			margin-bottom: 30px;
			border: none;
		}

		legend {
			font-size: 1.4em;
			margin-bottom: 10px;
		}

		label {
			display: block;
			margin-bottom: 8px;
		}

		label.light {
			font-weight: 300;
			display: inline;
		}

		.number {
			background-color: #5fcf80;
			color: #fff;
			height: 30px;
			width: 30px;
			display: inline-block;
			font-size: 0.8em;
			margin-right: 4px;
			line-height: 30px;
			text-align: center;
			text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
			border-radius: 100%;
		}

		@media screen and (min-width: 480px) {
			form {
				max-width: 480px;
			}
		}
	</style>
</head>
<body>
	<div class="row">
		<div class="col-md-12">
			<form action="/" method="post">
				<h1>Formulario de Registro</h1>

				<fieldset>
					<legend><span class="number">1</span> Información Básica</legend>

					<label for="name">Nombre Completo:</label>
					<input type="text" id="name" name="name" />

					<label for="email">Email Corporativo:</label>
					<input type="email" id="mail" name="email" />

					<label for="phone">Número Móvil:</label>
					<input type="text" id="phone" name="phone" />

					<label>¿Desea Ser Contactado?:</label>
					<input type="radio" id="yes" value="Si" name="value" /><label
						for="yes"
						class="light"
						>Si</label
					><br />
					<input type="radio" id="no" value="No" name="value_no" /><label
						for="no"
						class="light"
						>No</label
					>
				</fieldset>
				<button type="submit">Registrarse</button>
			</form>
		</div>
	</div>
</body>
</html>
`;
