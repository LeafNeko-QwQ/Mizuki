/**
 * 页面加载过场控制
 *
 * 结构参考 GitHub: JIEJOE-WEB-Tutorial/006-jump-animation（Vue 版三段式跳转动画），
 * 这里按 Swup 的生命周期重写：
 *
 *   1. 进入（固定）：链接被点击、visit 开始时立刻打开遮罩，动画固定 320ms 盖住页面；
 *   2. 填充（不定）：遮罩保持，页面在下面真实加载——多久加载完就多久；
 *   3. 退出（固定）：Swup 触发 page:view（新内容已渲染）后关闭，固定 280ms。
 *
 * 再加两条工程约束：
 *   - 最短可见 460ms：请求很快时不至于一闪而过；
 *   - 最长 8s 强制关闭：任何异常都不会把用户锁在遮罩里。
 */

const ENTER_MS = 320;
const EXIT_MS = 280;
const MIN_VISIBLE = 460;
const MAX_VISIBLE = 8000;

let openedAt = 0;
let pendingClose = false;
let closeTimer = 0;
let hardTimer = 0;

function overlay(): HTMLElement | null {
	return document.getElementById("page-loading");
}

export function openPageLoading(): void {
	const node = overlay();
	if (!node) {
		return;
	}

	window.clearTimeout(closeTimer);
	window.clearTimeout(hardTimer);
	pendingClose = false;

	node.classList.remove("is-leaving");
	node.classList.add("is-active");
	node.setAttribute("aria-hidden", "false");

	openedAt = performance.now();
	hardTimer = window.setTimeout(closePageLoading, MAX_VISIBLE);
}

export function closePageLoading(): void {
	const node = overlay();
	if (!node || pendingClose || !node.classList.contains("is-active")) {
		return;
	}

	pendingClose = true;
	window.clearTimeout(hardTimer);

	const wait = Math.max(0, MIN_VISIBLE - (performance.now() - openedAt));

	closeTimer = window.setTimeout(() => {
		node.classList.remove("is-active");
		node.classList.add("is-leaving");
		node.setAttribute("aria-hidden", "true");

		window.setTimeout(() => {
			node.classList.remove("is-leaving");
			pendingClose = false;
		}, EXIT_MS);
	}, wait);
}

type SwupLike = {
	hooks?: { on: (event: string, callback: () => void) => void };
};

/**
 * 等待 Swup 实例就绪后挂上钩子。
 * Astro 集成没有稳定的 ready 回调，这里用有界重试（最多 3 秒），避免依赖具体事件名。
 */
export function initPageLoadingOverlay(): void {
	let tries = 0;

	const attach = (): boolean => {
		const swup = (window as unknown as { swup?: SwupLike }).swup;
		if (!swup?.hooks?.on) {
			return false;
		}
		swup.hooks.on("visit:start", openPageLoading);
		swup.hooks.on("page:view", closePageLoading);
		swup.hooks.on("visit:end", closePageLoading);
		return true;
	};

	if (attach()) {
		return;
	}

	const timer = window.setInterval(() => {
		tries += 1;
		if (attach() || tries > 30) {
			window.clearInterval(timer);
		}
	}, 100);
}
