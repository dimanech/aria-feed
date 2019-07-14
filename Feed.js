/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */
export default class Feed {
	constructor(feedNode, focusBefore, focusAfter) {
		this.feedNode = feedNode;
		this.focusBefore = focusBefore || this.feedItems[0];
		this.focusAfter = focusAfter || this.feedItems[this.feedItems.length];

		this.feedItems = [];

		this.keyCode = Object.freeze({
			PAGEUP: 33,
			PAGEDOWN: 34,
			END: 35,
			HOME: 36,
		});
	}

	init() {
		this.addEventListeners();
		this.updateFeedModel();
	}

	addEventListeners() {
		this.handleKeydown = this.handleKeydown.bind(this);
		this.feedNode.addEventListener('keydown', this.handleKeydown.bind(this));
	}

	handleKeydown(event) {
		const focusedArticle = event.target.matches('[role="article"]')
				? event.target : event.target.closest('[role="article"]');

		if (!focusedArticle) {
			return;
		}

		const focusedArticleIndex = focusedArticle.getAttribute('aria-posinset');

		const key = event.which || event.keyCode;
		let preventEventActions = false;

		switch (key) {
			case this.keyCode.PAGEUP:
				if (focusedArticleIndex > 1) {
					Feed.focusItem(this.feedItems[focusedArticleIndex - 2]);
					preventEventActions = true;
				}
				break;
			case this.keyCode.PAGEDOWN:
				if (this.feedItems.length >= focusedArticleIndex) {
					Feed.focusItem(this.feedItems[focusedArticleIndex]);
					preventEventActions = true;
				}
				break;
			case this.keyCode.HOME:
				if (event.ctrlKey && this.feedItems.length > 0) {
					this.focusBeforeFeed();
					preventEventActions = true;
				}
				break;
			case this.keyCode.END:
				if (event.ctrlKey && this.feedItems.length > 0) {
					this.focusAfterFeed();
					preventEventActions = true;
				}
				break;
		}

		if (preventEventActions) {
			event.stopPropagation();
			event.preventDefault();
		}
	}

	focusBeforeFeed() {
		const focusableElement = this.focusBefore || this.feedItems[0];
		focusableElement.focus();
	}

	focusAfterFeed() {
		const focusableElement = this.focusAfter || this.feedItems[this.feedItems.length];
		focusableElement.focus();
	}

	updateFeedModel() {
		this.feedItems = [];
		for (let article of this.feedNode.children) {
			this.feedItems.push(article);
		}
	}

	static focusItem(item) {
		if (!item || !item.focus) {
			return;
		}

		item.focus();
	}
};
