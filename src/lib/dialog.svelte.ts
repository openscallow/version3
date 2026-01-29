import { setContext, getContext } from 'svelte';
import type { Snippet } from 'svelte';

class DialogState {
	isOpen = $state(false);
	content = $state(null);

	open(contentSnippet: any) {
		this.content = contentSnippet;
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
	}
}

const DIALOG_KEY = Symbol('dialog');

export function setDialogContext() {
	return setContext(DIALOG_KEY, new DialogState());
}

export function getDialogContext() {
	return getContext<DialogState>(DIALOG_KEY);
}