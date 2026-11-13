/**
 * Swup 管理器主入口
 * 协调所有子模块，提供统一的页面过渡管理
 */

import { widgetConfigs } from "../config";
import { initLinkPreloading } from "../utils/navigation-utils";
import { SWUP_SELECTORS } from "./core/swup-config";
import { SwupHooksManager } from "./core/swup-hooks";
import { setupSakuraOnDOMReady } from "./effects/sakura-effect";
import {
	destroyTransitionEffect,
	getTransitionEffect,
} from "./effects/transition-effect";

import type { BackToTopHandler } from "./handlers/back-to-top-handler";
import {
	getBackToTopHandler,
	initBackToTopHandler,
} from "./handlers/back-to-top-handler";
import type { FancyboxHandler } from "./handlers/fancybox-handler";
import {
	cleanupFancybox,
	getFancyboxHandler,
	initFancybox,
} from "./handlers/fancybox-handler";
import type { PanelHandler } from "./handlers/panel-handler";
import { getPanelHandler, initPanelHandler } from "./handlers/panel-handler";
import { checkKatex, initCustomScrollbar } from "./handlers/scroll-handler";

/**
 * Swup 管理器类
 * 统一管理页面过渡相关的所有功能
 */
export class SwupManager {
	private hooksManager: SwupHooksManager | null = null;
	private fancyboxHandler: FancyboxHandler;
	private backToTopHandler: BackToTopHandler;
	private panelHandler: PanelHandler;

	private bannerEnabled: boolean;
	private initialized = false;

	constructor() {
		this.bannerEnabled = !!document.getElementById(
			SWUP_SELECTORS.bannerWrapper.slice(1),
		);

		// 初始化各个处理器
		this.fancyboxHandler = getFancyboxHandler();
		this.backToTopHandler = getBackToTopHandler(this.bannerEnabled);
		this.panelHandler = getPanelHandler();
	}

	/**
	 * 初始化 Swup 管理器
	 */
	async init(): Promise<void> {
		if (this.initialized) {
			return;
		}

		const transitionEffect = getTransitionEffect();
		transitionEffect.applyConfig();

		await this.initPanelHandler();

		// 设置 Sakura 特效
		this.setupSakura();

		// 初始化 Swup 钩子
		this.initSwupHooks();

		// 初始化返回顶部处理器
		initBackToTopHandler(this.bannerEnabled);

		// 初始化 Banner
		this.initBanner();

		// 初始化链接预加载
		this.initPreloading();

		this.initialized = true;
		console.log("SwupManager: 初始化完成");
	}

	/**
	 * 初始化面板处理器
	 */
	private async initPanelHandler(): Promise<void> {
		try {
			await initPanelHandler();
		} catch (error) {
			console.error("SwupManager: 面板处理器初始化失败", error);
		}
	}

	/**
	 * 设置 Sakura 特效
	 */
	private setupSakura(): void {
		setupSakuraOnDOMReady(widgetConfigs);
	}

	/**
	 * 初始化 Swup 钩子
	 */
	private initSwupHooks(): void {
		// 创建钩子管理器
		this.hooksManager = new SwupHooksManager(this.bannerEnabled, {
			showBanner: this.showBanner.bind(this),
			initFancybox: async () => {
				await initFancybox();
			},
			cleanupFancybox: () => {
				cleanupFancybox();
			},
			initCustomScrollbar: () => {
				initCustomScrollbar();
			},
			checkKatex: () => {
				checkKatex();
			},
		});

		// 如果 Swup 已经就绪，直接设置钩子
		if (window?.swup?.hooks) {
			initFancybox();
			checkKatex();
			this.hooksManager.registerHooks();
		} else {
			// 监听 Swup 就绪事件
			document.addEventListener("swup:enable", () => {
					if (this.hooksManager) {
					this.hooksManager.registerHooks();
				}
			});

			// 监听 DOM 加载（确保首屏也能加载优化组件）
			if (document.readyState === "loading") {
				document.addEventListener("DOMContentLoaded", async () => {
					await initFancybox();
					checkKatex();
				});
			} else {
				initFancybox();
				checkKatex();
			}
		}
	}

