<script>
	import { writable } from "svelte/store";

	let completion = writable("");
	let data = writable(undefined);
	let messages = writable([]);
	let input = writable("");
	async function handleSubmit() {
			// Prevent default form submission behavior
			event?.preventDefault();

			messages.update((m) => [...m, { role: "user", content: $input }]);
			const res = await fetch('/api/non-stream-chat', {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json'
					},
					body: JSON.stringify({ messages: $messages })
			});
			const d = await res.json();
			console.log('data', { d })
			data.set(d);
			completion.set(d.choices[0].message.content)
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="container">
			<h4 class="title">
				Non Stream Chat Example
			</h4>
			{$completion}
			<form on:submit={handleSubmit}>
				<input
					class="input-field"
					bind:value={$input} 
					placeholder="Say something..."
				/>
			</form>
		</div>
</section>

<style>
	section {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 0.6;
	}

	.container {
			display: flex;
			flex-direction: column;
			width: 100%;
			max-width: 500px; /* Adjusted for a medium width */
			padding-top: 24px;
			margin: auto;
			align-items: stretch;
	}

	.title {
			font-size: 1.25rem; /* 20px */
			font-weight: bold;
			color: #1f2937; /* A dark gray */
			margin-bottom: 16px; /* 4px tailwind base */
	}

	.data-display {
			white-space: pre-wrap; /* To maintain formatting */
			word-wrap: break-word;
	}

	.input-field {
			position: fixed;
			bottom: 0;
			width: 100%;
			max-width: 500px; /* Matching the container max-width */
			padding: 8px; /* 2px tailwind base */
			margin-bottom: 32px;
			border: 1px solid #d1d5db; /* A light gray border */
			border-radius: 0.375rem; /* Rounded corners */
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* A subtle shadow */
	}
</style>
