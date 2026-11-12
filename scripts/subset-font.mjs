/**
 * 字体子集化
 *
 * 背景：ZenMaruGothic-Medium.woff2 原始 1548 KB，是全站最大的单个资源，
 * 而页面实际用到的字符只有几百个。这里按「源码里出现过的字符 + 常用符号」做子集。
 *
 * 用法：node scripts/subset-font.mjs
 * 产物：覆盖 src/assets/fonts/ZenMaruGothic-Medium.woff2
 *
 * 注意：run `pnpm prepare-fonts` 会用 ttf 重新生成完整 woff2，把这里的结果覆盖掉。
 * 若字体换版，先 prepare-fonts 再跑本脚本。
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import Fontmin from "fontmin";

const ROOT = process.cwd();
const TEXT_EXT = new Set([
	".md",
	".mdx",
	".astro",
	".ts",
	".js",
	".mjs",
	".svelte",
	".css",
	".json",
	".yml",
	".yaml",
]);

function walk(dir, out = []) {
	for (const name of readdirSync(dir)) {
		if (name === "node_modules" || name === "dist" || name.startsWith(".")) {
			continue;
		}
		const full = join(dir, name);
		const st = statSync(full);
		if (st.isDirectory()) {
			walk(full, out);
		} else if (TEXT_EXT.has(extname(name))) {
			out.push(full);
		}
	}
	return out;
}

function collectCharset() {
	const chars = new Set();

	for (const file of walk(join(ROOT, "src"))) {
		for (const ch of readFileSync(file, "utf8")) {
			if (ch.codePointAt(0) > 0x20) {
				chars.add(ch);
			}
		}
	}

	// ASCII 可打印字符
	for (let code = 0x20; code <= 0x7e; code += 1) {
		chars.add(String.fromCodePoint(code));
	}
	// 中日文常用标点、全角符号、假名
	const extra =
		"　、。〃〈〉《》「」『』【】〔〕〖〗〝〞・ー‐–—‘’“”…※※→←↑↓↔①②③④⑤⑥⑦⑧⑨⑩" +
		"！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝～￥" +
		"ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん" +
		"ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ" +
		"0123456789０１２３４５６７８９";
	for (const ch of extra) {
		chars.add(ch);
	}

	return [...chars].join("");
}

const text = collectCharset();
const FONTS = [
	["ZenMaruGothic-Medium", "ZenMaruGothic-Medium"],
	["loli", "loli"],
];

console.log(`字符集：${text.length} 个唯一字符`);

/**
 * 注意：两个字体都要子集化。
 * 字体栈是「正文字体 → CJK 字体 → 系统字体」，正文缺失的字形会退化到 CJK 字体；
 * 如果只缩小正文那一个，任何未覆盖的字都会触发 4.6 MB 的 CJK 字体下载。
 */
function subsetOne(ttfName, outName) {
	return new Promise((resolvePromise, rejectPromise) => {
		const source = resolve(ROOT, `src/assets/fonts/${ttfName}.ttf`);
		const target = resolve(ROOT, `src/assets/fonts/${outName}.woff2`);

		new Fontmin()
			.src(source)
			.use(Fontmin.glyph({ text, hinting: false }))
			.use(Fontmin.ttf2woff2())
			.run((err, files) => {
				if (err) {
					rejectPromise(err);
					return;
				}
				const woff2 = files.find((f) => f.path && f.path.endsWith(".woff2"));
				if (!woff2) {
					rejectPromise(new Error(`${ttfName}: 没有产出 woff2`));
					return;
				}
				writeFileSync(target, woff2.contents);
				console.log(`${outName}.woff2 → ${(woff2.contents.length / 1024).toFixed(1)} KB`);
				resolvePromise();
			});
	});
}

for (const [ttfName, outName] of FONTS) {
	await subsetOne(ttfName, outName);
}