	/**
	 * 初始化 Banner
	 */
	private initBanner(): void {
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", async () => {
				this.showBanner();
			});
		} else {
			this.showBanner();
		}
	}

	/**
	 * 初始化链接预加载
	 */
	private initPreloading(): void {
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", () => {
				initLinkPreloading();
			});
		} else {
			initLinkPreloading();
		}
	}

	/**
	 * 显示 Banner
	 * 轮播图由 Banner.astro 中的内联脚本自行初始化（data-swup-ignore-script），
	 * 此处仅处理单图模式的淡入效果。
	 */
	showBanner(): void {
		requestAnimationFrame(() => {
			// 处理单图 Banner (桌面端)
			const banner = document.getElementById(
				SWUP_SELECTORS.banner.slice(1),
			);
			if (banner) {
				banner.classList.remove("opacity-0", "scale-105");
			}

			// 处理移动端单图 Banner
			const mobileBanner = document.querySelector(
				'.block.md\\:hidden[alt="Mobile banner image of the blog"]',
			);
			if (mobileBanner && !document.getElementById("banner-carousel")) {
				mobileBanner.classList.remove("opacity-0", "scale-105");
				mobileBanner.classList.add("opacity-100");
			}
		});
	}

	/**
	 * 销毁管理器
	 */
	destroy(): void {
		this.hooksManager = null;
		this.fancyboxHandler.destroy();
		this.backToTopHandler.destroy();
		this.panelHandler.destroy();
		destroyTransitionEffect();
		this.initialized = false;
	}

	/**
	 * 获取 Banner 启用状态
	 */
	isBannerEnabled(): boolean {
		return this.bannerEnabled;
	}
}

// 创建全局实例
let globalSwupManager: SwupManager | null = null;

/**
 * 获取全局 Swup 管理器实例
 */
export function getSwupManager(): SwupManager {
	if (!globalSwupManager) {
		globalSwupManager = new SwupManager();
	}
	return globalSwupManager;
}

/**
 * 初始化 Swup 管理器（便捷函数）
 */
export async function initSwupManager(): Promise<void> {
	const manager = getSwupManager();
	await manager.init();
}

/**
 * 过渡状态兜底（watchdog）
 *
 * Swup 在 <html> 上挂 is-changing / is-leaving / is-animating 来控制过渡，
 * 而 `.transition-main` 处于这些状态时是 opacity: 0。只要有一次「过渡结束」事件没触发
 * （慢网络下资源没到、目标页结构差异、脚本异常都可能），页面就会停在
 * 「有结构但看不见」的空白状态——这正是手机上切分区时看到的空白页。
 *
 * 这里在每次点击链接后做一次延时检查：900ms 后状态类还在，就手动摘掉，
 * 保证内容一定会显示出来。它只删除过渡状态类，不改动任何布局、内容或动画定义。
 */
type SwupHooksLike = {
	hooks?: { on: (event: string, cb: () => void) => void };
};

type SwupHooksLike = {
	hooks?: { on: (event: string, cb: () => void) => void };
};

const TRANSITION_STATE_CLASSES = ["is-changing", "is-leaving", "is-animating"];

function releaseStuckTransition() {
	const root = document.documentElement;
	if (!root.classList.contains("is-animating")) {
		return;
	}
	root.classList.remove(...TRANSITION_STATE_CLASSES);
}

function scheduleTransitionWatchdog() {
	window.setTimeout(releaseStuckTransition, 900);
}

/**
 * 慢网络切页保持旧内容可见
 *
 * 与 micro-motion.css 里的 html.is-fetch-hold 配合：切页 180ms 后仍未换上新内容，
 * 就按住旧页面（保持可见），等 content:replace 时再放手，避免长时间白屏。
 * 快网络下 180ms 内已经完成替换，这段逻辑不产生任何视觉效果。
 */
function installSlowNavigationHold() {
	let holdTimer = 0;
	const root = document.documentElement;

	const release = () => {
		window.clearTimeout(holdTimer);
		root.classList.remove("is-fetch-hold");
	};

	const attach = (): boolean => {
		const swup = (window as unknown as { swup?: SwupHooksLike }).swup;
		if (!swup?.hooks?.on) {
			return false;
		}
		swup.hooks.on("visit:start", () => {
			window.clearTimeout(holdTimer);
			holdTimer = window.setTimeout(() => {
				root.classList.add("is-fetch-hold");
			}, 180);
		});
		swup.hooks.on("content:replace", release);
		swup.hooks.on("visit:end", release);
		return true;
	};

	if (attach()) {
		return;
	}
	let tries = 0;
	const timer = window.setInterval(() => {
		tries += 1;
		if (attach() || tries > 30) {
			window.clearInterval(timer);
		}
	}, 100);
}

if (typeof window !== "undefined") {
	installSlowNavigationHold();
	document.addEventListener(
		"click",
		(event) => {
			const target = event.target;
			if (target instanceof Element && target.closest("a")) {
				scheduleTransitionWatchdog();
			}
		},
		true,
	);
	window.addEventListener("pageshow", scheduleTransitionWatchdog);
}
