import type { ProfileConfig } from "../types/config";

// 个人资料配置
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp", // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
	name: "LeafNeko",
	bio: "没实力喵事个fvv · 生产日期 2010-10 · 爱玩音游 / DIY / 刷机 / 编程喵",
	typewriter: {
		enable: true, // 启用个人简介打字机效果
		speed: 80, // 打字速度（毫秒）
	},
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/LeafNeko-QwQ",
		},
		{
			name: "Bilibili",
			icon: "fa7-brands:bilibili",
			url: "https://space.bilibili.com/1580757085",
		},
		{
			name: "Email",
			icon: "material-symbols:mail",
			url: "mailto:leafneko_posh@163.com",
		},
	],
};
